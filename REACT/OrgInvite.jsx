import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Card } from 'react-bootstrap';
import orgInviteServices from '../../services/orgInviteService.js';
import orgInviteSchema from '../../schemas/orgInviteSchema.js';
import orgServices from '../../services/organizationService.js';
import userService from '../../services/userService.js';
import { getLookUp } from '../../services/lookUpService.js';
import Swal from 'sweetalert2';
import debug from 'sabio-debug';
import '../wizard/wizardstyles.css';

const _logger = debug.extend('orgInvite');

function OrgInvite() {
    const [orgInvite] = useState({
        firstname: '',
        middleInitial: '',
        lastname: '',
        email: '',
        expirationSeconds: '',
        inviteTypeId: '',
        orgId: '',
    });

    const [currentUserOrg, setCurrentUserOrg] = useState({
        name: '',
    });
    const [lookUps, setCurrentLookUps] = useState({
        employeeRolesData: [],
        employeeRolesMapped: [],
    });

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
        },
    });
    const onClickSubmit = (values) => {
        orgInviteServices.orgInvite(values).then(onAddSuccess).catch(onAddError);
    };

    const onAddSuccess = (response) => {
        _logger(response);
        Swal.fire({
            icon: 'success',
            title: 'Invite sent',
            text: 'Check your email to continue signing up!',
            button: 'Close',
        });
    };

    const onAddError = (error) => {
        _logger(error);
        Swal.fire({
            icon: 'error',
            title: 'There was a problem with your invite.',
            text: 'Re-check your fields before submission',
        });
    };

    useEffect(() => {
        getLookUp(['EmployeeRoles']).then(onGetTypesSuccess).catch(onGetTypesError);
        userService.currentUser().then(onGetCurrentSuccess).catch(onGetCurrentError);
    }, []);
    const onGetCurrentSuccess = (data) => {
        _logger(data.item.id);
        Toast.fire({
            icon: 'success',
            title: 'User loaded.',
        });
        var userId = data.item.id;
        orgServices.getOrgByUserId(userId).then(onGetOrgByUserSuccess).catch(onGetOrgByUserError);
    };
    const onGetCurrentError = (err) => {
        Toast.fire({
            icon: 'error',
            title: 'There was a problem getting your userid.',
        });
        _logger(err);
    };

    const onGetTypesSuccess = (data) => {
        _logger(data);
        Toast.fire({
            icon: 'success',
            title: 'Information loaded.',
        });
        var rolesInfo = data.items;
        setCurrentLookUps((prevState) => {
            const getLookUp = { ...prevState };
            getLookUp.employeeRolesData = rolesInfo;
            getLookUp.employeeRolesMapped = rolesInfo.map(mapLookUpType);
            return getLookUp;
        });
    };
    const onGetTypesError = (err) => {
        Toast.fire({
            icon: 'error',
            title: 'There was a problem getting some information for you.',
        });
        _logger(err);
    };
    const onGetOrgByUserSuccess = (response) => {
        Toast.fire({
            icon: 'success',
            title: 'Information received.',
        });
        orgInvite.orgId = response.item.id;
        var currentOrgName = response.item.name;
        setCurrentUserOrg((prevState) => {
            const userOrg = { ...prevState };
            userOrg.name = currentOrgName;
            return userOrg;
        });
    };
    const onGetOrgByUserError = (err) => {
        Toast.fire({
            icon: 'error',
            title: 'There was a problem getting some information.',
        });
        _logger(err);
    };
    const mapLookUpType = (lookUpType) => (
        <option value={lookUpType.id} key={`${lookUpType.id}_${lookUpType.name}`}>
            {lookUpType.name}
        </option>
    );

    return (
        <React.Fragment>
            <div className="container mt-4">
                <div className="row">
                    <div className="col-8">
                        <Card>
                            <Card.Body>
                                <h1 className="mb-3 position-relative">{currentUserOrg.name}</h1>

                                <h3>
                                    <ul>
                                        <li>Fill out the form below to invite an Employee</li>
                                    </ul>
                                </h3>
                                <Formik
                                    enableReinitialize={true}
                                    initialValues={orgInvite}
                                    validationSchema={orgInviteSchema}
                                    onSubmit={onClickSubmit}>
                                    <Form>
                                        <div className="position-relative mb-3" id="firstname">
                                            <label className="form-label">First name</label>
                                            <Field
                                                className="form-control Loki-form-orgs"
                                                required
                                                type="text"
                                                placeholder="First name"
                                                name="firstname"
                                            />
                                            <ErrorMessage name="firstname" component="div" className="has-error" />
                                        </div>
                                        <div className="position-relative mb-3" id="middleInitial">
                                            <label className="form-label">Middle Initial</label>
                                            <Field
                                                className="form-control Loki-form-orgs"
                                                required
                                                type="text"
                                                placeholder="Middle Initial"
                                                name="middleInitial"
                                            />
                                            <ErrorMessage name="middleInitial" component="div" className="has-error" />
                                        </div>
                                        <div className="position-relative mb-3" id="lastname">
                                            <label className="form-label">Last name</label>
                                            <Field
                                                className="form-control Loki-form-orgs"
                                                required
                                                type="text"
                                                placeholder="Last name"
                                                name="lastname"
                                            />
                                            <ErrorMessage name="lastname" component="div" className="has-error" />
                                        </div>
                                        <div className="position-relative mb-3" id="email">
                                            <label className="form-label">Email</label>
                                            <Field
                                                className="form-control Loki-form-orgs"
                                                type="email"
                                                placeholder="Email"
                                                required
                                                name="email"
                                            />
                                            <ErrorMessage name="email" component="div" className="has-error" />
                                        </div>
                                        <div className="position-relative mb-3" id="expirationSeconds">
                                            <label className="form-label">Expiration time</label>
                                            <Field
                                                className="form-control Loki-form-orgs"
                                                type="text"
                                                placeholder="Expiration time"
                                                required
                                                name="expirationSeconds"
                                            />
                                            <ErrorMessage
                                                name="expirationSeconds"
                                                component="div"
                                                className="has-error"
                                            />
                                        </div>
                                        <p className="form-label">Employee Role</p>
                                        <Field
                                            component="select"
                                            name="inviteTypeId"
                                            className="Loki-form-orgs form-control mb-3">
                                            <option value={0}>Please select a Role</option>
                                            {lookUps.employeeRolesMapped}
                                        </Field>

                                        <button type="text" className="btn btn-primary">
                                            Send Invite
                                        </button>
                                    </Form>
                                </Formik>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default OrgInvite;
