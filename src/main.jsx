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

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Routes>
          {/* Main layout */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home></Home>}></Route>
            <Route path='/allExams' element={<AllExams></AllExams>}></Route>
          </Route>


          {/* Auth layout */}
          <Route path="/auth" element={<AuthLayout />}>
            <Route index element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>

        </Routes>



      </QueryClientProvider>
    </AuthProvider>
  </BrowserRouter>
)
