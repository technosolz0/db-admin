import * as React from 'react';
import { List, Datagrid, TextField, DateField, NumberField, ReferenceField, FunctionField } from 'react-admin';
import { Typography, Chip } from '@mui/material';

const TypeChip = ({ record }) => {
    if (!record) return null;
    const isCredit = record.type === 'credit' || record.type === 'income' || record.type === 'deposit';
    return (
        <Chip
            label={record.type}
            size="small"
            sx={{
                borderRadius: '6px',
                fontWeight: 600,
                backgroundColor: isCredit ? 'rgba(1, 181, 116, 0.1)' : 'rgba(238, 93, 80, 0.1)',
                color: isCredit ? '#01B574' : '#EE5D50',
                textTransform: 'capitalize',
            }}
        />
    );
};

export const TransactionList = () => (
    <List sx={{ '& .RaList-main': { borderRadius: 4, overflow: 'hidden', boxShadow: '0px 10px 30px rgba(17, 38, 146, 0.05)' } }}>
        <Datagrid sx={{ '& .MuiTableCell-root': { py: 2 } }}>
            <TextField source="id" label="ID" />
            <ReferenceField source="user_id" reference="users" label="User">
                <FunctionField render={record => (
                    <Typography sx={{ fontWeight: 600, color: '#2B3674' }}>
                        {record ? record.name : 'N/A'}
                    </Typography>
                )} />
            </ReferenceField>
            <NumberField 
                source="amount" 
                options={{ style: 'currency', currency: 'INR' }} 
                sx={{ fontWeight: 700, color: '#2B3674' }} 
            />
            <TypeChip label="Type" />
            <TextField source="category" />
            <FunctionField
                label="Payment"
                render={record => record ? (
                    <Chip 
                        label={record.payment_mode} 
                        size="small"
                        sx={{ borderRadius: '6px', fontWeight: 600, backgroundColor: 'rgba(67, 24, 255, 0.05)', color: '#4318FF' }} 
                    />
                ) : null}
            />
            <DateField source="date" label="Date" showTime />
        </Datagrid>
    </List>
);
