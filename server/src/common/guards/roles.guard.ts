import {
  CanActivate,
  ExecutionContext,
  Injectable,
  SetMetadata,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GuardedRequest } from '../utils/response';
import { RoleAccess } from '../types/enums';

export const ROLES_KEY = Symbol('ROLES KEY');

export const AccessLevel = (role: RoleAccess) => SetMetadata(ROLES_KEY, role);

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRole = this.reflector.getAllAndOverride<
      RoleAccess | undefined
    >(ROLES_KEY, [context.getHandler(), context.getClass()]);

    if (!requiredRole) {
      return false;
    }

    const { user } = context.switchToHttp().getRequest<GuardedRequest>();
    return requiredRole <= user?.accessLevel;
  }
}
