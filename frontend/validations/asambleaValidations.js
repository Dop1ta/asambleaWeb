import * as yup from 'yup';

const asambleaValidations = yup.object({
  name: yup.string()
    .required('El nombre es requerido')
    .matches(/^[aA-zZ\s]+$/, 'El nombre solo puede contener letras, números y espacios'),
  place: yup.string()
    .required('El lugar es requerido')
    .matches(/^[aA-zZ\s]+$/, 'El lugar solo puede contener letras, números y espacios'),
  description: yup.string()
    .required('La descripción es requerida')
    .matches(/^[aA-zZ\s]+$/, 'La descripción solo puede contener letras, números y espacios'),
});


export default asambleaValidations;
