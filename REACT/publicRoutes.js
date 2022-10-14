import { lazy } from 'react';
const ConfirmInvite = lazy(() => import('../components/user/ConfirmInvite'));

const users = [
   {
        path: '/users/invite',
        name: 'Confirm Invite by Token',
        exact: true,
        element: ConfirmInvite,
        roles: [],
        isAnonymous: true,
        isSimple: true,
    },
];


];
const allRoutes = [
    ...users,
];

export default allRoutes;
