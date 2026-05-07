import * as React from "react";
import {
    List,
    Datagrid,
    TextField,
    EmailField,
    BooleanField,
    DateField,
    EditButton,
    DeleteButton,
    Edit,
    SimpleForm,
    TextInput,
    BooleanInput,
    Create,
    PasswordInput,
    Show,
    SimpleShowLayout,
    ShowButton,
    TopToolbar,
    ListButton,
    FunctionField,
    Labeled,
} from 'react-admin';
import { Button, Box, Typography, Divider, Grid, Chip } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const StatusChip = ({ record, source, labelTrue = "Active", labelFalse = "Inactive" }) => {
    if (!record) return null;
    const value = record[source];
    return (
        <Chip
            label={value ? labelTrue : labelFalse}
            size="small"
            sx={{
                borderRadius: '6px',
                fontWeight: 600,
                backgroundColor: value ? 'rgba(1, 181, 116, 0.1)' : 'rgba(238, 93, 80, 0.1)',
                color: value ? '#01B574' : '#EE5D50',
                border: 'none',
            }}
        />
    );
};

const PremiumChip = ({ record }) => {
    if (!record) return null;
    const value = record.is_premium;
    return (
        <Chip
            label={value ? "Premium" : "Free"}
            size="small"
            sx={{
                borderRadius: '6px',
                fontWeight: 600,
                backgroundColor: value ? 'rgba(255, 181, 71, 0.1)' : 'rgba(163, 174, 208, 0.1)',
                color: value ? '#FFB547' : '#A3AED0',
                border: 'none',
            }}
        />
    );
};

const BackButton = () => {
    const navigate = useNavigate();
    return (
        <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
            sx={{
                mr: 2,
                color: '#2B3674',
                fontWeight: 600,
                '&:hover': { backgroundColor: 'rgba(67, 24, 255, 0.05)' }
            }}
        >
            Back
        </Button>
    );
};

const ShowActions = () => (
    <TopToolbar sx={{ justifyContent: 'flex-start', alignItems: 'center', p: 1 }}>
        <BackButton />
        <ListButton sx={{ color: '#4318FF' }} />
    </TopToolbar>
);

const EditActions = () => (
    <TopToolbar sx={{ justifyContent: 'flex-start', alignItems: 'center', p: 1 }}>
        <BackButton />
        <ListButton sx={{ color: '#4318FF' }} />
    </TopToolbar>
);

export const UserList = () => (
    <List sx={{ '& .RaList-main': { borderRadius: 4, overflow: 'hidden', boxShadow: '0px 10px 30px rgba(17, 38, 146, 0.05)' } }}>
        <Datagrid rowClick="show" sx={{ '& .MuiTableCell-root': { py: 2 } }}>
            <TextField source="id" label="ID" />
            <FunctionField
                label="Name"
                render={record => (
                    <Typography sx={{ fontWeight: 600, color: '#2B3674', fontSize: '0.9rem' }}>
                        {record ? record.name : 'N/A'}
                    </Typography>
                )}
            />
            <EmailField source="email" />
            <TextField source="phone_number" label="Phone" />
            <StatusChip source="is_active" labelTrue="Active" labelFalse="Inactive" label="Status" />
            <StatusChip source="is_admin" labelTrue="Admin" labelFalse="User" label="Role" />
            <PremiumChip label="Plan" />
            <DateField source="created_at" label="Joined" showTime />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                <ShowButton sx={{ color: '#4318FF' }} />
                <EditButton sx={{ color: '#4318FF' }} />
                <DeleteButton />
            </Box>
        </Datagrid>
    </List>
);

export const UserEdit = () => (
    <Edit actions={<EditActions />}>
        <SimpleForm sx={{ '& .MuiPaper-root': { p: 3, borderRadius: 4 } }}>
            <Box mb={2}>
                <Typography variant="h5" sx={{ fontWeight: 700, color: '#2B3674' }}>Edit User Details</Typography>
                <Typography variant="body2" sx={{ color: '#A3AED0' }}>Update the user information below</Typography>
            </Box>
            <Divider sx={{ mb: 3 }} />
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <TextInput source="id" disabled fullWidth />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextInput source="name" fullWidth />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextInput source="email" fullWidth />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextInput source="phone_number" fullWidth />
                </Grid>
                <Grid item xs={12} md={4}>
                    <BooleanInput source="is_active" />
                </Grid>
                <Grid item xs={12} md={4}>
                    <BooleanInput source="is_admin" />
                </Grid>
                <Grid item xs={12} md={4}>
                    <BooleanInput source="is_premium" />
                </Grid>
            </Grid>
        </SimpleForm>
    </Edit>
);

export const UserCreate = () => (
    <Create actions={<EditActions />}>
        <SimpleForm sx={{ '& .MuiPaper-root': { p: 3, borderRadius: 4 } }}>
            <Box mb={2}>
                <Typography variant="h5" sx={{ fontWeight: 700, color: '#2B3674' }}>Create New User</Typography>
                <Typography variant="body2" sx={{ color: '#A3AED0' }}>Enter details for the new user account</Typography>
            </Box>
            <Divider sx={{ mb: 3 }} />
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <TextInput source="name" fullWidth />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextInput source="email" fullWidth />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextInput source="phone_number" fullWidth />
                </Grid>
                <Grid item xs={12} md={6}>
                    <PasswordInput source="password" fullWidth />
                </Grid>
                <Grid item xs={12} md={4}>
                    <BooleanInput source="is_active" defaultValue={true} />
                </Grid>
                <Grid item xs={12} md={4}>
                    <BooleanInput source="is_admin" />
                </Grid>
                <Grid item xs={12} md={4}>
                    <BooleanInput source="is_premium" />
                </Grid>
            </Grid>
        </SimpleForm>
    </Create>
);

export const UserShow = () => (
    <Show actions={<ShowActions />}>
        <SimpleShowLayout sx={{ '& .ra-field': { mb: 2 } }}>
            <Box sx={{ p: 1 }}>
                <Box mb={3}>
                    <Typography variant="h5" sx={{ fontWeight: 700, color: '#2B3674' }}>User Profile</Typography>
                    <Typography variant="body2" sx={{ color: '#A3AED0' }}>Detailed information about the user account</Typography>
                </Box>
                <Divider sx={{ mb: 4 }} />
                
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <Labeled label="User ID"><TextField source="id" /></Labeled>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Labeled label="Full Name"><TextField source="name" sx={{ fontWeight: 600, color: '#2B3674' }} /></Labeled>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Labeled label="Email Address"><EmailField source="email" /></Labeled>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Labeled label="Phone Number"><TextField source="phone_number" /></Labeled>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Labeled label="Device Info"><TextField source="device_info" /></Labeled>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Labeled label="Plan"><PremiumChip /></Labeled>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Labeled label="Account Status"><StatusChip source="is_active" labelTrue="Active" labelFalse="Inactive" /></Labeled>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Labeled label="Admin Privileges"><StatusChip source="is_admin" labelTrue="Admin" labelFalse="User" /></Labeled>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Labeled label="Premium Expiry"><DateField source="premium_expiry" showTime /></Labeled>
                    </Grid>
                </Grid>

                <Box mt={4} mb={2}>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#2B3674' }}>Activity & Metadata</Typography>
                </Box>
                <Divider sx={{ mb: 3 }} />

                <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                        <Labeled label="Last Login"><DateField source="last_login" showTime /></Labeled>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Labeled label="Joined Date"><DateField source="created_at" showTime /></Labeled>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Labeled label="Last Updated"><DateField source="updated_at" showTime /></Labeled>
                    </Grid>
                    {/* Deletion Section */}
                    <Grid item xs={12}>
                        <Box sx={{ p: 2, borderRadius: 2, backgroundColor: 'rgba(238, 93, 80, 0.05)', border: '1px solid rgba(238, 93, 80, 0.1)' }}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={4}>
                                    <Labeled label="Deletion Requested"><BooleanField source="deletion_requested" /></Labeled>
                                </Grid>
                                <Grid item xs={12} md={8}>
                                    <Labeled label="Deletion Reason"><TextField source="deletion_reason" /></Labeled>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </SimpleShowLayout>
    </Show>
);
