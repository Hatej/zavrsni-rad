<template>
    <Posts from="all" />
</template>

<script>
import Posts from "./Posts.vue";

export default {
    name: "Home",
    data() {
        return {
            content: "",
        };
    },
    components: {
        Posts
    },
    mounted() {

    }
}

</script>