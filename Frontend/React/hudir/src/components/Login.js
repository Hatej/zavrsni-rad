import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/auth.service';

function Login(props){

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState("");
    let navigate = useNavigate();

    async function onSubmit(e) {
        e.preventDefault();
        setError("");
        AuthService.login(username, password).then(
            () => {
                navigate("/home");
                window.location.reload();
            },
            (error) => {
                const resMsg = 
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                setError(resMsg);
            }
        );
    }

    const onChangeUsername = (e) => {
        const username = e.target.value;
        setUsername(username);
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    return(
        <form onSubmit={onSubmit}>
            <label>
                Username:
                <input 
                    required
                    type="text"
                    value={username}
                    onChange={onChangeUsername}
                    placeholder="username"
                />
            </label>
            <label>
                Password:
                <input 
                    required
                    type="password"
                    value={password}
                    onChange={onChangePassword}
                    placeholder="password"
                />
            </label>
            <button type="submit">Login</button>
            {error}
        </form>
    );
}

export default Login;