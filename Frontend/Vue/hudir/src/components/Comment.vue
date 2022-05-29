<template>
    <div className="flex comment">
        <Image :endpoint="'/user/pfp/'.concat(this.username)" className="comment-picture" />&nbsp;
        <div>
            <a :href="'/user/'.concat(this.username)">{{username}}</a>
            <p className="comment-content" >{{content}}</p>
        </div>
    </div>
</template>

<script>
    import Image from "./Image.vue";

    export default {
        name:"Comment",
        props: [
            'username',
            'content'
        ],
        components: {
            Image
        }
    }
</script>

<style>
.comment {
    margin-top:2%;
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

</style>