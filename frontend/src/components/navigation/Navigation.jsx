import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import LoginForm from '../session/LoginForm';
// import SignupForm from '../session/SignupForm';

function Navigation() {
  const sessionUser = useSelector(state => state.session.user);


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

  return (
    <>
    <div id="mainNavContainer">
        <div id="topContainer">
                    <NavLink to="/" style={{ color: "orange", fontSize: "28px", textDecoration: "none" }}>Ets-two</NavLink>

                    <form id="navSearch">
                      <input type="text"/>
                      <button type="submit">
                        {/* <i class="fa-solid fa-magnifying-glass"></i> */}
                      </button>
                    </form>

                    {sessionLinks}
                    <LoginForm/>
        </div>
        <div id="bottomContainer">
          <button id="bottomNavButton">Valentines Day</button>
          <button id="bottomNavButton">Home Favorites</button>
          <button id="bottomNavButton">Fashion Finds</button>
          <button id="bottomNavButton">Gift Guides</button>
          <button id="bottomNavButton">Registry</button>
        </div>
    </div>
    </>
  );
}

export default Navigation;