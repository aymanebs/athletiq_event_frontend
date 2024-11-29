import { Route, Routes } from "react-router"
import AuthLayout from "../components/layouts/AuthLayout"
import Login from "../pages/Auth/Login"
import Register from "../pages/Auth/register"
import DashboardLayout from "../components/layouts/DashboardLayout"
import Home from "../pages/Dashboard/home"
import Event from "../pages/Dashboard/Event"
import Participant from "../pages/Dashboard/participant"


const AppRouter = () =>{
return(
  <Routes>
    <Route path="/" element={<div>Welcome to the App</div>} /> 

      <Route element={<AuthLayout Title="Login to Your Account" />}>
        <Route path="login" element={<Login />} />
      </Route>
      <Route element={<AuthLayout />}>
         <Route path="register" element={<Register />} />
      </Route>

      <Route element={<DashboardLayout/>}>
          <Route path='home' element={<Home/>} />
      </Route>

      <Route element={<DashboardLayout/>}>
          <Route path='events' element={<Event/>} />
      </Route>

      <Route element={<DashboardLayout/>}>
          <Route path='/events/:eventId/participants' element={<Participant/>} />
      </Route>

  </Routes>
)

}

export default AppRouter;