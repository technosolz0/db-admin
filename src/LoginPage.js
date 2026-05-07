import * as React from 'react';
import { useState } from 'react';
import { useLogin, useNotify, Notification } from 'react-admin';
import {
    Box,
    Card,
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
                minHeight: '100vh',
                display: 'flex',
                bgcolor: 'background.default',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Container maxWidth="lg">
                <Card sx={{
                    borderRadius: 6,
                    boxShadow: '0 20px 40px rgba(17, 38, 146, 0.08)',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    minHeight: '600px'
                }}>
                    {/* Left Side - Branding */}
                    <Box
                        sx={{
                            flex: 1,
                            background: 'linear-gradient(135deg, #4318FF 0%, #39B8FF 100%)',
                            color: 'white',
                            p: 6,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            position: 'relative',
                            overflow: 'hidden',
                        }}
                    >
                        <Box sx={{ position: 'absolute', top: -50, right: -50, width: 200, height: 200, background: 'rgba(255,255,255,0.1)', borderRadius: '50%' }} />
                        <Box sx={{ position: 'absolute', bottom: -50, left: -50, width: 150, height: 150, background: 'rgba(255,255,255,0.1)', borderRadius: '50%' }} />

                        <Typography variant="h3" fontWeight="800" gutterBottom sx={{ position: 'relative', zIndex: 1 }}>
                            DailyBachat
                        </Typography>
                        <Typography variant="h6" fontWeight="400" sx={{ opacity: 0.9, position: 'relative', zIndex: 1, mb: 4 }}>
                            Manage your finances effortlessly and securely.
                        </Typography>

                        <Box sx={{ mt: 'auto', position: 'relative', zIndex: 1 }}>
                            <Typography variant="body2" sx={{ opacity: 0.8 }}>
                                &copy; {new Date().getFullYear()} DailyBachat. All rights reserved.
                            </Typography>
                        </Box>
                    </Box>

                    {/* Right Side - Login Form */}
                    <Box sx={{ flex: 1, p: { xs: 4, md: 8 }, display: 'flex', flexDirection: 'column', justifyContent: 'center', bgcolor: 'background.paper' }}>
                        <Box sx={{ mb: 5 }}>
                            <Typography variant="h4" fontWeight="700" color="text.primary" gutterBottom>
                                Welcome Back
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                Enter your email and password to sign in.
                            </Typography>
                        </Box>

                        <form onSubmit={handleSubmit}>
                            <Box sx={{ mb: 3 }}>
                                <Typography variant="subtitle2" color="text.primary" fontWeight="600" sx={{ mb: 1 }}>
                                    Email*
                                </Typography>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    placeholder="mail@dailybachat.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    autoFocus
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <EmailOutlined sx={{ color: 'text.secondary' }} />
                                            </InputAdornment>
                                        ),
                                        sx: { borderRadius: 3 }
                                    }}
                                />
                            </Box>
                            <Box sx={{ mb: 4 }}>
                                <Typography variant="subtitle2" color="text.primary" fontWeight="600" sx={{ mb: 1 }}>
                                    Password*
                                </Typography>
                                <TextField
                                    fullWidth
                                    type={showPassword ? 'text' : 'password'}
                                    variant="outlined"
                                    placeholder="Min. 8 characters"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <LockOutlined sx={{ color: 'text.secondary' }} />
                                            </InputAdornment>
                                        ),
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff sx={{ color: 'text.secondary' }} /> : <Visibility sx={{ color: 'text.secondary' }} />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                        sx: { borderRadius: 3 }
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
                                    fontSize: '1rem',
                                    fontWeight: '700',
                                    borderRadius: 3,
                                    textTransform: 'none',
                                    background: '#4318FF',
                                    color: 'white',
                                    boxShadow: 'none',
                                    '&:hover': {
                                        background: '#3A14DF',
                                        boxShadow: '0 4px 12px rgba(67, 24, 255, 0.2)',
                                    }
                                }}
                            >
                                Sign In
                            </Button>
                        </form>
                    </Box>
                </Card>
            </Container>
            <Notification />
        </Box>
    );
};

export default LoginPage;
