import "react-toastify/dist/ReactToastify.css";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { myStore, useAppSelector } from "./redux/store";
import { RoutesList } from "./routes/pages";
import { AppLayout } from "./components/layout/AppLayout";

const AppNavigation = () => {
  const location = useLocation();
  const { accessToken } = useAppSelector((s) => s.user);


  if (!accessToken) {
    return (
      <Routes>
        <Route
          path={RoutesList.login.path}
          element={RoutesList.login.Component}
        />
        <Route
          path="*"
          element={
            <Navigate to={RoutesList.login.path} state={{ from: location }} />
          }
        />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path={RoutesList.main.path} element={RoutesList.main.Component} />
      <Route path="*" element={<Navigate to={RoutesList.main.path} state={{ from: location }} />} />
    </Routes>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Provider store={myStore}>
        <AppLayout>
          <AppNavigation />
        </AppLayout>

        <ToastContainer position="top-right" />
      </Provider>
    </BrowserRouter>
  );
}

export default App;
