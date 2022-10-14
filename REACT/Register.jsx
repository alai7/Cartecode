const _logger = debug.extend('Register');

const Register = () => {
    const [inviteInfo, setCurrentInvite] = useState({
        firstname: '',
        middleInitial: '',
        mastname: '',
        email: '',
        inviteTypeId: '',
        orgId: '',
    });

    const nav = useNavigate();
    const invite = useLocation();
    _logger('inviteInfo state ----> ', inviteInfo);

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

    useEffect(() => {
        if (invite.state === null) {
            _logger('No information');
        } else if (invite?.state.type === 'CONFIRMED_INVITE') {
            setCurrentInvite((prevState) => {
                _logger('invite', invite);
                const newEmployee = { ...prevState };
                newEmployee.firstname = invite.state.info.firstname;
                newEmployee.middleInitial = invite.state.info.middleInitial;
                newEmployee.lastname = invite.state.info.lastname;
                newEmployee.email = invite.state.info.email;
                newEmployee.inviteTypeId = invite.state.info.inviteTypeId;
                newEmployee.orgId = invite.state.info.orgId;
                return newEmployee;
            });
            payload.email = invite.state.info.email;
            payload.inviteTypeId = invite.state.info.inviteTypeId;
        }
    }, []);

    const onSignUp = (values) => {
        _logger(values);
        userService.register(values).then(onRegisterSuccess).catch(onRegisterError);
    };

    const onRegisterSuccess = (response) => {
        _logger('Register Success ->', response);
        let newUserId = response.item;
        if (!payload.inviteTypeId) {
            Swal.fire({
                title: 'Registered New User!',
                text: 'Please confirm email before logging in',
                icon: 'success',
                button: 'close',
            }).then(nav('/confirm'));
        } else {
            userService.addUserOrgs(newUserId, inviteInfo.orgId).then(onUserOrgSuccess).catch(onUserOrgError);
            Swal.fire({
                title: 'Registered New User!',
                text: 'Please confirm email before logging in',
                icon: 'success',
                button: 'close',
            }).then(nav('/confirm'));
        }
    };

    const onUserOrgSuccess = (response) => {
        Toast.fire({
            icon: 'success',
            title: 'User added to the organization!',
        });
        _logger('UserOrg success', response);
    };

    const onUserOrgError = (error) => {
        Toast.fire({
            icon: 'error',
            title: 'There was a problem adding this user.',
        });
        _logger('UserOrg Error ->', error);
    };

};

export default Register;
