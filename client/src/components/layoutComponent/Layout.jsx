
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';
import MobileFooter from '../shared/MobileFooter';


const Layout = () => {
  const { pathname } = useLocation();

  // List of routes where header and footer should be hidden
  const noHeaderFooterRoutes = [
    
    "/sign-up",
    "/login",
    '/payment',
    '/user/verify',
    '/success',
    '/order',
    '/admin'
  ];

  // Check if current route is in the list of routes to hide header and footer
  const showHeaderFooter = !noHeaderFooterRoutes.some(route => pathname.includes(route));

  return (
    <>
    
 <>

 {showHeaderFooter && <Navbar />} 
 <main>
   <Outlet />
 </main>
 {showHeaderFooter &&  <Footer /> }
  {showHeaderFooter && <MobileFooter />}


        </>
     
       
      
    </>
  );
};

export default Layout;