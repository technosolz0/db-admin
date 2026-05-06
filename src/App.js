import * as React from "react";
import { Admin, Resource } from "react-admin";
import jsonServerProvider from "ra-data-json-server";
import { createTheme } from '@mui/material/styles';

// Resources
import { UserList, UserEdit, UserCreate } from "./resources/users";
import { TransactionList } from "./resources/transactions";
import Dashboard from "./Dashboard";

// Icons
import PeopleIcon from '@mui/icons-material/People';
import ReceiptIcon from '@mui/icons-material/Receipt';
import FeedbackIcon from '@mui/icons-material/Feedback';
import BusinessIcon from '@mui/icons-material/Business';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AssessmentIcon from '@mui/icons-material/Assessment';

import { fetchUtils } from 'react-admin';
import authProvider from "./authProvider";
import LoginPage from "./LoginPage";

const httpClient = (url, options = {}) => {
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }
    const token = localStorage.getItem('token');
    if (token) {
        options.headers.set('Authorization', `Bearer ${token}`);
    }
    return fetchUtils.fetchJson(url, options);
};

const dataProvider = jsonServerProvider("https://dailybachatapi.serwex.in/api/v1/admin", httpClient);


const theme = createTheme({
    palette: {
        primary: {
            main: '#2196f3',
        },
        secondary: {
            main: '#f50057',
        },
        background: {
            default: '#f4f6f8',
        },
    },
    typography: {
        fontFamily: [
            'Inter',
            'Roboto',
            'Arial',
            'sans-serif',
        ].join(','),
    },
    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)',
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    borderRadius: 8,
                },
            },
        },
    },
});

const App = () => (
    <Admin 
        dataProvider={dataProvider} 
        authProvider={authProvider}
        loginPage={LoginPage}
        dashboard={Dashboard}
        theme={theme}
        title="DailyBachat Admin"
    >
        <Resource 
            name="users" 
            list={UserList} 
            edit={UserEdit} 
            create={UserCreate} 
            icon={PeopleIcon} 
        />
        <Resource 
            name="transactions" 
            list={TransactionList} 
            icon={ReceiptIcon} 
        />
        <Resource 
            name="feedback" 
            list={TransactionList} 
            icon={FeedbackIcon} 
        />
        <Resource 
            name="businesses" 
            list={TransactionList} 
            icon={BusinessIcon} 
        />
        <Resource 
            name="loans" 
            list={TransactionList} 
            icon={AccountBalanceIcon} 
        />
        <Resource 
            name="invoices" 
            list={TransactionList} 
            icon={AssessmentIcon} 
        />
    </Admin>
);

export default App;