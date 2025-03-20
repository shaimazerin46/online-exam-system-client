
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import MainLayout from './Layout/MainLayout'
import Register from './Pages/Register'
import AuthLayout from './Layout/AuthLayout'
import Login from './Pages/Login'
import AuthProvider from './Context/AuthProvider'


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
 <AuthProvider>
 <Routes>
    {/* Main layout */}
    <Route path="/" element={<MainLayout />} />

    {/* Auth layout */}
    <Route path="/auth" element={<AuthLayout />}>
        <Route index element={<Login />} />
        <Route path="register" element={<Register />} />
    </Route>
    
  </Routes>
 </AuthProvider>
</BrowserRouter>
)
