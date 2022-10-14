import { lazy } from 'react';

const OrgWizard = lazy(() => import('../pages/wizard/OrgWizard'));
const OrgInvite = lazy(() => import('../pages/wizard/OrgInvite'));

const orgRoutes = [
    {
        path: '/organizations',
        name: 'OrgWizard',
        element: OrgWizard,
        roles: ['OrgAdmin', 'SysAdmin'],
        exact: true,
        isAnonymous: false,
    },
    {
        path: '/organizations/invite',
        name: 'OrgInvite',
        element: OrgInvite,
        roles: ['OrgAdmin', 'SysAdmin'],
        exact: true,
        isAnonymous: false,
    },
];

const allRoutes = [
    ...orgRoutes
];

export default allRoutes;
