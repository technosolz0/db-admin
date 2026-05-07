import * as React from "react";
import { Admin, Resource, Layout, AppBar, ToggleThemeButton } from "react-admin";
import jsonServerProvider from "ra-data-json-server";
import { createTheme } from '@mui/material/styles';
import { Typography, Box, Chip } from '@mui/material';

// Resources
import { UserList, UserEdit, UserCreate, UserShow } from "./resources/users";
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

const commonThemeOverrides = {
    typography: {
        fontFamily: "'Outfit', 'Inter', 'Roboto', 'sans-serif'",
        h1: { fontWeight: 700 },
        h2: { fontWeight: 700 },
        h3: { fontWeight: 700 },
        h4: { fontWeight: 700 },
        h5: { fontWeight: 600 },
        h6: { fontWeight: 600 },
        button: { textTransform: 'none', fontWeight: 600 },
    },
    shape: {
        borderRadius: 12,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    padding: '8px 16px',
                    boxShadow: 'none',
                    '&:hover': {
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    },
                },
                containedPrimary: {
                    background: 'linear-gradient(135deg, #4318FF 0%, #39B8FF 100%)',
                    color: '#fff',
                    '&:hover': {
                        background: 'linear-gradient(135deg, #3A14DF 0%, #319DE0 100%)',
                    }
                }
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                    boxShadow: '0px 10px 30px rgba(17, 38, 146, 0.05)',
                    border: 'none',
                    backgroundImage: 'none',
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                },
                elevation1: {
                    boxShadow: '0px 10px 30px rgba(17, 38, 146, 0.05)',
                }
            }
        },
        RaMenuItemLink: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    margin: '4px 8px',
                    padding: '10px 16px',
                    '&.RaMenuItemLink-active': {
                        backgroundColor: 'rgba(67, 24, 255, 0.08)',
                        color: '#4318FF',
                        borderRight: '4px solid #4318FF',
                        '& .MuiSvgIcon-root': {
                            color: '#4318FF',
                        }
                    },
                },
            },
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    backgroundColor: '#ffffff',
                    borderRight: 'none',
                    boxShadow: '4px 0 24px rgba(0,0,0,0.02)',
                }
            }
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(12px)',
                    color: '#2B3674',
                    boxShadow: 'none',
                    borderBottom: '1px solid rgba(0,0,0,0.05)',
                }
            }
        },
        RaDatagrid: {
            styleOverrides: {
                root: {
                    '& .RaDatagrid-headerCell': {
                        backgroundColor: '#ffffff',
                        color: '#a3aed0',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        fontSize: '0.75rem',
                        letterSpacing: '0.5px',
                        borderBottom: 'none',
                    },
                    '& .MuiTableRow-root:last-child .MuiTableCell-root': {
                        borderBottom: 'none',
                    }
                }
            }
        }
    },
};

const lightTheme = createTheme({
    ...commonThemeOverrides,
    palette: {
        mode: 'light',
        primary: { main: '#4318FF' },
        secondary: { main: '#39B8FF' },
        background: { default: '#ffffff', paper: '#ffffff' },
        text: { primary: '#2B3674', secondary: '#A3AED0' },
    },
});

const darkTheme = createTheme({
    ...commonThemeOverrides,
    palette: {
        mode: 'dark',
        primary: { main: '#7551FF' },
        secondary: { main: '#39B8FF' },
        background: { default: '#000000', paper: '#121212' },
        text: { primary: '#FFFFFF', secondary: '#A3AED0' },
    },
    components: {
        ...commonThemeOverrides.components,
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    backgroundColor: '#121212',
                    borderRight: '1px solid rgba(255,255,255,0.05)',
                }
            }
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    backdropFilter: 'blur(12px)',
                    color: '#FFFFFF',
                    boxShadow: 'none',
                    borderBottom: '1px solid rgba(255,255,255,0.05)',
                }
            }
        },
        RaDatagrid: {
            styleOverrides: {
                root: {
                    '& .RaDatagrid-headerCell': {
                        backgroundColor: '#000000',
                        color: '#a3aed0',
                    }
                }
            }
        }
    }
});

const MyAppBar = (props) => (
    <AppBar {...props} color="inherit" elevation={0} userMenu={<ToggleThemeButton />}>
        <Typography
            variant="h6"
            color="inherit"
            sx={{
                flex: 1,
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                fontWeight: 700,
                color: '#2B3674',
                letterSpacing: '-0.5px'
            }}
            id="react-admin-title"
        />
        <Box sx={{ flexShrink: 0, mr: 2 }}>
            <Chip
                label="ADMIN PANEL"
                size="small"
                sx={{
                    fontWeight: 700,
                    backgroundColor: 'rgba(67, 24, 255, 0.1)',
                    color: '#4318FF',
                    borderRadius: '8px',
                    fontSize: '0.65rem'
                }}
            />
        </Box>
    </AppBar>
);

const MyLayout = (props) => <Layout {...props} appBar={MyAppBar} />;

const App = () => (
    <Admin
        dataProvider={dataProvider}
        authProvider={authProvider}
        loginPage={LoginPage}
        dashboard={Dashboard}
        theme={lightTheme}
        darkTheme={darkTheme}
        layout={MyLayout}
        title="DailyBachat Admin"
    >
        <Resource
            name="users"
            list={UserList}
            edit={UserEdit}
            create={UserCreate}
            show={UserShow}
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
            options={{ label: 'Feedback' }}
        />
        <Resource
            name="businesses"
            list={TransactionList}
            icon={BusinessIcon}
            options={{ label: 'Businesses' }}
        />
        <Resource
            name="loans"
            list={TransactionList}
            icon={AccountBalanceIcon}
            options={{ label: 'Loans' }}
        />
        <Resource
            name="invoices"
            list={TransactionList}
            icon={AssessmentIcon}
            options={{ label: 'Invoices' }}
        />
    </Admin>
);

export default App;