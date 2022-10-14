import React, { useState, useEffect } from 'react';
import Loki from 'react-loki';
import OrgDetails from './OrgDetails';
import OrganizationContactInfo from './OrganizationContactInfo';
import ReviewOrgData from './ReviewOrgData';
import { FaPenSquare, FaSearchLocation, FaEnvelope } from 'react-icons/fa';
import './wizardstyles.css';
import { getTypes } from '../../services/lookUpService';
import debug from 'sabio-debug';
import Swal from 'sweetalert2';

const _logger = debug.extend('orgWizard');

function OrgWizard() {
    const [lookUps, setCurrentlookUps] = useState({
        cuisinesData: [],
        cuisinesMapped: [],
        orgTypeData: [],
        orgTypesMapped: [],
    });
    const [organization, setCurrentOrganization] = useState({
        cuisineId: '',
        organizationTypeId: '',
        name: '',
        description: '',
        logo: '',
        businessPhone: '',
        siteUrl: '',
    });
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

    const mergeValues = (values) => {
        setCurrentOrganization((prevState) => {
            const newOrg = { ...prevState, ...values };
            return newOrg;
        });
    };

    const complexSteps = [
        {
            label: 'Step 1',
            icon: <FaPenSquare className="mt-3" />,
            component: <OrganizationContactInfo organization={organization} />,
        },
        {
            label: 'Step 2',
            icon: <FaSearchLocation className="mt-3" />,
            component: <OrgDetails organization={organization} lookups={lookUps} />,
        },
        {
            label: 'Step 3',
            icon: <FaEnvelope className="mt-3" />,
            component: <ReviewOrgData organization={organization} />,
        },
    ];

    useEffect(() => {
        getTypes(['Cuisines', 'OrganizationTypes']).then(onGetTypesSuccess).catch(onGetTypesError);
    }, []);

    const onGetTypesSuccess = (data) => {
        Toast.fire({
            icon: 'success',
            title: 'Information Loaded.',
        });
        var cuisineInfo = data.item.cuisines;
        var orgTypesInfo = data.item.organizationTypes;
        setCurrentlookUps((prevState) => {
            const getLookUps = { ...prevState };
            getLookUps.cuisinesData = cuisineInfo;
            getLookUps.orgTypeData = orgTypesInfo;
            getLookUps.cuisinesMapped = cuisineInfo.map(mapLookUpType);
            getLookUps.orgTypesMapped = orgTypesInfo.map(mapLookUpType);
            return getLookUps;
        });
    };
    const onGetTypesError = (err) => {
        _logger(err);
        Toast.fire({
            icon: 'error',
            title: 'Error!',
        });
    };

    const mapLookUpType = (lookUpType) => (
        <option value={lookUpType.id} key={`${lookUpType.id}_${lookUpType.name}`}>
            {lookUpType.name}
        </option>
    );

    return (
        <React.Fragment>
            <div className="LokiSteps-orgs container">
                <div className="row">
                    <div className="col-md-9">
                        <Loki
                            steps={complexSteps}
                            onNext={mergeValues}
                            onBack={mergeValues}
                            onFinish={mergeValues}
                            noActions
                        />
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}
export default OrgWizard;
