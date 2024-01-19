import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom"
import * as sessionActions from '../../store/session';
import './SignupForm.css';

function SignupForm() {
    const disptach = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    if (sessionUser) return <Navigate to="/" replace={true}/>;

    const handleSubmit = (e) => {
        e.preventDefault();

       
            setErrors([]);

            return disptach(sessionActions.signup({ email, password}))
                .catch(async (res) => {
                    let data;
                    try {
                        data = await res.clone().json();
                    } catch {
                        data = await res.text();
                    }
                    if (data?.errors) setErrors(data.errors);
                    else if (data) setErrors([data])
                    else setErrors([res.statusText]);
                })
    }



    return (
        <>
        <div id="signUpContainer">
            <h1 id="signUpH1">Create your account</h1>
            <h3 id="signUpH3">Registration is easy</h3>
            <form onSubmit={handleSubmit}>
                <ul>{errors.map(error => <li key={error}>{error}</li>)}</ul>

                <label>Email Address
                    <input id="signUpEmail" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                <label>Password
                    <input id="signUpPassword" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
               
                <button id="signUpButton" type="submit">Register</button>
                
            </form>
        </div>
        </>
    )
}

export default SignupForm;