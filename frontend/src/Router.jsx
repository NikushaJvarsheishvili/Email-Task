import {
  RouterProvider,
  Route,
  createRoutesFromElements,
  createBrowserRouter,
} from "react-router-dom";
import { Rootlayout } from "./components/Rootlayout/Rootlayout";
import { Login } from "./components/Login/Login";
import { Register } from "./components/Register/Register";

export const Router = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Rootlayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};
