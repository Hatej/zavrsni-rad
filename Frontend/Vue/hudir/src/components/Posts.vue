<template>
    <div className="flex flex-wrap mx-0">
        <div v-if="loading">LOADING</div>
        <div v-else v-for="(post, index) in posts" :key="index" :class="[{ more: (this.number !== undefined) }, userPostSquare]">
            <div className="user-post">
                <a :href="'/post/'.concat(post.id)" className="w-full h-full"> 
                    <Image v-bind:image="images[index].data" className="min-w-full min-h-full object-cover" /> 
                </a>
            </div>
        </div>    
    </div>
</template>

<script>
    import axios from 'axios';
    import { BACKEND_URL } from '../constants';
    import Image from "./Image.vue";

    export default {
        name: "Posts",
        props: [
            'from',
            'username', 
            'currentPost',
            'number'
        ],
        data() {
            return {
                'posts': [],
                'images': [],
                'loading': true,
                'userPostSquare': 'user-post-square'
            }
        },
        components: {
            Image
        },
        mounted() {
            console.log(this.from);
            console.log(this.username);
            var endpoint = BACKEND_URL.concat("/post/");
            if(this.from === "user"){
                endpoint = endpoint.concat("getPostsFromUser/").concat(this.username);
            }
            if(this.from === "all"){
                endpoint = endpoint.concat("allPosts/");
            }
            axios
                .get(
                    endpoint,
                )
                .then(response => {
                    console.log(response.data.posts);
                    let filterPosts = [];
                    let requests = [];
                    for(var i = 0; i < response.data.posts.length; i++){
                        console.log(this.currentPost);
                        if(response.data.posts[i].id == this.currentPost) continue;
                        if(i == this.number) break;
                        filterPosts.push(response.data.posts[i]);
                        requests.push(
                            axios.get(
                                BACKEND_URL.concat("/post/getPostPicture/").concat(response.data.posts[i].id),
                                { responseType: 'arraybuffer'},
                            ) 
                        );
                    }
                    console.log(requests);
                    axios.all(requests)
                        .then(axios.spread((...responses) => {
                            this.images = responses;
                        }))
                        .catch(errors => {
                            console.log(errors);
                        })
                        .finally(() => {
                            console.log(this.posts);
                            console.log(this.images);
                            this.loading = false;
                        })
                    this.posts = filterPosts;
                })
                .finally(() => {
        
                });
        }
    }
</script>

<style>
.user-post-square.more {
    flex-basis: 33.33333%;
}

.user-post-square {
    position: relative;
    flex-basis: 20%;
}

.user-post-square::before {
    content: '';
    display: block;
    padding-top: 100%;
}

.user-post {
    position: absolute;
    top: 0; left: 0;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
}

@media screen and (max-width: 992px) {
    .user-post-square {
        flex-basis: 25%;
    }
}

@media screen and (max-width: 640px) {
    .user-post-square {
        flex-basis: 33.33333%;
    }
}
</style>