import { useState, } from 'react';
import axios from 'axios';
import { Input, Stack, Button, Container, FormControl } from '@chakra-ui/react'
import NavTabAdmin from '../../components/NavTabAdmin'
import { useRouter } from 'next/router'


const file_upload = () => {

    const router = useRouter()
    let files = null;


    const upload = async (e) => {
        e.preventDefault()
        const { files_upload } = router.query
        console.log(files_upload)
        try {
            const formData = new FormData();
            formData.append("archivos", files)
            console.log(formData)
            const response = await axios.post(`${process.env.API_URL}/file/:archivo/${files_upload}`, formData)
            if (response.status === 201) {
                console.log("Archivo subido")
            }
        } catch (error) {
        }
    }


    const handleFileChange = (event) => {
        files = event.target.files[0];
    }


    return (
        <div className="container">
            <NavTabAdmin />
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
