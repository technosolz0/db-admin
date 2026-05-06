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
} from 'react-admin';

export const UserList = () => (
    <List>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="name" />
            <EmailField source="email" />
            <TextField source="phone_number" />
            <BooleanField source="is_active" />
            <BooleanField source="is_admin" />
            <BooleanField source="is_premium" />
            <DateField source="created_at" showTime />
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);

export const UserEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="id" disabled />
            <TextInput source="name" />
            <TextInput source="email" />
            <TextInput source="phone_number" />
            <BooleanInput source="is_active" />
            <BooleanInput source="is_admin" />
            <BooleanInput source="is_premium" />
        </SimpleForm>
    </Edit>
);

export const UserCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="name" />
            <TextInput source="email" />
            <TextInput source="phone_number" />
            <PasswordInput source="password" />
            <BooleanInput source="is_active" defaultValue={true} />
            <BooleanInput source="is_admin" />
            <BooleanInput source="is_premium" />
        </SimpleForm>
    </Create>
);
