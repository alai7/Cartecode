import { withFormik, ErrorMessage, Field } from 'formik';
import React from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import MaskedInput from 'react-text-mask';
import orgSchemas from '../../schemas/organizationSchema.js';
import debug from 'sabio-debug';
import PropTypes from 'prop-types';
import '../wizard/wizardstyles.css';

const _logger = debug.extend('orgContactInfo');

function OrganizationContactInfo(props) {
    const { values, isSubmitting, handleChange, handleSubmit, backLabel, nextLabel, onBack } = props;

    _logger(props);

    return (
        <div className="container">
            <div className="row">
                <Card>
                    <Card.Body>
                        <h1 className="mb-3">Contact Information</h1>

                        <Form noValidate onSubmit={handleSubmit}>
                            <div className="position-relative mb-3" id="name">
                                <label>Organization Name</label>
                                <Field
                                    className="form-control Loki-form-orgs"
                                    required
                                    type="text"
                                    placeholder="Name"
                                    name="name"
                                    onChange={handleChange}
                                    value={values.name}
                                />
                                <ErrorMessage name="name" component="div" className="has-error" />
                            </div>
                            <div className="position-relative mb-3" id="businessPhone">
                                <label>Business Phone</label> <br />
                                <MaskedInput
                                    mask={[
                                        '(',
                                        /[1-9]/,
                                        /\d/,
                                        /\d/,
                                        ')',
                                        ' ',
                                        /\d/,
                                        /\d/,
                                        /\d/,
                                        '-',
                                        /\d/,
                                        /\d/,
                                        /\d/,
                                        /\d/,
                                    ]}
                                    placeholder="(___) ___-____"
                                    className="form-control Loki-form-orgs"
                                    name="businessPhone"
                                    onChange={handleChange}
                                    value={values.businessPhone}
                                />
                                <ErrorMessage name="businessPhone" component="div" className="has-error" />
                            </div>

                            <div className="position-relative mb-3" id="siteUrl">
                                <label>Website</label>
                                <Field
                                    className="form-control Loki-form-orgs"
                                    type="text"
                                    placeholder="www.thenamehere.com"
                                    name="siteUrl"
                                    onChange={handleChange}
                                    required
                                    value={values.siteUrl}
                                />
                                <ErrorMessage name="siteUrl" component="div" className="has-error" />
                            </div>

                            <div className="button-group">
                                <Button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={onBack}
                                    disabled={isSubmitting}>
                                    {backLabel}
                                </Button>
                                <Button type="submit" className="btn btn-primary ml-1" disabled={isSubmitting}>
                                    {nextLabel}
                                </Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
}

OrganizationContactInfo.propTypes = {
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
    }),

    validationSchema: orgSchemas.orgContactInfoSchema,

    handleSubmit: (values, { props }) => {
        props.onNext(values);
    },
})(OrganizationContactInfo);
