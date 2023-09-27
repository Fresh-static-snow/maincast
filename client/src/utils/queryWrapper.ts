import { isAxiosError } from "axios";
import { toastError } from "./toast";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const queryWrapper = async <T = any>(
  query: () => Promise<T>,
  showToast = true,
  throwError = false
) => {
  try {
    return await query();
  } catch (error) {
    if (showToast) {
      if (isAxiosError(error)) {
        toastError(error.response?.data.message);
      } else if (error instanceof Error) {
        toastError(error.message);
      } else {
        toastError();
      }
    }
    if (throwError) {
      throw new Error((error as Error).message);
    }
  }
};
