
const imgStyle = `
<style>
    .profile_picture {
    border-radius:50%; 
    width:125px; 
    height:125px; 
    object-fit:cover;
  }
  
  .profile_picture.small {
    width:60px; 
    height:60px; 
  }
  
  .extra-small {
    width: 30px;
    height: 30px;
  }

  .min-w-full {
      min-width: 100%;
  }

  .min-h-full {
      min-height: 100%;
      max-width: 100%;
    height: auto;
  }

  .object-cover {
      object-fit: cover;
  }

  .post-picture {
    max-height: 800px;
    max-width: 100%;
    height: auto;
    }

.comment-picture {
    width:50px; 
    height:50px; 
    display:inline;
    margin-right: 8px;
    border-radius:50%; 
    object-fit:cover;
}

</style>
`;

class MyImage extends HTMLElement {

    constructor() {
        super();
        this.endpoint = "";
        this.image = null;
        this.className = "";
        this.source = null;
    }

    connectedCallback() {
        const shadow = this.attachShadow({ mode: 'open' });
        shadow.innerHTML = imgStyle;
        let newImage = document.createElement('img');

        if(this.getAttribute('endpoint')){
            this.endpoint = this.getAttribute('endpoint');
            axios
                .get(
                    "http://localhost:8080".concat(this.endpoint),
                    { responseType: 'arraybuffer'},
                )
                .then(response => {
                    const base64 = btoa(
                        new Uint8Array(response.data).reduce(
                            (data, byte) => data + String.fromCharCode(byte),
                            '',
                        ),
                    );
                    console.log(response);
                    this.source = "data:;base64," + base64;
                    newImage.src = this.source;
                });    
        }

        if(this.getAttribute('image')){
            newImage.src = this.getAttribute('image');
        }

        if(this.getAttribute('className')){
            let classes = this.getAttribute('className').split(" ");
            for(var i = 0; i < classes.length; i++){
                newImage.classList.add(classes[i]);
            }
        }

        shadow.appendChild(newImage);

    }

}

customElements.define( 'my-img', MyImage);