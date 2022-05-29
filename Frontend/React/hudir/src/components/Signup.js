import { useState } from "react";
import AuthService from "../services/auth.service";

function Signup(props){

    const [singUpForm, setSignUpForm] = useState({username: '', email: '', password:''});
    const [repeatedPassword, setRepeatedPassword] = useState('');
    const [error, setError] = useState('');

    async function onSubmit(e){
        e.preventDefault();
        setError("");
        if(!validatePassword()){
            e.stopPropagation();
        } else {
            AuthService.register(singUpForm.username, singUpForm.email, singUpForm.password).then(
                (response) => {
                    setError(response.data.message);
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
    }

    function onChange(event) {
        validatePassword();
        const {name, value} = event.target;
        let newForm = {username: singUpForm.username, email: singUpForm.email, password: singUpForm.password};
        newForm[name] = value;
        setSignUpForm(newForm);
    }

    const onChangeRepeatedPassword = (e) => {
        const password = e.target.value;
        setRepeatedPassword(password);
    }

    function validatePassword(){
        var password1 = document.getElementById("password"), password2 = document.getElementById("confirm_password");
        if(password1.value !== password2.value) {
            password2.setCustomValidity("Passwords Don't Match");
            return false;
        } else {
            password2.setCustomValidity('');
            return true;
        }
    }

    return(
        <div className='flex justify-center mt-32'>
            <form className='bg-gray-500 shadow-md rounded px-8 pt-6 pb-8 mb-4' onSubmit={onSubmit}>
                <div>
                    <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="email">Email</label>
                    <input 
                        required 
                        type="email"
                        name="email"
                        value={singUpForm.email}
                        onChange={onChange}
                        placeholder="email"
                        className='rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline'
                    />
                </div>
                <div>
                    <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="username">Username</label>
                    <input 
                        required
                        type="text"
                        name="username"
                        value={singUpForm.username}
                        onChange={onChange}
                        placeholder="username"
                        className='rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline'
                    />
                </div>
                <div>
                    <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="password">Password</label>
                    <input 
                        required
                        type="password"
                        name="password"
                        value={singUpForm.password}
                        onChange={onChange}
                        id="password"
                        placeholder="password"
                        className='rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline'
                    />
                </div>
                <div>
                    <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="confirm_password">Repeat password</label>
                    <input 
                        required
                        type="password"
                        name="confirm_password"
                        value={repeatedPassword}
                        onChange={onChangeRepeatedPassword}
                        placeholder="password"
                        id="confirm_password"
                        onKeyUp={validatePassword}
                        className='rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline'
                    />
                </div>     
                <button className="bg-[#2a9fd6] hover:bg-[#0b73a0] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2" type="submit">Signup</button>
                <div>
                    <span>{error}</span>
                </div>
            </form>
        </div>
    );
}

export default Signup;