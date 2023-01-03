import { useState, } from 'react';
import axios from 'axios';
import { Input, Stack, Button, Container, FormControl } from '@chakra-ui/react'
import NavTabAdmin from '../../components/NavTabAdmin'
import { useRouter } from 'next/router'


const file_upload = () => {

    const router = useRouter()
    let files = null;
    //let botonm = "Subir Archivo"


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

    // const eboton = async () => {
    //     if (botonm === "Subir Archivo") {
    //         return (
    //             <button className="btn btn-primary" type="submit" onClick={() => upload()}>{botonm}</button>
    //         )
    //     } else {
    //         //return(
    //         //<button className="btn btn-primary" type="submit" onClick={() => delete()}>{botonm}</button>
    //         //)
    //     }
    // }

    const handleFileChange = (event) => {
        files = event.target.files[0];
    }

    // const [result, setResult] = useState([])

    // const filesup = async () => {
    //     const res = await axios.get(`${process.env.API_URL}/files/get/${context.params}`)
    //     setResult(res.data)
    // }


    // const deletef = async () => {
    //     try {
    //         Swal.fire({
    //             title: 'Estas seguro?',
    //             icon: 'warning',
    //             showCancelButton: true,
    //             confirmButtonColor: '#3085d6',
    //             cancelButtonColor: '#d33',
    //             confirmButtonText: 'Si, borrarlo!'
    //         }).then((result) => {
    //             if (result.isConfirmed) {
    //                 Swal.fire(
    //                     'Eliminado!',
    //                     'Reunion eliminada.',
    //                     'OK'
    //                 ).then((result) => {
    //                     if (result.isConfirmed) {
    //                         axios.delete(`${process.env.API_URL}/file/delete/${idacta}`)
    //                         router.reload()
    //                     }
    //                 })
    //             }
    //         })
    //     } catch (err) {

    //     }
    // }

    return (
        // <Stack alignItems={'center'}>
        //     <NavTabAdmin />
        //     <Container>
        //         <FormControl>
        //             <Input type="file" onChange={handleFileChange} name={'files'} />
        //         </FormControl>
        //         <Button type="submit" onSubmit={() => upload()}>Subir Archivo</Button>
        //     </Container>
        // </Stack>
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
