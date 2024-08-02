import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
    <Navbar/>

    <div id="rectangle">
        <div className="main-image">
            <img src="/src/assets/Main Page Computer.jpg" alt="Main Page Computer" className="main-img" />
        </div>
        <div className="header-content">
            <div className="explore-text">
                <h2>Know more about your job <br/> before you apply</h2>
            </div>
            <Link to="/rate" className="btn btn-review">Rate My Job</Link>
        </div>
    </div>

    
    <div className="content-wrapper">
        {/* <!-- BYU Campus Picture --> */}
        <div className="campus-image">
            <img src="src/assets/BYU Campus.jpeg"/>
        </div>
        
        {/* <!-- "Find a Job" button --> */}
        <div style={{width: '100%', height: '100%', textAlign: 'center', paddingTop: '40px' }}>
        <div style={{width: '100%', height: '100%', textAlign: 'center', color: 'black', fontSize: 50, fontFamily: 'Libre Baskerville',
           fontWeight: '700', wordWrap: 'break-word'}}>Explore More Jobs at <br/>Brigham Young <br/> University
        </div>
            
        <div className="btn-find-job">
            <Link to="/search" className="btn">Find a Job</Link>
        </div>
    </div>

    </div>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ color: 'black', fontSize: 40, fontFamily: 'Inter', fontWeight: '600', wordWrap: 'break-word' }}>
            Don’t worry...the cougar won’t find out
            <p style={{ fontSize: 30 }}>Your ratings are always anonymous</p>
            <img src="/src/assets/HidingCougar.png" alt="Hiding Cougar" style={{ marginTop: '10px' }} />
          </div>
        </div>
        <div>
          <img src="/src/assets/BYUShaka.png" alt="BYU Shaka" />
          <p style={{fontSize: "30px", fontFamily: 'Kantumruy'}}>Made by students like you!</p>
        </div>
      </div>
    
    </>
  )
}

export default Home;



// import { Link } from "react-router-dom";
// import { Box, Button, Stack } from "@mui/material";
// import WhiteLogo from "../assets/White Logo V4.jpg";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import Hero from "../components/Hero";
// return (
//   <Box sx={{ width: "100%" }}>
//     <Stack
//       direction="row"
//       justifyContent="space-between"
//       alignItems="center"
//       sx={{ bgcolor: "white", padding: 2 }}
//     >
//       <Link to="/" style={{ display: "flex", alignItems: "center" }}>
//         <img src={WhiteLogo} alt="Logo" width="100" />
//         <Box sx={{ marginLeft: 2 }}>
//           <Button color="inherit">Products</Button>
//           <Button color="inherit">Pricing</Button>
//           <Button color="inherit">Blog</Button>
//         </Box>
//       </Link>
//       <AccountCircleIcon sx={{ fontSize: 40 }} />
//     </Stack>

//     <Box
//       display="flex"
//       flexDirection="column"
//       alignItems="flex-start"
//       justifyContent="flex-start"
//       flex="1"
//       style={{ marginTop: "20px" }}
//     >
//       <Hero />
//       <Link to="/search" style={{ alignSelf: "center", marginTop: "20px" }}>
//         <Button className="btn btn-primary" variant="contained">
//           Find a Job
//         </Button>
//       </Link>
//     </Box>
//   </Box>
// );
// };