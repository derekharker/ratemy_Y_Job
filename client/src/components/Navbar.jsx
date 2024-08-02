import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div>
      <ul>
        <li>Logo</li>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/">Search</Link></li>
        <li><Link to="/">Rate</Link></li>
      </ul>
    </div>
  )
}

export default Navbar
