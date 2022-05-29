<template>
    <div className='flex justify-center mt-32'>
            <form className='bg-gray-500 shadow-md rounded px-8 pt-6 pb-8 mb-4' @submit.prevent="handleLogin">
                <div className='mb-4'>
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
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password" >Password</label>
                    <input 
                        v-model="password"
                        required
                        type="password"
                        name="password"
                        placeholder="password"
                        className='class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"'
                    />
                </div>
                <button className="bg-[#2a9fd6] hover:bg-[#0b73a0] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                Login
                </button>
            </form>
        </div> 
</template>

<script>
    export default {
        name: "Login",
        data() {
            return{
                username: '',
                password: '',
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
            handleLogin() {
                const user = {
                    'username': this.username,
                    'password': this.password
                };
                console.log(user);
                this.$store.dispatch("auth/login", user)
                    .then(() => {
                        this.$router.push("/user/".concat(this.username));
                    },
                    (error) => {
                        this.message =
                            (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                            error.message ||
                            error.toString();
                    }
                );
            }
        },
    };
</script>