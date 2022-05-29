class MyUpload extends HTMLElement {

    objectUrl = "";

    connectedCallback() {
        this.innerHTML=`
            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.4.1/css/all.css" integrity="sha384-5sAR7xN1Nv6T6+dT2mhtzEpVJvfS3NScPQTrOxhwjIuvcA67KV2R5Jz6kr4abQsz" crossOrigin="anonymous"/>
            <form class='bg-gray-500 shadow-md rounded px-8 pt-6 pb-8 mb-4 basis-96' id="upload-form">
                <div class="flex flex-col">
                    <label for="fileToUpload" class="hover:cursor-pointer link"><i class="fas fa-upload">
                        </i>&nbsp;Add&nbsp;image&nbsp;
                    </label>
                    <input 
                        required
                        type="file"
                        name="fileToUpload"
                        accept="image/*"
                        class='custom-file-input'
                        id='fileToUpload'
                    />
                    <img class="object-contain hidden" id="preview" />
                </div>
                <div>
                    <label for="name">Name</label>
                    <input 
                        required
                        type="text"
                        name="name"
                        placeholder="Name"
                        class='rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline'
                        id="name"
                    />
                </div>
                <div>
                    <label for="description">Description</label>
                    <textarea 
                        id="description"
                        required
                        name="description"
                        placeholder="Description"
                        class='class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"'
                    ></textarea>
                </div>
                <button class="bg-[#2a9fd6] hover:bg-[#0b73a0] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                    Post
                </button>
                    <span id="message"></span>
            </form>
        `;

        let form = document.getElementById('upload-form');
        let imageInput = document.getElementById('fileToUpload');

        form.addEventListener('submit', this.handleSubmit);
        imageInput.addEventListener('input', this.newImage);

    }

    disconnectedCallback(){
        URL.revokeObjectURL(this.objectUrl);
    }

    newImage(e){
        this.objectUrl = URL.createObjectURL(e.target.files[0]);
        var preview = document.getElementById('preview');
        preview.src = this.objectUrl;
        preview.classList.remove('hidden');
    }

    handleSubmit(e){
        e.preventDefault();

        let messageSpan = document.getElementById('message');
        let nameInput = document.getElementById('name');
        let descInput = document.getElementById('description');
        let fileInput = document.getElementById('fileToUpload');
        var currentUser = JSON.parse(localStorage.getItem("user"));

        messageSpan.innerText = "";

        const formData = new FormData();

        formData.append('name', nameInput.value);
        formData.append('description', descInput.value);
        formData.append('userId', currentUser.id);
        formData.append('image', fileInput.files[0]);

        axios
            .post("http://localhost:8080".concat('/post/upload'), formData)
            .then(response => {
                window.location.replace('/post/'.concat(response.data.id));
            })
            .catch(err => {
                console.log(err);
            })
            
    }

}

customElements.define( 'my-upload', MyUpload);