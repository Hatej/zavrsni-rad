class MySignup extends HTMLElement {

    connectedCallback() {
        this.innerHTML=`
        <form class='bg-gray-500 shadow-md rounded px-8 pt-6 pb-8 mb-4' id="signup-form">
            <div>
                <label class='block text-gray-700 text-sm font-bold mb-2' for="email">Email</label>
                <input 
                    id="email"
                    required 
                    type="email"
                    name="email"
                    placeholder="email"
                    class='rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline'
                />
            </div>
            <div>
                <label class='block text-gray-700 text-sm font-bold mb-2' htmlFor="username">Username</label>
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
                <label class='block text-gray-700 text-sm font-bold mb-2' htmlFor="password">Password</label>
                <input 
                    required
                    type="password"
                    name="password"
                    id="password"
                    placeholder="password"
                    class='rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline'
                />
            </div>
            <div>
                <label class='block text-gray-700 text-sm font-bold mb-2' htmlFor="confirm_password">Repeat password</label>
                <input 
                    required
                    type="password"
                    name="confirm_password"
                    placeholder="password"
                    id="confirm_password"
                    class='rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline'
                />
            </div>     
            <button class="bg-[#2a9fd6] hover:bg-[#0b73a0] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2" type="submit">Signup</button>
            <div>
                <span id="message"></span>
            </div>
        </form>
        `;

        let form = document.getElementById('signup-form');

        form.addEventListener('submit', this.handleSignup);

    }

    handleSignup(e) {
        e.preventDefault();
        var password2 = document.getElementById("confirm_password");
        var password = document.getElementById('password');
        var message = document.getElementById('message');
        message.innerText = "";

        if(password.value !== password2.value){
            e.stopPropagation();
            var message = document.getElementById('message');
            message.textContent = "Passwords don't match!";
            password2.setCustomValidity("Passwords Don't Match");
        } else {
            var usernameInput = document.getElementById('username');
            var emailInput = document.getElementById('email');
            password2.setCustomValidity('');    
            const user = {
            'username': usernameInput.value,
            'email': emailInput.value,
            'password': password.value
            };
            
            axios.post("http://localhost:8080/auth/signup", {
                  username: user.username,
                  email: user.email,
                  password: user.password,
                })
                .then(response => {
                    message.innerText = response.data.message;
                })
                .catch(error => {
                    message.innerText = 
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                            error.message ||
                            error.toString();
                })
             
        }
    }

}

customElements.define( 'my-signup', MySignup);