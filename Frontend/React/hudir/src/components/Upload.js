import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { BACKEND_URL } from "../constants";

function Upload(props) {

    const [postForm, setPostForm] = useState({name: '', description: '', userId: props.currentUser.id, likes: 0});
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState();
    const [message, setMessage] = useState('');
    let navigate = useNavigate();

    useEffect(() => {
        if(!image){
            setPreview(undefined);
            return;
        }

        const objectUrl = URL.createObjectURL(image);
        setPreview(objectUrl);

        return () => URL.revokeObjectURL(objectUrl);
    }, [image]);

    function onChange(event) {
        const {name, value} = event.target;
        let newForm = {name: postForm.name, description: postForm.description, userId: postForm.userId, file: postForm.file};
        newForm[name] = value;
        setPostForm(newForm);
    }

    function onChangeImage(event) {
        setImage(event.target.files[0]);
    }

    function onSubmit(e) {
        e.preventDefault();
        setMessage('');
        const formData = new FormData();

        formData.append('name', postForm.name);
        formData.append('description', postForm.description);
        formData.append('userId', postForm.userId);
        formData.append('image', image);

        axios
            .post(BACKEND_URL.concat('/post/upload'), formData)
            .then(response => {
                console.log(response);
                navigate('/post/'.concat(response.data.id));
            })
            .catch(err => {
                console.log(err);
            })
    }

    return(
        <div className='flex justify-center mt-32'>
            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.4.1/css/all.css" integrity="sha384-5sAR7xN1Nv6T6+dT2mhtzEpVJvfS3NScPQTrOxhwjIuvcA67KV2R5Jz6kr4abQsz" crossOrigin="anonymous"></link>
            <form className='bg-gray-500 shadow-md rounded px-8 pt-6 pb-8 mb-4 basis-96' onSubmit={onSubmit}>
                <div className="flex flex-col">
                    <label htmlFor="fileToUpload" className="hover:cursor-pointer link"><i className="fas fa-upload">
                        </i>&nbsp;Add&nbsp;image&nbsp;
                    </label>
                    <input 
                        required
                        type="file"
                        name="fileToUpload"
                        accept="image/*"
                        onChange={onChangeImage}
                        className='custom-file-input'
                        id='fileToUpload'
                    />

                    {image &&  <img className="object-contain" src={preview} /> }
                </div>
                <div>
                    <label htmlFor="name">Name</label>
                    <input 
                        required
                        type="text"
                        name="name"
                        value={postForm.name}
                        onChange={onChange}
                        placeholder="Name"
                        className='rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline'
                    />
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <textarea 
                        required
                        name="description"
                        value={postForm.description}
                        onChange={onChange}
                        placeholder="Description"
                        className='class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"'
                    />
                </div>
                <button className="bg-[#2a9fd6] hover:bg-[#0b73a0] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                Post
                </button>
                {message}
            </form>
        </div>
    );

}

export default Upload;