import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../constants";

function Image(props) {

    const [source, setSource] = useState(null);

    useEffect(() => {
        axios
            .get(
                BACKEND_URL.concat(props.endpoint).concat(props.username),
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
    }, []);

    return(
        <img src={source} />
    );

}

export default Image;