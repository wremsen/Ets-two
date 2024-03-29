import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import LoginForm from '../session/LoginForm';
// import SignupForm from '../session/SignupForm';
import { useNavigate } from 'react-router-dom';

function Navigation() {
  const sessionUser = useSelector(state => state.session.user);
  const navigate = useNavigate();


  const signInClick = (e) => {
    e.preventDefault();

    let signIn = document.getElementById("background");
    let signInModal = document.getElementById("signInContainer");

    signIn.style.display = "block"
    signInModal.style.display = "block"


  }

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <button id='signInNav' onClick={signInClick}>Sign In</button>
        {/* <NavLink to="/login">Sign In</NavLink>
        <NavLink to="/signup">Register</NavLink> */}
      </>
    );
  }

  const handleNavProduct = (productNum) => {
    navigate(`/products/${productNum}`)
  }

  return (
    <>
    <div id="mainNavContainer">
        <div id="topContainer">
                    <NavLink to="/" id='homeNavEtsTwo'>Ets-two</NavLink>

                    <form id="navSearch">
                      <input id="searchInput" type="text"/>
                      <button id="searchSubmit" type="submit">
                        <i className="fa-solid fa-magnifying-glass"></i>
                      </button>
                    </form>

                    {sessionLinks}
                    <LoginForm/>
        </div>
        <div id="bottomContainer">
          <button id="bottomNavButton" onClick={() => handleNavProduct(1)}>Amazing Smart Lamp</button>
          <button id="bottomNavButton" onClick={() => handleNavProduct(16)}>The Best Toothbrush</button>
          <button id="bottomNavButton" onClick={() => handleNavProduct(12)}>Solar Charger</button>
          <button id="bottomNavButton" onClick={() => handleNavProduct(7)}>Smart Water Bottle</button>
          <button id="bottomNavButton" onClick={() => handleNavProduct(14)}>Noise-Canceling Earplugs</button>
        </div>
    </div>
    </>
  );
}

export default Navigation;