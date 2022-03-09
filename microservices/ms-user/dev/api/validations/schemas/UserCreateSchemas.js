import * as Yup from 'yup';

module.exports = Yup.object().shape({
    name: Yup.string().trim().required('Campo Obrigatório'),
    email: Yup.string().email('E-mail inválido').required('Campo Obrigatório'),
    birthDate: Yup.date().required('Campo Obrigatório'),
    password: Yup.string().trim().required('Campo Obrigatório'),
    address: Yup.object()
        .shape({
            zipCode: Yup.string().trim().required('Campo Obrigatório'),
            street: Yup.string().trim().required('Campo Obrigatório'),
            neighborhood: Yup.string().trim().required('Campo Obrigatório'),
            numberHouse: Yup.string().trim().required('Campo Obrigatório'),
            complement: Yup.string().trim().required('Campo Obrigatório'),
            referencePoint: Yup.string().trim().required('Campo Obrigatório'),
            cityId: Yup.number().required('Campo Obrigatório'),
        })
        .required('Campo Obrigatório'),
});