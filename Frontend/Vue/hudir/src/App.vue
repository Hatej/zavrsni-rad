<template>
  <div id="app">
    <div className="navbar">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
            <div className="topnav" id="myTopnav">
                <router-link to="/">Home</router-link>
                <router-link v-if="currentUser" :to="'/user/'.concat(currentUser.username)">Profile</router-link>
                <a v-if="currentUser" className="hover:cursor-pointer" @click.prevent="logOut">Logout</a>
                <router-link v-if="currentUser" to="/upload/">Upload</router-link>
                <router-link v-if="!currentUser" to="/login">Login</router-link>
                <router-link v-if="!currentUser" to="/signup">Signup</router-link>
                <a className="icon" @click="openMenu">
                    <i className="fa fa-bars"></i>
                </a>
            </div>
    </div>
    <router-view />
  </div>
</template>

<script>
  export default {
    computed: {
      currentUser() {
        return this.$store.state.auth.user;
      }
    },
    methods: {
      logOut() {
        this.$store.dispatch('auth/logout');
        this.$router.push('/')
      },
      openMenu() {
        let menuButton = document.getElementById('myTopnav');
        if (menuButton.className === "topnav") {
            menuButton.className += " responsive";
        } else {
            menuButton.className = "topnav";
        }
      }
    }
  };
</script>

<style>

.topnav {
    background-color: #101010;
    overflow: hidden;
  }
  
.topnav a {
    float: left;
    display: block;
    color: #f2f2f2;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
    font-size: 17px;
    animation: link_unhover 0.3s;
}
  
.topnav a:hover {
    color:#2a9fd6;
    background-color:transparent;
    border-color:transparent;
    animation: link_hover 0.3s;
}

@keyframes link_hover{ 
    from {color: #f2fff2ff;} 
    to {color:#2a9fd6;}
}

@keyframes link_unhover {
    from {color:#2a9fd6};
    to {color: #f2f2f2;}
}
  
.topnav a.active {
    color:#2a9fd6;
    background-color: #232323;
    animation: none;
}
  
.topnav .icon {
    display: none;
}

@media screen and (max-width: 640px) {
    .topnav a:not(:first-child) {display: none;}
    .topnav a.icon {
      float: right;
      display: block;
    }
}
  
@media screen and (max-width: 640px) {
    .topnav.responsive {position: relative;}
    .topnav.responsive a.icon {
      position: absolute;
      right: 0;
      top: 0;
    }
    .topnav.responsive a {
      float: none;
      display: block;
      text-align: left;
    }
}

.navbar {
    border-bottom: 1px solid #515151;
}

html {
  min-height: 100%;
}

body{ 
  min-height: 100vh;
  background-color:#171717;
  overflow-y: scroll;
  overflow-x: hidden;
} 

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
</style>
