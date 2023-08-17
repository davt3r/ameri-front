import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

const List = lazy(() => import("../list/List"));
const DetailPage = lazy(() => import("../detail/Detail"));
const ErrorPage = lazy(() => import("../error/Error.page"));
const Register = lazy(() => import("../register/Register"));
const Home = lazy(() => import("../home/Home"));
const Login = lazy(() => import("../login/login"));
const CreatePerfume = lazy(() => import("../createPerfume/Create.perfume"));
const EditPerfume = lazy(() => import("../editPerfume/Edit.perfume"));

export function AppRoutes() {
  return (
    <Suspense>
      <Routes>
        <Route path="/register" element={<Register></Register>}></Route>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/details/:id" element={<DetailPage></DetailPage>}></Route>
        <Route path="*" element={<ErrorPage></ErrorPage>}></Route>
        <Route path="/perfumes" element={<List></List>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/create" element={<CreatePerfume></CreatePerfume>}></Route>
        <Route path="/edit/:id" element={<EditPerfume></EditPerfume>}></Route>
      </Routes>
    </Suspense>
  );
}
