<template>
    <div className='flex justify-center mt-32'>
        <form className='bg-gray-500 shadow-md rounded px-8 pt-6 pb-8 mb-4' @submit.prevent="(e) => handleSignup(e)">
            <div>
                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="email">Email</label>
                <input 
                    v-model="email"
                    required 
                    type="email"
                    name="email"
                    placeholder="email"
                    className='rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline'
                />
            </div>
            <div>
                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="username">Username</label>
                <input 
                    v-model="username"
                    required
                    type="text"
                    name="username"
                    placeholder="username"
                    className='rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline'
                />
            </div>
            <div>
                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="password">Password</label>
                <input 
                    v-model="password"
                    required
                    type="password"
                    name="password"
                    id="password"
                    placeholder="password"
                    className='rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline'
                />
            </div>
            <div>
                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="confirm_password">Repeat password</label>
                <input 
                    v-model="confirm_password"
                    required
                    type="password"
                    name="confirm_password"
                    placeholder="password"
                    id="confirm_password"
                    className='rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline'
                />
            </div>     
            <button className="bg-[#2a9fd6] hover:bg-[#0b73a0] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2" type="submit">Signup</button>
            <div>
                <span>{{ message }}</span>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    name:"Signup",
    data() {
        return{
            username: '',
            email: '',
            password: '',
            confirm_password: '',
            message: ""
        };
    },

    computed: {
        loggedIn() {
            return this.$store.state.auth.status.loggedIn;
        }
    },

    created() {
        if(this.loggedIn) {
            this.$router.push("/profile");
        }
    },

    methods: {
        handleSignup(e) {
            var password2 = document.getElementById("confirm_password");
            console.log(this.password);
            console.log(this.confirm_password);
            if(this.password !== this.confirm_password){
                e.stopPropagation();
                password2.setCustomValidity("Passwords Don't Match");
            } else {
                password2.setCustomValidity('');    
                const user = {
                'username': this.username,
                'email': this.email,
                'password': this.password
                };
                this.$store.dispatch("auth/register", user)
                    .then(response => {
                        this.message = response.message;
                    },
                    error => {
                        this.message = 
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                            error.message ||
                            error.toString();
                    }
                );   
            }
        }
    }
}
</script>