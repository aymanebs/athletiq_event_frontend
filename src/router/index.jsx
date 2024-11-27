import { Route, Routes } from "react-router"
import AuthLayout from "../components/layouts/AuthLayout"
import Login from "../pages/Auth/Login"
import Register from "../pages/Auth/register"


const AppRouter = () =>{
return(
    <Routes>
    <Route path="/" element={<div>Welcome to the App</div>} /> 
    <Route element={<AuthLayout />}>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
    </Route>
  </Routes>
)

}

export default AppRouter;