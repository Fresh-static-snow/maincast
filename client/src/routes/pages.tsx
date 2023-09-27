import { LoginPage } from "../components/pages/LoginPage";
import { MainPage } from "../components/pages/MainPage";
import { Pages } from "../types/pages";

export const LoginPageRoute: Pages.Routes = {
  path: "/login",
  Component: <LoginPage />,
};

export const MainPageRoute: Pages.Routes = {
  path: "/",
  Component: <MainPage />,
};

export const RoutesList = {
  login: LoginPageRoute,
  main: MainPageRoute,
}