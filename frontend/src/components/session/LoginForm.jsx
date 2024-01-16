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


    return(
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <ul>
                    {errors.map(error => <li key={error}>{error}</li>)}
                </ul>
                <label>Email
                    <input type="text" value={credential} onChange={(e) => setCredential(e.target.value)} required/>
                </label>
                <label>Passowrd
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                </label>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default LoginForm;




