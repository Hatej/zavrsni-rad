<template>
    <div className="flex flex-col-reverse md:flex-row md:min-h-screen">
        <div className="left_side basis-9/12 mt-8">
            <div className="flex justify-center">
                <Image :endpoint="'/post/getPostPicture/'.concat(postId)" className="post-picture" />
            </div>
            <br/>
            <hr className="comment_separator" />
            <div v-if="!loading" className="add-comment-container">
                <div v-if="currentUser" className="flex add-comment-form">
                    <Image :endpoint="'/user/pfp/'.concat(currentUser.username)" className="profile_picture comment-picture"/>
                    <form @submit.prevent="submit" className="w-4/5">
                        <div className="flex items-center border-b border-zinc-600 py-2">
                        <textarea 
                            v-model="newComment"
                            type="text"
                            name="comment"
                            @input="auto_grow"
                            className="appearance-none bg-transparent border-none w-full h-7 text-[#f2f4f3] mr-3 py-1 px-2 leading-tight resize-none overflow-hidden"
                            aria-label="Full name" 
                            placeholder="Comment..."
                        />
                        <button className="flex-shrink-0 bg-[#2a9fd6] hover:bg-[#0b73a0] border-[#2a9fd6] hover:border-[#0b73a0] text-sm border-4 text-white py-1 px-2 rounded" type="submit">
                            Comment
                        </button>
                        </div>
                    </form>
                </div>
                <div v-if="!getCommentsLength" className="comments-container">
                    <Comment 
                        v-for="comment in comments"
                        :key="comment.id" 
                        :username="comment.user.username"
                        :content="comment.content" 
                    />
                </div>
            </div>
        </div>
        <div v-if="!loading" className="right-side basis-3/12 px-4">
            <div className="flex mt-6">
                <Image :endpoint="'/user/pfp/'.concat(post.user.username)" className="profile_picture small mr-2" />&nbsp;
                <a :href="'/user/'.concat(post.user.username)" className="text-2xl link">{{post.user.username}}</a>
            </div>
            <div className="mb-2 pb-2 description">
                <p className="text-2xl">{{post.name}}</p>
                <p className="text-zinc-400">{{post.description}}</p>
            </div>
            <div className="flex flex-col w-full">
                <div className="hidden md:block">
                    <span className="text-2xl">More by</span> &nbsp; <a :href="'/user/'.concat(post.user.username)" className="new-link text-2xl">{{post.user.username}}</a>
                </div>
                <div className="hidden md:block">
                    <Posts from="user" :username="post.user.username" number="9" :currentPost="postId" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import { BACKEND_URL } from '../constants';
    import Image from './Image.vue';
    import Posts from './Posts.vue';
    import Comment from './Comment.vue';

    export default {
        name: "Post",
        data() {
            return {
                'post': null,
                'comments': [],
                'loading': true,
                'newComment': "",
                'postId': this.$route.params.postId
            }
        },
        computed: {
            currentUser() {
                return this.$store.state.auth.user;
            },
            getCommentsLength(){
                return this.comments.length === 0;
            }
        },
        components: {
            Image,
            Posts,
            Comment
        },
        mounted() {
            const postRequest = axios.get(BACKEND_URL.concat("/post/getPost/").concat(this.postId),);
            const commentRequest = axios.get(BACKEND_URL.concat("/comment/getCommentsForPost/").concat(this.postId),);
            axios.all([postRequest, commentRequest])
                .then(axios.spread((...responses) => {
                    this.post = responses[0].data;
                    let now = Date.now();
                    let createdAt = Date.parse(responses[0].data.createdAt);
                    this.comments = responses[1].data.comments;
                    console.log(this.comments);
                    this.loading = false;
                }))
                .catch(errors => {
                    console.log(errors);
                })
        },
        methods: {
            submit(e){
                const data = {
                    content: this.newComment,
                    userId: this.currentUser.id,
                    postId: this.postId
                };
                console.log(data);
                axios.post(BACKEND_URL.concat('/comment/postComment/'), data)
                .then(() => {
                    window.location.reload();
                })
                .catch(err => {
                    console.log(err);
                })
            },
            auto_grow(e) {
                e.target.style.height = "5px";
                e.target.style.height = (e.target.scrollHeight)+"px";
            }
        }
    }
</script>

<style>
body {
    background-color: black;
}

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

.left_side {
    color:#f2f4f3; 
    background-color: black;
}

.description {
    margin-top: 2%;
    border-bottom: 1px solid #333;
}

.comment_separator {
    border-color: #515151;
    margin-top: 1%;
    margin-bottom: 1%;
}

.comments-container {
    margin-bottom:5%; 
    margin-left:1%;
}

.add-comment-container {
    margin-left: 1%;
}

.add-comment-form {
    margin-bottom: 5%;
}

.right-side {
    background-color:#171717;
    color:#f2f4f3;
}

.post-picture {
    max-height: 800px;
}

.link {
    color:#2a9fd6;
    animation: post_link_unhover 0.3s;
}

.link:hover {
    color:#0b73a0;
    animation: post_link_hover 0.3s;
}

.new-link {
    color: #f2f2f2;
    animation: link_unhover 0.3s;
}

.new-link:hover {
    color:#2a9fd6;
    animation: link_hover 0.3s;
}

.profile_picture.comment-picture {
    width:50px; 
    height:50px; 
    display:inline;
    margin-right: 1%;
    border-radius:50%; 
    object-fit:cover;
}

@keyframes post_link_hover{ 
    from {color: #2a9fd6;} 
    to {color:#0b73a0;}
}

@keyframes post_link_unhover {
    from {color:#0b73a0};
    to {color: #2a9fd6;}
}

@media screen and (max-width: 992px) {
    
}
</style>