var express = require('express');
var router = express.Router();
var AuthService = require('../services/auth.service.js');
var axios = require('axios');

/* GET home page. */
router.get('/', function(req, res, next) {
  axios
    .get('http://localhost:8080/post/allPosts/')
    .then(response => {
      console.log(response.data.posts);
      let filterPosts = [];
      let requests = [];
      for(var i = 0; i < response.data.posts.length; i++){
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
              res.render('index', { title: 'Express', images: responses, posts: filterPosts, number: undefined});
          }))
          .catch(errors => {
              console.log(errors);
          })
  });
});

module.exports = router;
