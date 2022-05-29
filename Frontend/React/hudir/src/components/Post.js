import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BACKEND_URL } from "../constants";
import axios from "axios";
import "./Post.css";
import Image from "./Image";
import Comment from "./Comment";
import Posts from "./Posts";

function Post(props){

    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState(null);
    const [loading, setLoading] = useState(true);
    const [newComment, setNewComment] = useState("");

    useEffect(() => {
        const postRequest = axios.get(BACKEND_URL.concat("/post/getPost/").concat(postId),);
        const commentRequest = axios.get(BACKEND_URL.concat("/comment/getCommentsForPost/").concat(postId),);
        axios.all([postRequest, commentRequest])
            .then(axios.spread((...responses) => {
                setPost(responses[0].data);
                let now = Date.now();
                let createdAt = Date.parse(responses[0].data.createdAt);
                setComments(responses[1].data.comments);
                setLoading(false);
            }))
    }, []);

    function onSubmit(e) {
        e.preventDefault();
        const data = {
            content: newComment,
            userId: props.currentUser.id,
            postId: postId
        };
        console.log(data);
        axios.post(BACKEND_URL.concat('/comment/postComment/'), data)
        .then(response => {
            window.location.reload();
        })
        .catch(err => {
            console.log(err);
        })
    }

    function onChangeComment(e){
        setNewComment(e.target.value);
    }

    function auto_grow(e) {
        e.target.style.height = "5px";
        e.target.style.height = (e.target.scrollHeight)+"px";
    }

    return(
        <div className="flex flex-col-reverse md:flex-row md:min-h-screen">
            <div className="left_side basis-9/12 mt-8">
                <div className="flex justify-center">
                    <Image endpoint={'/post/getPostPicture/'.concat(postId)} className="post-picture" />
                </div>
                <br/>
                {
                    loading ? (
                        <></>
                    ) : (
                        <>
                            <hr className="comment_separator"></hr>
                            <div className="add-comment-container">
                                {
                                    props.currentUser ? (
                                        <div className="flex add-comment-form">
                                            <Image endpoint={"/user/pfp/".concat(props.currentUser.username)} className="profile_picture comment-picture"/>
                                            <form onSubmit={onSubmit} className="w-4/5">
                                                <div className="flex items-center border-b border-zinc-600 py-2">
                                                    <textarea 
                                                        type="text"
                                                        name="comment"
                                                        onInput={auto_grow}
                                                        onChange={onChangeComment}
                                                        value={newComment}
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
                                    ) : (
                                        <></>
                                    )
                                }
                            </div>
                            <div className="comments-container">
                                {
                                    comments.length === 0 ? (
                                        <>
                                        </>
                                    ) : (
                                        <>
                                            {
                                                comments.map(comment => {
                                                    return <Comment 
                                                                key={comment.id} 
                                                                username={comment.user.username}
                                                                content={comment.content} 
                                                            />;
                                                })
                                            }
                                        </>
                                    )
                                }
                            </div>
                        </>
                    )
                }
            </div>
            <div className="right-side basis-3/12 px-4">
                {
                    loading ? (
                        <></>
                    ) : (
                        <>
                            <div className="flex mt-6">
                                <Image endpoint={'/user/pfp/'.concat(post.user.username)} className="profile_picture small mr-2" />&nbsp;
                                <a href={'/user/'.concat(post.user.username)} className="text-2xl link">{post.user.username}</a>
                            </div>
                            <div className="mb-2 pb-2 description">
                                <p className="text-2xl">{post.name}</p>
                                <p className="text-zinc-400">{post.description}</p>
                            </div>
                            <div className="flex flex-col w-full">
                                <div className="hidden md:block">
                                    <span className="text-2xl">More by</span> &nbsp; <a href={"/user/".concat(post.user.username)} className="new-link text-2xl">{post.user.username}</a>
                                </div>
                                <div className="hidden md:block">
                                    <Posts from="user" username={post.user.username} number="9" currentPost={postId} />
                                </div>
                            </div>
                        </>
                    )
                }
            </div>
        </div>
    );
}

export default Post;