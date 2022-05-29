class MyLogin extends HTMLElement {

    formUsername = "";
    formPassword = "";

    connectedCallback() {
        this.innerHTML=`
            <form class='bg-gray-500 shadow-md rounded px-8 pt-6 pb-8 mb-4' id="login-form">
                <div class='mb-4'>
                    <label class='block text-gray-700 text-sm font-bold mb-2' for="username">Username</label>
                    <input 
                        id="username"
                        required
                        type="text"
                        name="username"
                        placeholder="username"
                        class='rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline'
                    />
                </div>
                <div>
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="password" >Password</label>
                    <input 
                        id="password"
                        required
                        type="password"
                        name="password"
                        placeholder="password"
                        class='class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"'
                    />
                </div>
                <button class="bg-[#2a9fd6] hover:bg-[#0b73a0] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                Login
                </button>
            </form>
        `;

        let form = document.getElementById('login-form');
        let usernameInput = document.getElementById('username');
        let passwordInput = document.getElementById('password');

        form.addEventListener('submit', this.handleLogin);
        usernameInput.addEventListener('input', this.usernameChange);
        passwordInput.addEventListener('input', this.passwordChange);

    }

    usernameChange(){
        let usernameInput = document.getElementById('username');
        this.formUsername = usernameInput.value;
        console.log(this.formUsername);
    }

    passwordChange(){
        let passwordInput = document.getElementById('password');
        this.formPassword = passwordInput.value;
        console.log(this.formPassword);
    }

    handleLogin(e){
        e.preventDefault();
        let usernameInput = document.getElementById('username');
        let passwordInput = document.getElementById('password');
        axios 
            .post("http://localhost:8080/auth/signin", {
                username: usernameInput.value,
                password: passwordInput.value,
            })
            .then((response) => {
                if(response.data.accessToken) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }
                window.location.replace('/user/'.concat(usernameInput.value));
            })
            .catch(err => {
                console.log(err);
            })
    }

}

customElements.define( 'my-login', MyLogin);