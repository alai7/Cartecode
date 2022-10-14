import * as Yup from 'yup';

const orgContactInfoSchema = Yup.object().shape({
    name: Yup.string()
        .required('Name is required')
        .min(2, 'Must be minimum 2 characters')
        .max(200, 'Must be maximum 200 characters'),
    businessPhone: Yup.string()
        .required('Business Phone is required')
        .min(2, 'Must be minimum 2 characters')
        .max(20, 'Must be maximum 20 characters'),
    siteUrl: Yup.string()
        .required('Site Url is required')
        .min(2, 'Must be minimum 2 characters')
        .max(255, 'Must be maximum 255 characters'),
});
const orgDetailsSchema = Yup.object().shape({
    cuisineId: Yup.string().required('CuisineType is required'),
    organizationTypeId: Yup.string().required('OrganizationType is required'),
    description: Yup.string()
        .required('Description is required')
        .min(2, 'Must be minimum 2 characters')
        .max(200, 'Must be maximum 200 characters'),
    logo: Yup.string()
        .required('Logo is required')
        .min(2, 'Must be minimum 2 characters')
        .max(255, 'Must be maximum 255 characters'),
});

const orgSchemas = { orgContactInfoSchema, orgDetailsSchema };
export default orgSchemas;
