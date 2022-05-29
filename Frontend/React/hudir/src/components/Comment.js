import Image from "./Image";
import "./Comment.css";

function Comment(props){

    return(
        <div className="flex comment">
            <Image endpoint={"/user/pfp/".concat(props.username)} className="profile_picture comment-picture" />&nbsp;
            <div>
                <a href={"/user/".concat(props.username)}>{props.username}</a>
                <p className="comment-content" >{props.content}</p>
            </div>
        </div>
    );

}

export default Comment;