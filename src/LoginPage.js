import * as React from 'react';
import { useState } from 'react';
import { useLogin, useNotify, Notification } from 'react-admin';
import {
    Box,
    Card,
    CardContent,
    TextField,
    Button,
    Typography,
    Container,
    InputAdornment,
    IconButton
} from '@mui/material';
import { Visibility, VisibilityOff, LockOutlined, EmailOutlined } from '@mui/icons-material';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const login = useLogin();
    const notify = useNotify();

    const handleSubmit = (e) => {
        e.preventDefault();
        login({ username: email, password }).catch(() =>
            notify('Invalid email or password', { type: 'warning' })
        );
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #2196f3 0%, #21cbf3 100%)',
            }}
        >
            <Container maxWidth="sm">
                <Card sx={{
                    borderRadius: 4,
                    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
                    overflow: 'hidden'
                }}>
                    <Box sx={{
                        bgcolor: 'primary.main',
                        p: 3,
                        textAlign: 'center',
                        color: 'white'
                    }}>
                        <Typography variant="h4" fontWeight="bold" gutterBottom>
                            DailyBachat
                        </Typography>
                        <Typography variant="body1">
                            Admin Portal Access
                        </Typography>
                    </Box>
                    <CardContent sx={{ p: 4 }}>
                        <form onSubmit={handleSubmit}>
                            <Box sx={{ mb: 3 }}>
                                <TextField
                                    fullWidth
                                    label="Email Address"
                                    variant="outlined"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    autoFocus
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <EmailOutlined color="action" />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Box>
                            <Box sx={{ mb: 4 }}>
                                <TextField
                                    fullWidth
                                    label="Password"
                                    type={showPassword ? 'text' : 'password'}
                                    variant="outlined"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <LockOutlined color="action" />
                                            </InputAdornment>
                                        ),
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Box>
                            <Button
                                fullWidth
                                variant="contained"
                                size="large"
                                type="submit"
                                sx={{
                                    py: 1.5,
                                    fontSize: '1.1rem',
                                    fontWeight: 'bold',
                                    borderRadius: 2,
                                    boxShadow: '0 4px 14px 0 rgba(33, 150, 243, 0.39)',
                                    '&:hover': {
                                        boxShadow: '0 6px 20px rgba(33, 150, 243, 0.23)',
                                    }
                                }}
                            >
                                Sign In
                            </Button>
                        </form>
                    </CardContent>
                </Card>
                <Typography
                    variant="body2"
                    align="center"
                    sx={{ mt: 3, color: 'rgba(255, 255, 255, 0.8)' }}
                >
                    &copy; {new Date().getFullYear()} DailyBachat. All rights reserved.
                </Typography>
            </Container>
            <Notification />
        </Box>
    );
};

export default LoginPage;
