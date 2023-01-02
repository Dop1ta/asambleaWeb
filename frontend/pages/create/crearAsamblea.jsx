import { useState } from 'react'
import axios from 'axios'
import NavTabAdmin from '../../components/NavTabAdmin'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'
import { FormControl, FormLabel, Input, Container, Stack, Textarea, Button, ButtonGroup, Layaut } from '@chakra-ui/react'
import { Formik } from 'formik'
import FormInput from '../../components/FormInput'
import FormikError from '../../components/FormikError'
import asambleaValidations from '../../validations/asambleaValidations'
import Head from 'next/head'

export default function CrearA() {
  const router = useRouter()

  const backAsambleas = () => {
    router.push('/options/asambleasAdmin')
  }

  return (
    <Stack alignItems={'center'} textAlign={'center'} backgroundColor={"rgb(244,247,254)"} h="100hv" >
      <Head>
        <title>Creacion de asambleas</title>
        <link rel="icon" href="/icon.png" />
      </Head>
      <NavTabAdmin />
      <Formik
        initialValues={{
          name: '',
          time: '',
          hour: '',
          place: '',
          description: '',
        }}
        onSubmit={async (values) => {
          try {
            const [time, hour] = values.time.split('T')
            values.time = time
            values.hour = hour
            const response = await axios.post(`${process.env.API_URL}/createMeeting/639a48dffe299c865e0ea1f9`, values)
            if (response.status === 201) {
              Swal.fire({
                title: 'Producto creado',
                text: 'El producto se ha creado correctamente',
                icon: 'success',
                confirmButtonText: 'Ok'
              }).then((result) => {
                if (result.isConfirmed) {
                  router.push('/options/asambleasAdmin')
                }
              })
            } else {
              Swal.fire({
                title: 'Error',
                text: 'Ha ocurrido un error',
                icon: 'error',
                confirmButtonText: 'Ok'
              })
            }
          } catch (error) {
            Swal.fire({
              title: 'Error',
              text: 'Ha ocurrido un error',
              icon: 'error',
              confirmButtonText: 'Ok'
            })
          }
        }
        }
        validationSchema={asambleaValidations}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit
        }) => (
          <form>
            <Container backgroundColor={'white'} borderRadius={10} boxShadow={'xl'} width={'xl'}>
              <FormInput onChange={handleChange} placeholder="Ejemplo: Asamblea para perritos" label="Nombre de la asamblea" type={"text"} name={"name"} onBlur={handleBlur} value={values.name} />
              {touched.name && errors.name && <FormikError error={errors.name} />}
              <FormControl isRequired marginTop={4}>
                <FormLabel>Fecha y hora</FormLabel>
                <Input
                  placeholder="Select Date and Time"
                  size="md"
                  type="datetime-local"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name={"time"}
                  value={values.time}
                />
              </FormControl>
              {touched.time && errors.time && <FormikError error={errors.time} />}
              <FormInput onChange={handleChange} placeholder='Ejemplo: Lota' label="Lugar donde se realiza" type={"text"} name={"place"} onBlur={handleBlur} value={values.place} />
              {touched.place && errors.place && <FormikError error={errors.place} />}
              <FormControl isRequired marginTop={4}>
                <FormLabel>Descipcion</FormLabel>
                <Textarea placeholder='Ejemplo: La reunion sera de ayuda a los perritos' type={"text"} onChange={handleChange} onBlur={handleBlur} name={"description"} value={values.description} />
                {touched.description && errors.description && <FormikError error={errors.description} />}
              </FormControl>
              <ButtonGroup variant='outline' spacing='6' marginTop={4} marginBottom={4}>
                <Button colorScheme='blue' onClick={handleSubmit} type="submit">Guardar</Button>
                <Button colorScheme='red' onClick={backAsambleas} type="submit">Cancel</Button>
              </ButtonGroup>
            </Container>
          </form>
        )}
      </Formik>
    </Stack >
  )
}