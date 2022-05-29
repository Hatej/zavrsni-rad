<template>
    <div className='flex justify-center mt-32'>
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.4.1/css/all.css" integrity="sha384-5sAR7xN1Nv6T6+dT2mhtzEpVJvfS3NScPQTrOxhwjIuvcA67KV2R5Jz6kr4abQsz" crossOrigin="anonymous"/>
        <form className='bg-gray-500 shadow-md rounded px-8 pt-6 pb-8 mb-4 basis-96' @submit.prevent="onSubmit">
            <div className="flex flex-col">
                <label htmlFor="fileToUpload" className="hover:cursor-pointer link"><i className="fas fa-upload">
                    </i>&nbsp;Add&nbsp;image&nbsp;
                </label>
                <input 
                    required
                    type="file"
                    name="fileToUpload"
                    accept="image/*"
                    @input="newImage"
                    className='custom-file-input'
                    id='fileToUpload'
                />
                <img v-if="showPreview" className="object-contain" :src="preview" />
            </div>
            <div>
                <label htmlFor="name">Name</label>
                <input 
                    v-model="postForm.name"
                    required
                    type="text"
                    name="name"
                    placeholder="Name"
                    className='rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline'
                />
            </div>
            <div>
                <label htmlFor="description">Description</label>
                <textarea 
                    v-model="postForm.description"
                    required
                    name="description"
                    placeholder="Description"
                    className='class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"'
                />
            </div>
            <button className="bg-[#2a9fd6] hover:bg-[#0b73a0] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                Post
            </button>
                {{message}}
        </form>
    </div>
</template>

<script>
    import axios from 'axios';
    import { BACKEND_URL } from '../constants';

    export default {
        name: "Upload",
        data() {
            return {
                'postForm': {
                    name: '',
                    description: ''
                },
                'image': null,
                'preview': null,
                'message': '',
                'objectUrl': null
            }
        },
        computed: {
            currentUser() {
                return this.$store.state.auth.user;
            },
            showPreview() {
                return this.preview !== null;
            }
        },
        unmounted() {
            URL.revokeObjectURL(this.objectUrl);
        },  
        methods: {
            newImage(e){
                this.image = e.target.files[0];
                this.objectUrl = URL.createObjectURL(this.image);
                this.preview = this.objectUrl;
            },
            onSubmit(e){
                this.message = "";
                const formData = new FormData();
                formData.append('name', this.postForm.name);
                formData.append('description', this.postForm.description);
                formData.append('userId', this.currentUser.id);
                formData.append('image', this.image);

                axios
                    .post(BACKEND_URL.concat('/post/upload'), formData)
                    .then(response => {
                        console.log(response);
                        this.$router.push("/post/".concat(response.data.id));
                    })
                    .catch(err => {
                        console.log(err);
                    })
                    }
            }
        }
</script>

<style>

</style>