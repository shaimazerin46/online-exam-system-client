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
import AllExams from './Pages/AllExams'
import ExamDetails from './Pages/ExamDetails'
import PrivateRoute from './PrivateRoute/PrivateRoute'
import CqTest from './Pages/CqTest'
import { ParallaxProvider } from 'react-scroll-parallax'
import CqDetails from './Pages/CqDetails'
import PackageDetail from './Pages/PackageDetail'
import Session from './Pages/Session'
import SessionRoute from './PrivateRoute/SessionRoute'
import WishlistPage from './Pages/WishlistPage'

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
            <Route path='/allExams' element={<AllExams></AllExams>}></Route>
            <Route path='/exams/details/:id' element={<PrivateRoute><ExamDetails></ExamDetails></PrivateRoute>}></Route>
            <Route path='/cqTest' element={<PrivateRoute><CqTest></CqTest></PrivateRoute>}></Route>
            <Route path='/cqDetails/:id' element={<PrivateRoute><CqDetails></CqDetails></PrivateRoute>}></Route>
            <Route path='/packages/:id' element={<PrivateRoute><PackageDetail></PackageDetail></PrivateRoute>}></Route>
            <Route path='/session' element={<SessionRoute><Session></Session></SessionRoute>}></Route>
            <Route path='/wishlist' element={<PrivateRoute><WishlistPage></WishlistPage></PrivateRoute>}></Route>
          </Route>


          {/* Auth layout */}
          <Route path="/auth" element={<AuthLayout />}>
            <Route index element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>

        </Routes>

       </ParallaxProvider>


      </QueryClientProvider>
    </AuthProvider>
  </BrowserRouter>
)
