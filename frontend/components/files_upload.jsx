import { useState, } from 'react';
import axios from 'axios';
import { Input } from '@chakra-ui/react';

const file_upload = () => {

    let files = null;

    const upload = async (e) => {
        e.preventDefault()
        try {
            const formData = new FormData();
            formData.append("archivos", files)
            axios.post(`${process.env.API_URL}/file/:archivo`, formData).then(response => {
                console.log(response.data);
            });
        } catch (error) {
        }
    }

    const handleFileChange = (event) => {
        files = event.target.files[0];

    }

    return (
        <div className="container">
            <div className="row">
                <form onSubmit={upload}>
                    <div className="form-group">
                        <Input type="file" onChange={handleFileChange} name={'files'} />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary" type="submit">Subir Archivo</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default file_upload
