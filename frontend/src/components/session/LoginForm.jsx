import './LoginForm.css';
import { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function LoginForm() {
    const disptach = useDispatch();
    const sessionUser = useSelector(state => state.session.user)
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);
    const [email, setEmail] = useState('');
    

    if (sessionUser) return <Navigate to="/" replace={true} />;

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);

        return disptach(sessionActions.login({ credential, password }))
            .catch(async (res) => {
                let data;
                try {
                    data = await res.clonse().json();
                } catch {
                    data = await res.text();
                }
                if (data?.errors) setErrors(data.errors);
                else if (data) setErrors([data]);
                else setErrors([res.statusText]);
            });
    }



    const handleDemoLogin = (e) => {
        e.preventDefault()
        setErrors([]);

        let credential = "kaladin@stormblessed.io"
        let password = "sylphrena"

        return disptach(sessionActions.login({ credential, password }))
            .catch(async (res) => {
                let data;
                try {
                    data = await res.clonse().json();
                } catch {
                    data = await res.text();
                }
                if (data?.errors) setErrors(data.errors);
                else if (data) setErrors([data]);
                else setErrors([res.statusText]);
            });
    }

    const navToRegister = (e) => {
        e.preventDefault();
        let signInModal = document.getElementById("signInContainer");
        signInModal.style.display = "none";

        let signUpForm = document.getElementById("signUpContainer");
        signUpForm.style.display = "block";
    }

    const handleClose = (e) => {
        e.preventDefault();

        let backgroundClose = document.getElementById("background");
        let signUpClose = document.getElementById("signUpContainer");

        backgroundClose.style.display = "none";
        signUpClose.style.display = "none";
    }
    const keepModal = (e) => {
        e.stopPropagation();
    }



    const handleSignUp = (e) => {
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


    return(
        <div id='background' onClick={handleClose}>
        <div id="signInContainer" onClick={keepModal}>
            <div id='signInForm'>
            <h1 id='signInH1'>Sign in</h1>
            <button id='registerLink' onClick={navToRegister}>Register</button>
            <form id='signInForm' onSubmit={handleSubmit}>
                <ul id='signInErrors'>
                    {errors.map(error => <li key={error}>{error}</li>)}
                </ul>
                <label>Email address
                    <input id='signInEmail' type="text" value={credential} onChange={(e) => setCredential(e.target.value)} required/>
                </label>
                <label>Password
                    <input id='SignInPassword' type="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                </label>
                <button id='signInButton' type="submit">Sign in</button>
                <button id='signInButton' onClick={handleDemoLogin}>Demo Login</button>
            </form>
            </div>
        </div>


        <div id="signUpContainer" onClick={keepModal}>
            <div id='signUpFormContainer'>
            <h1 id="signUpH1">Create your account</h1>
            <h3 id="signUpH3">Registration is easy.</h3>
            <form id="signUpFormForm" onSubmit={handleSignUp}>
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
        </div>

        </div>
    )
}

export default LoginForm;




