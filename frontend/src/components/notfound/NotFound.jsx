import { useNavigate } from "react-router";
import './NotFound.css';

const NotFound = () => {
    const navigate = useNavigate();
    const handleNav = (e) => {
        e.preventDefault();
        navigate('/')
    }

    return (
        <div id="notFoundWrapper">
            <h1>Oops! Looks like there was some sort of problem. Please click below to return home!</h1>
            <div id="etsTwoBox" onClick={handleNav}>
                <h2>Ets-Two</h2>
            </div>
        </div>
    )
}

export default NotFound;