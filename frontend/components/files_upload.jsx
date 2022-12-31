import { useState,  } from 'react';
import axios from 'axios';

const file_upload = () => {

    let [up, setUpload] = useState({
        url: '',
        name: '',
        mimeType: ''
    })

    const upload = async () => {
        try{
            const response = await axios.post(`${process.env.API_URL}/uploadfile`)
            setUpload(response.data)
        }catch (error){
        }
    }

    const onChange = async () => {
        setUpload({
            ...up,
            [e.target.url]: e.target.value
        })
    }

        return (
            <div className="container">
                <div className="row">
                    <form onSubmit={upload}>
                        <div className="form-group">
                            <input type="file" onChange={onChange} />
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
