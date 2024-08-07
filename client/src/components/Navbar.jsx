import { Container } from '@mui/material';
import { Link } from 'react-router-dom';


const Navbar = () => {
  return (
    <Container
    style={{
            minWidth: "1300px",
            maxWidth: "1300px",
            paddingLeft: "120px",
            backgroundColor: "white"}}>
    <header >
      <div className="logo">
        <Link to="/">
          <img src="/src/assets/White Logo V4.jpg" alt="Logo" />
        </Link>
      </div>

      <div className="nav-links">
        <div className="dropdown">
          <div className="dropbtn">
            <Link to="#" className="nav-link">Explore</Link>
          </div>
          <div className="dropdown-content">
            <Link to="/rate">Rating</Link>
            <Link to="/search">Search</Link>
          </div>
        </div>
        <div className="dropdown">
          <div className="dropbtn">
            <Link to="#" className="nav-link">Follow Us!</Link>
          </div>
          <div className="dropdown-content">
            <a href="https://www.instagram.com/ratemy_yjob/">Instagram</a>
            <span>More to come...</span>
          </div>
        </div>
      </div>
    </header>
    </Container>
    
  )
}

export default Navbar
