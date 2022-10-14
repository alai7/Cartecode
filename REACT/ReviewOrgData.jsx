import React from 'react';
import { withFormik, Field } from 'formik';
import { Card, Button, Form } from 'react-bootstrap';
import MaskedInput from 'react-text-mask';
import debug from 'sabio-debug';
import PropTypes from 'prop-types';
import orgSchemas from '../../schemas/organizationSchema.js';
import orgServices from '../../services/organizationService.js';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import '../wizard/wizardstyles.css';

const _logger = debug.extend('orgReview');
function ReviewOrgData(props) {
    const { values, handleSubmit, isSubmitting, onBack, backLabel } = props;
    const navigate = useNavigate();
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
        },
    });

    const onClickSubmit = (e) => {
        e.preventDefault();
        _logger('props --->', props);
        _logger('values --->', values);
        orgServices.addOrg(values).then(onAddSuccess).catch(onAddError);
    };

    const onAddSuccess = (response) => {
        _logger(response.item);
        Toast.fire({
            icon: 'success',
            title: 'Added! You are now an Admin for this restaurant!',
        });
        setTimeout(
            () =>
                Swal.fire({
                    title: 'Do you want to invite an Employee?',
                    showDenyButton: true,
                    confirmButtonText: 'Yes',
                    denyButtonText: 'No',
                    customClass: {
                        actions: 'my-actions',
                        confirmButton: 'order-2',
                        denyButton: 'order-3',
                    },
                }).then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire('Redirecting!', 'Hang on one moment...', 'success').then(() =>
                            navigate('/organizations/invite')
                        );
                    } else if (result.isDenied) {
                        Swal.fire('Going back to the dashboard', '', 'info').then(() =>
                            navigate('/dashboard/organization')
                        );
                    }
                }),
            2000
        );
    };

    const onAddError = (error) => {
        _logger(error);
        Toast.fire({
            icon: 'error',
            title: 'There was a problem adding your organization.',
        });
    };

    _logger(props);
    return (
        <Card>
            <Card.Body>
                <h1 className="header-title mb-3">Review Your Information</h1>
                <Form noValidate onSubmit={handleSubmit}>
                    <p className="position-relative mb-3" id="cuisineId">
                        <label>Cuisine Type</label>
                        <Field
                            required
                            type="text"
                            name="cuisineId"
                            defaultValue={values.cuisineId}
                            className="form-control Loki-form-orgs"
                        />
                    </p>
                    <p className="position-relative mb-3" id="organizationTypeId">
                        <label>Organization Type</label>
                        <Field
                            required
                            type="text"
                            name="organizationTypeId"
                            defaultValue={values.organizationTypeId}
                            className="form-control Loki-form-orgs"
                        />
                    </p>
                    <p className="position-relative mb-3" id="name">
                        <label>Organization Name</label>
                        <Field
                            required
                            type="text"
                            className="form-control Loki-form-orgs"
                            placeholder="name"
                            name="name"
                            defaultValue={values.name}
                        />
                    </p>
                    <p className="position-relative mb-3" id="description">
                        <label>Description</label>
                        <Field
                            className="form-control Loki-form-orgs"
                            required
                            type="text"
                            placeholder="description"
                            name="description"
                            defaultValue={values.description}
                        />
                    </p>
                    <p className="position-relative mb-3" id="logo">
                        <label>Logo</label>
                    </p>
                    <div className="position-relative mb-3 ">
                        <img className="img-logo-orgs" src={values.logo} alt="Logo" />
                    </div>
                    <p className="position-relative mb-3" id="businessPhone">
                        <label>Business Phone</label> <br />
                        <MaskedInput
                            mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                            placeholder="(___) ___-____"
                            className="form-control Loki-form-orgs"
                            name="businessPhone"
                            defaultValue={values.businessPhone}
                        />
                    </p>

                    <p className="position-relative mb-3" id="siteUrl">
                        <label>Website</label>
                        <Field
                            required
                            type="text"
                            placeholder="siteUrl"
                            name="siteUrl"
                            defaultValue={values.siteUrl}
                            className="form-control Loki-form-orgs"
                        />
                    </p>
                    <div className="button-group">
                        <Button type="button" className="btn btn-secondary" onClick={onBack} disabled={isSubmitting}>
                            {backLabel}
                        </Button>
                        <Button type="submit" onClick={onClickSubmit}>
                            Submit
                        </Button>
                    </div>
                </Form>
            </Card.Body>
        </Card>
    );
}

ReviewOrgData.propTypes = {
    props: PropTypes.shape({
        organization: PropTypes.shape({
            name: PropTypes.string.isRequired,
            businessPhone: PropTypes.string.isRequired,
            siteUrl: PropTypes.string.isRequired,
            cuisineId: PropTypes.string.isRequired,
            organizationTypeId: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            logo: PropTypes.string.isRequired,
        }),
    }),
    touched: PropTypes.shape({
        isActive: PropTypes.bool,
    }),
    errors: PropTypes.shape({
        isActive: PropTypes.string,
    }),
    values: PropTypes.shape({
        name: PropTypes.string.isRequired,
        businessPhone: PropTypes.string.isRequired,
        siteUrl: PropTypes.string.isRequired,
        cuisineId: PropTypes.string.isRequired,
        organizationTypeId: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        logo: PropTypes.string.isRequired,
    }),
    isSubmitting: PropTypes.bool.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    backLabel: PropTypes.string.isRequired,
    nextLabel: PropTypes.string.isRequired,
    onBack: PropTypes.func.isRequired,
    onNext: PropTypes.func.isRequired,
};

export default withFormik({
    mapPropsToValues: (props) => ({
        name: props.organization.name,
        businessPhone: props.organization.businessPhone,
        siteUrl: props.organization.siteUrl,
        cuisineId: props.organization.cuisineId,
        organizationTypeId: props.organization.organizationTypeId,
        description: props.organization.description,
        logo: props.organization.logo,
    }),

    validationSchema: orgSchemas,

    handleSubmit: (values, { props }) => {
        props.onNext(values);
    },
})(ReviewOrgData);
