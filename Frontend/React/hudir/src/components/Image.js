import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../constants";

function Image(props) {

    const [source, setSource] = useState(null);

    useEffect(() => {
        if(props.endpoint !== undefined){
            axios
            .get(
                BACKEND_URL.concat(props.endpoint),
                { responseType: 'arraybuffer'},
            )
            .then(response => {
                const base64 = btoa(
                    new Uint8Array(response.data).reduce(
                        (data, byte) => data + String.fromCharCode(byte),
                        '',
                    ),
                );
                setSource("data:;base64," + base64);
            });
        }
        if(props.image !== undefined){
            const base64 = btoa(
                new Uint8Array(props.image).reduce(
                    (data, byte) => data + String.fromCharCode(byte),
                    '',
                ),
            );
            setSource("data:;base64," + base64);
        }
    }, []);

    return(
        <img src={source} className={props.className} />
    );

}

export default Image;