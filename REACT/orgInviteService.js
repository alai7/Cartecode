import axios from 'axios';
import { API_HOST_PREFIX, onGlobalError, onGlobalSuccess } from './serviceHelpers';

const endpoint = `${API_HOST_PREFIX}/api/organizations/invite`;

const orgInvite = (payload) => {
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

const searchInvites = (token) => {
    const config = {
        method: 'GET',
        url: `${endpoint}/search?token=${token}`,
        withCredentials: true,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };

    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const orgInviteServices = { orgInvite, searchInvites };

export default orgInviteServices;
