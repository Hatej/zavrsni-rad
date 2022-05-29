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
                navigate("/");
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
        <div className='flex justify-center mt-32'>
            <form className='bg-gray-500 shadow-md rounded px-8 pt-6 pb-8 mb-4' onSubmit={onSubmit}>
                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="username">Username</label>
                    <input 
                        required
                        type="text"
                        name="username"
                        value={username}
                        onChange={onChangeUsername}
                        placeholder="username"
                        className='rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline'
                    />
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password" >Password</label>
                    <input 
                        required
                        type="password"
                        name="password"
                        value={password}
                        onChange={onChangePassword}
                        placeholder="password"
                        className='class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"'
                    />
                </div>
                <button className="bg-[#2a9fd6] hover:bg-[#0b73a0] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                Login
                </button>
                {error}
            </form>
        </div>   
    );
}

export default Login;