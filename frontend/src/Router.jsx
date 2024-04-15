import {
  RouterProvider,
  Route,
  createRoutesFromElements,
  createBrowserRouter,
  useNavigate,
  Outlet,
  Navigate,
} from "react-router-dom";

import { Rootlayout } from "./components/Rootlayout/Rootlayout";
import { Login } from "./components/Login/Login";
import { Register } from "./components/Register/Register";
import { AuthContext, AuthContextProvider } from "./AuthContext";
import { Category } from "./components/Category/Category";
import { Compose } from "./components/Compose/Compose";
import { Email } from "./components/Email/Email";
import { NotFound } from "./components/NotFound/NotFound";
import { useContext } from "react";

export const RedirectIfLoggedIn = () => {
  const { authState } = useContext(AuthContext);

  // if (authState.initialLoading) return null;

  if (authState.user !== null) {
    return <Navigate to="/c/index" />;
  } else {
    return <Outlet />;
  }
};

export const Router = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Rootlayout />}>
        <Route path="/c/:emailCategory" element={<Category />} />
        <Route path="/c/:emailCategory/:emailId" element={<Email />} />
        <Route path="/compose" element={<Compose />} />
        <Route element={<RedirectIfLoggedIn />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );

  return (
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  );
};
