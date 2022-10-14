import { withFormik, Field, ErrorMessage } from 'formik';
import React from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import orgSchemas from '../../schemas/organizationSchema.js';
import debug from 'sabio-debug';
import PropTypes from 'prop-types';
import '../wizard/wizardstyles.css';
import FileUploaderContainer from '../../components/FileUploaderContainer.jsx';

const _logger = debug.extend('orgDetails');

function OrgDetails(props) {
    const { values, handleChange, isSubmitting, handleSubmit, backLabel, nextLabel, onBack, setFieldValue } = props;

    _logger(props);

    const selectFileValue = (file, setFieldValue) => {
        _logger(file);
        setFieldValue('logo', file[0].url);
    };

    return (
        <>
            <Card>
                <Card.Body>
                    <h1 className="header-title mb-3">Organization Details</h1>
                    <Form noValidate onSubmit={handleSubmit}>
                        <p className="mb-1 mt-3 fw-bold text-muted">Cuisine Type</p>
                        <Field component="select" name="cuisineId" className="form-control Loki-form-orgs">
                            <option value={0}>Please select a Cuisine</option>
                            {props.lookups.cuisinesMapped}
                        </Field>
                        <ErrorMessage name="cuisineId" component="div" className="has-error" />
                        <p className="mb-1 mt-3 fw-bold text-muted">Organization Type</p>
                        <Field component="select" name="organizationTypeId" className="form-control Loki-form-orgs">
                            <option value={0}>Please select A Type</option>
                            {props.lookups.orgTypesMapped}
                        </Field>
                        <ErrorMessage name="organizationTypeId" component="div" className="has-error" />

                        <div className="position-relative mb-3" id="description">
                            <label>Description</label>
                            <Field
                                className="form-control Loki-form-orgs"
                                required
                                type="text"
                                placeholder="description"
                                name="description"
                                onChange={handleChange}
                                value={values.description}
                            />
                            <ErrorMessage name="description" component="div" className="has-error" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label" htmlFor="menuImage">
                                Logo Image
                            </label>
                            <FileUploaderContainer
                                onHandleUploadSuccess={(file) => {
                                    selectFileValue(file, setFieldValue);
                                }}
                            />
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
        </>
    );
}

OrgDetails.propTypes = {
    lookups: PropTypes.shape({
        cuisinesMapped: PropTypes.arrayOf(
            PropTypes.shape({
                $$typeof: PropTypes.symbol,
                type: PropTypes.string,
                key: PropTypes.string,
                props: PropTypes.shape({
                    value: PropTypes.number,
                    children: PropTypes.string,
                }),
            })
        ).isRequired,
        orgTypesMapped: PropTypes.arrayOf(
            PropTypes.shape({
                $$typeof: PropTypes.symbol,
                type: PropTypes.string,
                key: PropTypes.string,
                props: PropTypes.shape({
                    value: PropTypes.number,
                    children: PropTypes.string,
                }),
            })
        ).isRequired,
    }).isRequired,

    touched: PropTypes.shape({
        isActive: PropTypes.bool,
    }).isRequired,
    errors: PropTypes.shape({
        isActive: PropTypes.string,
    }).isRequired,
    values: PropTypes.shape({
        cuisineId: PropTypes.string,
        organizationTypeId: PropTypes.string,
        description: PropTypes.string,
        logo: PropTypes.string,
    }).isRequired,
    isSubmitting: PropTypes.bool.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    backLabel: PropTypes.string.isRequired,
    nextLabel: PropTypes.string.isRequired,
    onBack: PropTypes.func.isRequired,
    onNext: PropTypes.func.isRequired,
    setFieldValue: PropTypes.func.isRequired,
};

export default withFormik({
    mapPropsToValues: (props) => ({
        cuisineId: props.organization.cuisineId,
        organizationTypeId: props.organization.organizationTypeId,
        description: props.organization.description,
        logo: props.organization.logo,
    }),

    validationSchema: orgSchemas.orgDetailsSchema,

    handleSubmit: (values, { props }) => {
        props.onNext(values);
    },
})(OrgDetails);
