import { useRef, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./User.css";
import { BACKEND_URL } from "../constants";
import Image from "./Image";
import Posts from "./Posts";

function User(props){

    const { name } = useParams();
    const [userChange, setUserChange] = useState({user: null});
    const background = useRef(null);

    useEffect(() => {
        axios
            .get(
                BACKEND_URL.concat("/user/background/").concat(name),
                { responseType: 'arraybuffer'},
            )
            .then(response => {
                const base64 = btoa(
                    new Uint8Array(response.data).reduce(
                        (data, byte) => data + String.fromCharCode(byte),
                        '',
                    ),
                );
                background.current.style.backgroundImage = 'linear-gradient(0deg, rgba(0,0,0,0.7931373232886905) 0%, rgba(42,43,46,0.13767513841474088) 50%, rgba(121,9,9,0) 70%), url(data:;base64,' + base64 + '), linear-gradient(0deg, rgba(0,0,0,0.7931373232886905) 0%, rgba(42,43,46,0.13767513841474088) 39%, rgba(121,9,9,0) 55%)';
            });
        axios 
            .get(BACKEND_URL.concat("/user/getInfo/").concat(name))
            .then(response => {
                console.log(userChange);
                setUserChange({
                    ...userChange,
                    user: response.data
                });
            })
            .catch(err => {
                console.log(err);
            })
    }, [name]);

    function onChange(e){
        e.preventDefault();
        const formData = new FormData();

        formData.append('username', props.currentUser.username);
        formData.append('image', e.target.files[0]);

        axios
            .post(BACKEND_URL.concat('/user/setBackground'), formData)
            .then(response => {
                window.location.reload();
            })
            .catch(err => {
                console.log(err);
            })
    }

    function onChangePfp(e){
        e.preventDefault();
        const formData = new FormData();

        formData.append('username', props.currentUser.username);
        formData.append('image', e.target.files[0]);

        axios
            .post(BACKEND_URL.concat('/user/setPfp'), formData)
            .then(response => {
                window.location.reload();
            })
            .catch(err => {
                console.log(err);
            })
    }

    return(
        <div>
            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.4.1/css/all.css" integrity="sha384-5sAR7xN1Nv6T6+dT2mhtzEpVJvfS3NScPQTrOxhwjIuvcA67KV2R5Jz6kr4abQsz" crossOrigin="anonymous"></link>
            <div ref={background} className="background">
                {
                    props.currentUser !== undefined && props.currentUser.username == name  ? (
                        <>
                            <form>
                                <input 
                                    type="file" 
                                    className="custom-file-input" 
                                    onChange={onChange} 
                                    name="fileToUpload" 
                                    id="fileToUpload" />
                                <label htmlFor="fileToUpload" className="background-change"><i className="fas fa-upload">
                                    </i>&nbsp;Change&nbsp;background&nbsp;(1920x640+)
                                </label>
                            </form>
                        </>
                    ) : (
                        <>  
                        
                        </>
                    )
                }
                <div className="md:container md:mx-auto justify-center profile_container">
                    {
                        props.currentUser !== undefined && props.currentUser.username == name ? (
                            <div className="flex justify-center">                        
                                <form>
                                    <input 
                                        type="file" 
                                        className="custom-file-input" 
                                        onChange={onChangePfp} 
                                        name="pfpUpload" 
                                        id="pfpUpload" 
                                    />
                                    <label htmlFor="pfpUpload" className="background-change"><i className="fas fa-upload">
                                        </i>&nbsp;Change&nbsp;profile picture&nbsp;
                                    </label>
                                </form>
                            </div>
                        ) : (
                            <></>
                        )   
                    }
                    <div className="flex justify-center mb-3">
                        <Image endpoint={"/user/pfp/".concat(name)} className="profile_picture"/>
                    </div>
                    <div className="flex justify-center">
                        <h2 className="username text-xl">{name}</h2>
                    </div>
                </div>
            </div>
            <div className="separator"></div>
            <Posts from="user" username={name} />
        </div>
    );
}

export default User;