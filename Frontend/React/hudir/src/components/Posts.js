import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../constants";
import Image from "./Image";
import "./Posts.css";

function Posts(props){
    	
    const [posts, setPosts] = useState(null);
    const [postImages, setPostImages] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        var endpoint = BACKEND_URL.concat("/post/");
        if(props.from === "user"){
            endpoint = endpoint.concat("getPostsFromUser/").concat(props.username);
        }
        if(props.from === "all"){
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
                    console.log(props.currentPost);
                    if(response.data.posts[i].id == props.currentPost) continue;
                    if(i == props.number) break;
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
                        setPostImages(responses);
                        setLoading(false);
                    }))
                    .catch(errors => {
                        console.log(errors);
                    })
                setPosts(filterPosts);
            });
        
    }, []);

    return(
        <div className="flex flex-wrap mx-0">
            {
                loading ? (
                    <></>
                ) : (
                    <>
                       {
                           posts.map((post, index) => {
                                return (
                                    <div className={(props.number !== undefined) ? ("user-post-square more") : ("user-post-square")} key={index}>
                                        <div className="user-post">
                                            <a href={"/post/".concat(post.id)} key={post.id} className="w-full h-full"> 
                                                <Image image={postImages[index].data} className="min-w-full min-h-full object-cover" /> 
                                            </a>
                                        </div>
                                    </div>  
                                );
                           })
                       }
                    </>
                )
            }
        </div>
    );

}

export default Posts;