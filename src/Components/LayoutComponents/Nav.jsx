import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import logo from '../../assets/logo.png'
import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import WebButton from "../WebButton/WebButton";
import { AuthContext } from "../../Context/AuthProvider";
import Swal from "sweetalert2";
import { IoHeart } from "react-icons/io5";
import useUser from "../../hooks/useUser";



const Nav = () => {
  const {user,logout} = useContext(AuthContext);
  const navigate = useNavigate()
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [users] = useUser();
  const filteredUser = users?.find(u=>u.email===user?.email);
  const isAdmin = filteredUser?.role==='admin'

  const handlelogout = ()=>{
    logout()
    .then(()=>{
      Swal.fire({
                      title: "Good job!",
                      text: "Successfully logged out!",
                      icon: "success"
                    });
      navigate('/auth')
    })
  }

  const link = <>
        <li> <NavLink to='/'>Home</NavLink>
       </li>

        <li>{isAdmin? <NavLink to='/adminExam'>Added MCQ</NavLink> : <NavLink to='/allExams'>MCQ</NavLink>}</li>
        <li>{isAdmin? <NavLink to='/adminCq'>Added Cq</NavLink> :<NavLink to='/cqTest'>CQ test</NavLink>}</li>
       {!isAdmin &&  <li><NavLink to='/session'>Support</NavLink></li>}
       {!isAdmin &&  <li ><NavLink className="flex items-center" to='/wishlist'><span></span>Wishlist<span className="text-xl text-red-500"><IoHeart /></span></NavLink></li>}
  </>

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);

  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  return (
    <AppBar position="fixed"  sx={{  backgroundColor: 'white',color: "black", paddingY: '10px'}}>
      <Container className="max-w-7xl">
        <Toolbar disableGutters>
          {/* Logo */}
          <img src={logo} alt="" className="w-15"/>
          <Typography
            variant="h5"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            
            EduQuest
          </Typography>

          {/* Mobile Menu Icon */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton size="large" onClick={handleOpenNavMenu} color="inherit">
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "left" }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
            
            {/* menu Item */}
            <ul className="p-5">
              {link}
            </ul>
            </Menu>
          </Box>

          {/* Small screen logo */}
         
          <Typography
            variant="h5"
            noWrap
            component={NavLink}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "Atkinson Hyperlegible Mono",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            EduQuest
          </Typography>

          {/* Desktop Menu */}
         
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            
             <ul className="flex gap-5 my-2">
              {link}
            </ul>
          </Box>
          {
            user ?   <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="" src={user.photoURL} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px"}}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <div className="px-2 text-center rounded-xl w-[250px]">
             <div className="p-3 rounded-xl bg-blue-200">
             <Avatar alt="" src={user.photoURL} className="mx-auto"/>
              <p className="text-sm">{user.displayName}</p>
              <p className="text-sm text-gray-500"> {user.email}</p>
             </div>
              </div>
              
           
          <ul className="px-5 space-y-3 mt-2">
            
            <li>
             {isAdmin ? <NavLink to='/dashboard/users'>Dashboard</NavLink> : <NavLink to='/dashboard/userProfile'>Dashboard</NavLink>}
            </li>
            <li onClick={handlelogout}>
            <WebButton text={"Logout"}></WebButton>
            </li>
          </ul>
          
             
            </Menu>
          </Box> :  <NavLink to='/auth'>
          <WebButton text={"Login"}></WebButton>
          </NavLink>
          }

        
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Nav;
