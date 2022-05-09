import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <li>
          <NavLink to="/login">Log In</NavLink>
        </li>
        <li>
          <NavLink to="/signup">Sign Up</NavLink>
        </li>
      </>
    );
  }

  return (
    <div className="navbar">
      <Link to="/" className="logo">kelp🌿</Link>
      <ul>
        {/* <li>
          <NavLink exact to="/">Home</NavLink>
        </li> */}
        <li className="navLinks">
          { sessionUser && (
            <>
            <NavLink to="/newBusiness">Add Business</NavLink>
            <> | </>
            </>
          // </li>
        )}
        {/* <li> */}
          <NavLink to="/business">All Businesses</NavLink> 
        </li>
        <li className="sessionLinks">
          <div className="sessionLinksDiv">
            {isLoaded && sessionLinks}
          </div>
        </li>
      </ul>
    </div>
  );
}

export default Navigation;