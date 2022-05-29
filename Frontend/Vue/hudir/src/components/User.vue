<template>
    <div>
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.4.1/css/all.css" integrity="sha384-5sAR7xN1Nv6T6+dT2mhtzEpVJvfS3NScPQTrOxhwjIuvcA67KV2R5Jz6kr4abQsz" crossOrigin="anonymous" />
        <div id='background' className="background">
            <form v-if="checkUser">
                <input 
                    type="file" 
                    className="custom-file-input" 
                    name="fileToUpload" 
                    id="fileToUpload" 
                    @change.prevent="upload"
                />
                <label htmlFor="fileToUpload" className="background-change"><i className="fas fa-upload">
                    </i>&nbsp;Change&nbsp;background&nbsp;(1920x640+)
                </label>
            </form>
            <div className="md:container md:mx-auto justify-center profile_container">
                <div v-if="checkUser" className="flex justify-center">                        
                    <form>
                        <input 
                            type="file" 
                            className="custom-file-input" 
                            name="pfpUpload" 
                            id="pfpUpload" 
                            @change.prevent="upload"
                        />
                        <label htmlFor="pfpUpload" className="background-change"><i className="fas fa-upload">
                            </i>&nbsp;Change&nbsp;profile picture&nbsp;
                        </label>
                    </form>
                </div>
                <div className="flex justify-center mb-3">
                    <Image :endpoint="'/user/pfp/'.concat(name)" className="profile_picture"/>
                </div>
                <div className="flex justify-center">
                    <h2 className="username text-xl">{{name}}</h2>
                </div>
            </div>
        </div>
        <div className="separator"></div>
        <Posts from="user" :username="name" />
    </div>
</template>

<script>
    import axios from 'axios';
    import { BACKEND_URL } from '../constants';
    import Image from './Image.vue';
    import Posts from './Posts.vue';

    export default {
        name: "User",
        data() {
            return {
                'userChange': {
                    'user': null
                },
                'name': this.$route.params.name
            }
        },
        computed: {
            currentUser() {
                return this.$store.state.auth.user;
            },
            checkUser(){
                console.log(this.currentUser);
                console.log(this.name);
                if(this.currentUser !== null){
                    if(this.currentUser.username === this.name){
                        return true;
                    }
                }
                return false;
            }
        },
        methods: {
            upload(e){
                const formData = new FormData();

                formData.append('username', this.currentUser.username);
                formData.append('image', e.target.files[0]);

                const endPoint = '/user/'.concat(e.target.id === "fileToUpload" ? "setBackground" : "setPfp");

                axios
                    .post(BACKEND_URL.concat(endPoint), formData)
                    .then(() => {
                        window.location.reload();
                    })
                    .catch(err => {
                        console.log(err);
                    })
            }
        },
        components: {
            Image,
            Posts
        },
        mounted() {
            axios
                .get(
                    BACKEND_URL.concat("/user/background/").concat(this.name),
                    { responseType: 'arraybuffer'},
                )
                .then(response => {
                    const base64 = btoa(
                        new Uint8Array(response.data).reduce(
                            (data, byte) => data + String.fromCharCode(byte),
                            '',
                        ),
                    );
                    let background = document.getElementById('background');
                    background.style.backgroundImage = 'linear-gradient(0deg, rgba(0,0,0,0.7931373232886905) 0%, rgba(42,43,46,0.13767513841474088) 50%, rgba(121,9,9,0) 70%), url(data:;base64,' + base64 + '), linear-gradient(0deg, rgba(0,0,0,0.7931373232886905) 0%, rgba(42,43,46,0.13767513841474088) 39%, rgba(121,9,9,0) 55%)';
                });
            axios 
                .get(BACKEND_URL.concat("/user/getInfo/").concat(this.name))
                .then(response => {
                    console.log(this.userChange);
                    this.userChange.user = response.data
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }
</script>

<style>
.background {
    height:550px;
    overflow:hidden;
    background-position:center center;
    background-repeat:no-repeat;
    background-size:cover;
}

.profile_container {
    margin-top: 21%;
}

.profile_picture {
    border-radius:50%; 
    width:125px; 
    height:125px; 
    object-fit:cover;
}

.separator {
    width:100%; 
    background-color:#2A2B2E; 
    height:30px;
    margin-bottom: 3%;
}

.username {
    color:azure; 
}

#fileToUpload, #pfpUpload {
    width: 0px;
}

.background-change{ 
    color:#2a9fd6;
    border-style:solid; 
    font-size:13px; 
    border-width:2px; 
    border-color:#171717; 
    border-radius: 8px; 
    padding-right:3px; 
    padding-left:3px; 
    background-color:#2A2B2E; 
    white-space: nowrap;
}

.background-change:hover{ 
    background-color:#060606; 
    transition:background-color 1000ms linear;
    cursor: pointer;
}

@media screen and (max-width: 1000px) {
    .background {
        height: 350px;
    }
    .profile_container{
        margin-top: 12%;
    }
}
</style>