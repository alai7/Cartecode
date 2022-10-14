import axios from 'axios';
import { API_HOST_PREFIX, onGlobalError, onGlobalSuccess } from './serviceHelpers';

const endpoint = `${API_HOST_PREFIX}/api/organizations`;

const orgPaginateAll = (currentPage, pageSize) => {
    const config = {
        method: 'GET',
        url: `${endpoint}/paginate/?pageIndex=${currentPage}&pageSize=${pageSize}`,
        withCredentials: true,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };

    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const addOrg = (payload) => {
    const config = {
        method: 'POST',
        url: endpoint,
        withCredentials: true,
        data: payload,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };

    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const deleteOrgById = (id) => {
    const config = {
        method: 'DELETE',
        url: `${endpoint}/${id}`,
        withCredentials: true,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const updateOrgById = (id, payload) => {
    const config = {
        method: 'PUT',
        data: payload,
        url: `${endpoint}/${id}`,
        withCredentials: true,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };

    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const getOrgById = (id) => {
    const config = {
        method: 'GET',
        url: `${endpoint}/${id}`,
        withCredentials: true,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };

    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const orgPaginateByQuery = (pageIndex, pageSize, query) => {
    const config = {
        method: 'GET',
        url: `${endpoint}/paginate/?pageIndex=${pageIndex}&pageSize=${pageSize}&Query=${query}`,
        withCredentials: true,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };

    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const getOrgByUserId = (id) => {
    const config = {
        method: 'GET',
        url: `${endpoint}/user/${id}`,
        withCredentials: true,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };

    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const orgServices = {
    deleteOrgById,
    orgPaginateByQuery,
    getOrgById,
    orgPaginateAll,
    addOrg,
    updateOrgById,
    getOrgByUserId,
};

export default orgServices;
