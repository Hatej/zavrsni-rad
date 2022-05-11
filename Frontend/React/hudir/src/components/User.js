import { useParams } from "react-router-dom";
import Image from "./Image";

function User(props){

    const { name } = useParams();

    return(
        <div>
            User
            <Image endpoint="/user/pfp/" username={name} />
            <Image endpoint="/user/background/" username={name} />
        </div>
    );
}

export default User;