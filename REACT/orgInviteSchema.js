import * as Yup from 'yup';

const orgInviteSchema = Yup.object().shape({
    firstname: Yup.string()
        .required('First Name is required')
        .min(2, 'Must be minimum 2 characters')
        .max(50, 'Must be maximum 50 characters'),
    middleInitial: Yup.string().max(1, 'Cannot exceed 1 character'),
    lastname: Yup.string()
        .required('Last Name is required')
        .min(2, 'Must be minimum 2 characters')
        .max(50, 'Must be maximum 50 characters'),
    email: Yup.string().email('Invalid email').required('Need an email to send an invite'),
    expirationSeconds: Yup.string().required(),
    inviteTypeId: Yup.string().required(),
    orgId: Yup.number().required(),
});

export default orgInviteSchema;
