var express = require('express');
var router = express.Router();
var axios = require('axios');

router.get('/:postId', function(req, res, next) {
    let comments = [];
    let post = {};
    const postId = req.params.postId;
    const postRequest = axios.get(BACKEND_URL.concat("/post/getPost/").concat(postId),);
    const commentRequest = axios.get(BACKEND_URL.concat("/comment/getCommentsForPost/").concat(postId),);
    axios.all([postRequest, commentRequest])
        .then(axios.spread((...responses) => {
            post = responses[0].data;
            let now = Date.now();
            let createdAt = Date.parse(responses[0].data.createdAt);
            comments = responses[1].data.comments;
            
            axios
                .get('http://localhost:8080/post/getPostsFromUser/'.concat(post.user.username))
                .then(response => {
                let filterPosts = [];
                let requests = [];
                for(var i = 0; i < response.data.posts.length; i++){
                    if(response.data.posts[i].id == postId) continue;
                    if(i == 9) break;
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
                        console.log(responses);
                        console.log(filterPosts);
                        res.render('post', {comments: comments, post: post, postId: postId, posts: filterPosts, number: 9});
                    }))
                    .catch(errors => {
                        console.log(errors);
                    })
                });
        }))
        .catch(errors => {
            console.log(errors);
        })
    
});

module.exports = router;
