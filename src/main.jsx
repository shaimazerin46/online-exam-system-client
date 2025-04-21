import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import MainLayout from './Layout/MainLayout'
import Register from './Pages/Register'
import AuthLayout from './Layout/AuthLayout'
import Login from './Pages/Login'
import AuthProvider from './Context/AuthProvider'
import Home from './Pages/Home'
import ExamDetails from './Pages/ExamDetails'
import PrivateRoute from './PrivateRoute/PrivateRoute'
import CqTest from './Pages/CqTest'
import { ParallaxProvider } from 'react-scroll-parallax'
import CqDetails from './Pages/CqDetails'
import PackageDetail from './Pages/PackageDetail'
import Session from './Pages/Session'
import SessionRoute from './PrivateRoute/SessionRoute'
import WishlistPage from './Pages/WishlistPage'
import DashboardLayout from './Layout/DashboardLayout'
import Users from './Pages/Dashboard/Admin/Users'
import AllCq from './Pages/Dashboard/Admin/AllCq'
import McqResult from './Pages/Dashboard/Admin/McqResult'
import Exams from './Pages/Dashboard/Admin/Exams'
import AllExams from './Pages/AllExams'
import CqResults from './Pages/Dashboard/Admin/CqResults'
import AddExam from './Pages/Dashboard/AddExam'
import UpdateExam from './Pages/Dashboard/Admin/UpdateExam'
import AddedExams from './Pages/AdminPages/AddedExams'
import AddedCq from './Pages/AdminPages/AddedCq'
import AddCq from './Pages/Dashboard/Admin/AddCq'
import UpdateCq from './Pages/Dashboard/Admin/UpdateCq'
import AdminSession from './Pages/Dashboard/Admin/AdminSession'
import UpdateSession from './Pages/Dashboard/Admin/UpdateSession'
import AddSession from './Pages/Dashboard/Admin/AddSession'
import UserProfile from './Pages/Dashboard/User/UserProfile'
import UserResult from './Pages/Dashboard/User/userResult'
import Payment from './Pages/Dashboard/User/Payment'
import AdminRoute from './PrivateRoute/AdminRoute'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
       <ParallaxProvider>
       <Routes>
          {/* Main layout */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home></Home>}></Route>
            <Route path='/allExams' element={<PrivateRoute><AllExams></AllExams></PrivateRoute>}></Route>
            <Route path='/exams/details/:id' element={<PrivateRoute><ExamDetails></ExamDetails></PrivateRoute>}></Route>
            <Route path='/cqTest' element={<PrivateRoute><CqTest></CqTest></PrivateRoute>}></Route>
            <Route path='/cqDetails/:id' element={<PrivateRoute><CqDetails></CqDetails></PrivateRoute>}></Route>
            <Route path='/packages/:id' element={<PrivateRoute><PackageDetail></PackageDetail></PrivateRoute>}></Route>
            <Route path='/session' element={<SessionRoute><Session></Session></SessionRoute>}></Route>
            <Route path='/wishlist' element={<PrivateRoute><WishlistPage></WishlistPage></PrivateRoute>}></Route>
            <Route path='/adminExam' element={<PrivateRoute><AddedExams></AddedExams></PrivateRoute>}></Route>
            <Route path='/adminCq' element={<PrivateRoute><AddedCq></AddedCq></PrivateRoute>}></Route>
          </Route>


          {/* Auth layout */}
          <Route path="/auth" element={<AuthLayout />}>
            <Route index element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>

          {/* dashboard layout */}
          <Route path='/dashboard' element={<PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>}>

              {/* admin */}
              <Route path='/dashboard/users' element={<AdminRoute><Users></Users></AdminRoute>}></Route>
              <Route path='/dashboard/exams' element={<AdminRoute><Exams></Exams></AdminRoute>}></Route>
              <Route path='/dashboard/cq' element={<AdminRoute><AllCq></AllCq></AdminRoute>}></Route>
              <Route path='/dashboard/mcqResults' element={<AdminRoute><McqResult></McqResult></AdminRoute>}></Route>
              <Route path='/dashboard/cqResults' element={<AdminRoute><CqResults></CqResults></AdminRoute>}></Route>
              <Route path='/dashboard/support' element={<AdminRoute><AdminSession></AdminSession></AdminRoute>}></Route>
              <Route path='/dashboard/support/addSession' element={<AdminRoute><AddSession></AddSession></AdminRoute>}></Route>
              <Route path='/dashboard/exams/addExam' element={<AdminRoute><AddExam></AddExam></AdminRoute>}></Route>
              <Route path='/dashboard/exams/updateExam/:id' element={<AdminRoute><UpdateExam></UpdateExam></AdminRoute>}></Route>
              <Route path='/dashboard/cq/updateCq/:id' element={<AdminRoute><UpdateCq></UpdateCq></AdminRoute>}></Route>
              <Route path='/dashboard/exams/addCq' element={<AdminRoute><AddCq></AddCq></AdminRoute>}></Route>
              <Route path='/dashboard/support/:id' element={<AdminRoute><UpdateSession></UpdateSession></AdminRoute>}></Route>

              {/* user */}
              <Route path='/dashboard/userProfile' element={<PrivateRoute><UserProfile></UserProfile></PrivateRoute>}></Route>
              <Route path='/dashboard/userResult' element={<PrivateRoute><UserResult></UserResult></PrivateRoute>}></Route>
              <Route path='/dashboard/payment' element={<PrivateRoute><Payment></Payment></PrivateRoute>}></Route>
              
          </Route>

        </Routes>

       </ParallaxProvider>


      </QueryClientProvider>
    </AuthProvider>
  </BrowserRouter>
)
