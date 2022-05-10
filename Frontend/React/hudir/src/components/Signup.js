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
        <form onSubmit={onSubmit}>
            <label>
                Email:
                <input 
                    required 
                    type="email"
                    name="email"
                    value={singUpForm.email}
                    onChange={onChange}
                    placeholder="email"
                />
            </label>
            <label>
                Username:
                <input 
                    required
                    type="text"
                    name="username"
                    value={singUpForm.username}
                    onChange={onChange}
                    placeholder="username"
                />
            </label>
            <label>
                Password:
                <input 
                    required
                    type="password"
                    name="password"
                    value={singUpForm.password}
                    onChange={onChange}
                    id="password"
                    placeholder="password"
                />
            </label>
            <label>
                Repeat password:
                <input 
                    required
                    type="password"
                    name="confirm_password"
                    value={repeatedPassword}
                    onChange={onChangeRepeatedPassword}
                    placeholder="password"
                    id="confirm_password"
                    onKeyUp={validatePassword}
                />
            </label>
            <button type="submit">Signup</button>
            {error}
        </form>
    );
}

export default Signup;