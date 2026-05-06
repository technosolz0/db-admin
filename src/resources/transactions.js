import * as React from "react";
import { List, Datagrid, TextField, DateField, NumberField, ReferenceField } from 'react-admin';

export const TransactionList = () => (
    <List>
        <Datagrid>
            <TextField source="id" />
            <ReferenceField source="user_id" reference="users">
                <TextField source="name" />
            </ReferenceField>
            <NumberField source="amount" />
            <TextField source="type" />
            <TextField source="category" />
            <TextField source="payment_mode" />
            <DateField source="date" showTime />
        </Datagrid>
    </List>
);
