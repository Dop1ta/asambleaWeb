import { useState, } from 'react';
import axios from 'axios';
import { Input } from '@chakra-ui/react';

const file_upload = () => {

    let files = null;

    const botonm = "Subir Archivo"


    const upload = async (e) => {
        e.preventDefault()
        try {
            const formData = new FormData();
            formData.append("archivos", files)
            axios.post(`${process.env.API_URL}/file/:archivo`, formData).then(response => {
                console.log(response.data);
            });
            botonm = "Eliminar Archivo"
        } catch (error) {
        }
    }

    const eboton = async () => {
        if (botonm === "Subir Archivo"){
            return(
                <button className="btn btn-primary" type="submit" onClick={() => upload()}>{botonm}</button>
            )
        }else{
            //return(
                //<button className="btn btn-primary" type="submit" onClick={() => delete()}>{botonm}</button>
            //)
        }
    }

    const handleFileChange = (event) => {
        files = event.target.files[0];

    }

    const [result, setResult] = useState

    const filesup = async () =>{
        const res = await axios.get(`${process.env.API_URL}/files/get/${context.params}`)
        setResult(res.data)
    }


    const deletef = async () => {
        try {
            Swal.fire({
                title: 'Estas seguro?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, borrarlo!'
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire(
                        'Eliminado!',
                        'Reunion eliminada.',
                        'OK'
                    ).then((result) => {
                        if (result.isConfirmed) {
                            axios.delete(`${process.env.API_URL}/file/delete/${idacta}`)
                            router.reload()
                        }
                    })
                }
            })
        } catch (err) {

        }
    }

    return (
        <div className="container">
            <div className="row">
                <form onSubmit={upload}>
                    <div className="form-group">
                        <Input type="file" onChange={handleFileChange} name={'files'} />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary" type="submit" onClick={() => upload()}>{botonm}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default file_upload
