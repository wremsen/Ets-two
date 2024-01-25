// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Navigate } from "react-router-dom"
// import * as sessionActions from '../../store/session';
// import './SignupForm.css';

// function SignupForm() {
//     const dispatch = useDispatch();
//     const sessionUser = useSelector(state => state.session.user);
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [errors, setErrors] = useState([]);

//     if (sessionUser) return <Navigate to="/" replace={true}/>;

//     const handleSubmit = (e) => {
//         e.preventDefault();

       
//             setErrors([]);

//             return dispatch(sessionActions.signup({ email, password }))
//                 .catch(async (res) => {
//                     let data;
//                     try {
//                         data = await res.clone().json();
//                     } catch {
//                         data = await res.text();
//                     }
//                     if (data?.errors) setErrors(data.errors);
//                     else if (data) setErrors([data])
//                     else setErrors([res.statusText]);
//                 })
//     }



//     return (
//         <>
//         <div id="signUpContainer">
//             <div id="signUpFormContainer">
//             <h1 id="signUpH1">Create your account</h1>
//             <h3 id="signUpH3">Registration is easy</h3>
//             <form id="signUpForm" onSubmit={handleSubmit}>
//                 <ul>{errors.map(error => <li key={error}>{error}</li>)}</ul>

//                 <label>Email Address
//                     <input id="signUpEmail" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
//                 </label>
//                 <label>Password
//                     <input id="signUpPassword" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
//                 </label>
               
//                 <button id="signUpButton" type="submit">Register</button>
                
//             </form>
//             </div>
//         </div>
//         </>
//     )
// }

// export default SignupForm;