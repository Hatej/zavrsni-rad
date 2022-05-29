
const commentStyle = `
<style>
.comment {
    margin-top:2%;
    color: #f2f4f3;
}

.comment-picture {
    width:50px; 
    height:50px; 
    display:inline;
    margin-right: 1%;
    border-radius:50%; 
    object-fit:cover;
}

.comment-content {
    margin-top: 10px;
}

.flex {
    display: flex;
}

a {
    text-decoration: none;
    color: #f2f2f2;
    animation: link_unhover 0.3s;
}

a:hover {
    color:#2a9fd6;
    animation: link_hover 0.3s;
}

@keyframes link_hover{ 
    from {color: #f2f2f2;} 
    to {color:#2a9fd6;}
  }
  
@keyframes link_unhover {
    from {color:#2a9fd6};
    to {color: #f2f2f2;}
}
</style>
`;

class MyComment extends HTMLElement {

    constructor() {
        super();
    }   

    connectedCallback() {
        const shadow = this.attachShadow({ mode: 'open' });
        shadow.innerHTML = commentStyle;
        let container = document.createElement('div');

        container.classList.add("flex");
        container.classList.add("comment");

        let username = this.getAttribute('username');
        let content = this.getAttribute('content');

        container.innerHTML = `
            <my-img endpoint="/user/pfp/` + username + `" className="comment-picture"></my-img>
            <div>
                <a href="/user/` + username + `">` + username + `</a>
                <p class="comment-content">` + content + `</p>
            </div>
        `;

        shadow.appendChild(container);
    }

}

customElements.define( 'my-comment', MyComment);