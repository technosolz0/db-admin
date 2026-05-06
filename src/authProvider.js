const authProvider = {
    login: ({ username, password }) => {
        const request = new Request('https://dailybachatapi.serwex.in/api/v1/admin/login', {
            method: 'POST',
            body: JSON.stringify({ email: username, password }),
            headers: new Headers({ 'Content-Type': 'application/json' }),
        });
        return fetch(request)
            .then(response => {
                if (response.status < 200 || response.status >= 300) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then(auth => {
                localStorage.setItem('auth', JSON.stringify(auth));
                localStorage.setItem('token', auth.access_token);
            })
            .catch(() => {
                throw new Error('Network error or invalid credentials');
            });
    },
    logout: () => {
        localStorage.removeItem('auth');
        localStorage.removeItem('token');
        return Promise.resolve();
    },
    checkAuth: () => {
        return localStorage.getItem('token') ? Promise.resolve() : Promise.reject();
    },
    checkError: (error) => {
        const status = error.status;
        if (status === 401 || status === 403) {
            localStorage.removeItem('auth');
            localStorage.removeItem('token');
            return Promise.reject();
        }
        return Promise.resolve();
    },
    getPermissions: () => Promise.resolve(),
    getIdentity: () => {
        return Promise.resolve({
            id: 'admin',
            fullName: 'Admin User',
        });
    },
};

export default authProvider;
