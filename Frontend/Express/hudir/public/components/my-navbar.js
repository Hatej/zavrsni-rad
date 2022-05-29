class MyNavbar extends HTMLElement {

    connectedCallback() {
        this.innerHTML=`
            <div class="navbar">
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
                <div class="topnav" id="myTopnav">
                    <a href="/">Home</a>
                    <a href="/user" class="logged-in" id="profile-link">Profile</a>
                    <a class="hover:cursor-pointer logged-in" id="logout" onclick="logOut() class="logged-in"">Logout</a>
                    <a href="/upload/" class="logged-in">Upload</a>
                    <a href="/login" class="not-logged-in">Login</a>
                    <a href="/signup" class="not-logged-in">Signup</a>
                    <a class="icon" onclick="openMenu()" id="toggle">
                        <i class="fa fa-bars"></i>
                    </a>
                </div>
            </div>
        `;

        var currentUser = this.getCurrentUser();
        console.log(currentUser);

        if(currentUser){
            document.getElementById('profile-link').href = '/user/'.concat(currentUser.username);
        }

        var elems = currentUser ? document.querySelectorAll(".not-logged-in") : document.querySelectorAll(".logged-in");

        for(var i = 0; i < elems.length; i++){
            elems[i].style.display = "none";
        }

        document.getElementById('toggle').addEventListener('click', this.openMenu);
        document.getElementById('logout').addEventListener('click', this.logout);

    }

    getCurrentUser(){
        return JSON.parse(localStorage.getItem("user"));
    };

    openMenu(){
        let menuButton = document.getElementById('myTopnav');
        if (menuButton.className === "topnav") {
            menuButton.className += " responsive";
        } else {
            menuButton.className = "topnav";
        }
    }

    logout(){
        localStorage.removeItem("user");
        window.location.replace('/');
    };

}

customElements.define( 'my-navbar', MyNavbar);