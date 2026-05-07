import * as React from "react";
import { useEffect, useState } from "react";
import { Title } from "react-admin";
import {
    Card,
    CardContent,
    Typography,
    Grid,
    Box,
    CircularProgress,
    Paper,
    Fade
} from "@mui/material";
import {
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area,
    BarChart,
    Bar,
} from "recharts";
import {
    Users,
    Briefcase,
    FileText,
    Star,
    TrendingUp,
    Shield
} from "lucide-react";

const StatCard = ({ title, value, icon: Icon, color, bgGradient, textColor = '#111827', subTextColor = '#64748b', isPrimary = false }) => (
    <Card
        sx={{
            height: '100%',
            borderRadius: '20px',
            boxShadow: isPrimary ? `0 18px 40px -12px ${color}` : '0px 10px 30px rgba(17, 38, 146, 0.05)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: isPrimary ? `0 22px 45px -10px ${color}` : '0px 15px 35px rgba(17, 38, 146, 0.08)',
            },
            background: bgGradient || '#ffffff',
            position: 'relative',
            overflow: 'hidden',
            border: 'none',
        }}
    >
        <CardContent sx={{ p: '24px !important', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box>
                    <Typography sx={{ fontSize: '0.875rem', fontWeight: 600, color: subTextColor, mb: 0.5 }}>
                        {title}
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: textColor, letterSpacing: '-0.5px' }}>
                        {value}
                    </Typography>
                </Box>
                {Icon && (
                    <Box
                        sx={{
                            background: isPrimary ? 'rgba(255,255,255,0.2)' : `${color}15`,
                            borderRadius: '50%',
                            width: 56,
                            height: 56,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: isPrimary ? '#ffffff' : color,
                        }}
                    >
                        <Icon size={26} strokeWidth={2.5} />
                    </Box>
                )}
            </Box>
        </CardContent>
    </Card>
);

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <Paper elevation={0} sx={{ p: 2, borderRadius: 3, backgroundColor: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(10px)', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1, color: '#2B3674' }}>{label}</Typography>
                {payload.map((entry, index) => (
                    <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                        <Box sx={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: entry.color, mr: 1.5 }} />
                        <Typography variant="body2" sx={{ color: '#A3AED0', fontWeight: 600 }}>
                            {entry.name}: <span style={{ color: '#2B3674', marginLeft: 4 }}>{entry.value}</span>
                        </Typography>
                    </Box>
                ))}
            </Paper>
        );
    }
    return null;
};

const Dashboard = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await fetch('https://dailybachatapi.serwex.in/api/v1/admin/dashboard', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (!response.ok) throw new Error('Failed to fetch dashboard data');
                const result = await response.json();
                setData(result);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) return (
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="80vh" gap={2}>
            <CircularProgress size={48} thickness={4} sx={{ color: '#4318FF' }} />
            <Typography variant="h6" sx={{ color: '#A3AED0', fontWeight: 600 }}>
                Loading Dashboard...
            </Typography>
        </Box>
    );

    if (error) return (
        <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
            <Paper sx={{ p: 4, borderRadius: 4, textAlign: 'center', backgroundColor: '#fff', boxShadow: '0px 10px 30px rgba(17, 38, 146, 0.05)' }}>
                <Typography variant="h6" color="error" gutterBottom sx={{ fontWeight: 700 }}>Oops! Something went wrong</Typography>
                <Typography sx={{ color: '#A3AED0' }}>{error}</Typography>
            </Paper>
        </Box>
    );

    const { summary, growth } = data;

    return (
        <Fade in={true} timeout={800}>
            <Box mt={2} mb={6} sx={{ px: { xs: 1, sm: 2, md: 3 } }}>
                <Title title="Admin Dashboard" />

                <Box mb={4} display="flex" flexDirection="column" gap={0.5}>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: '#2B3674', display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        Platform Overview
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#A3AED0', fontWeight: 500 }}>
                        Monitor your key metrics, user growth, and revenue at a glance.
                    </Typography>
                </Box>

                <Grid container spacing={2}>
                    {/* Primary Highlight Cards */}
                    <Grid item xs={12} sm={6} lg={3}>
                        <StatCard
                            title="Total Income"
                            value={`₹${summary.total_income?.toLocaleString()}`}
                            color="#4318FF"
                            bgGradient="linear-gradient(135deg, #4318FF 0%, #39B8FF 100%)"
                            textColor="#ffffff"
                            subTextColor="rgba(255,255,255,0.8)"
                            isPrimary={true}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} lg={3}>
                        <StatCard
                            title="Total Users"
                            value={summary.total_users?.toLocaleString()}
                            icon={Users}
                            color="#4318FF"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} lg={3}>
                        <StatCard
                            title="Active Users"
                            value={summary.active_users?.toLocaleString()}
                            icon={TrendingUp}
                            color="#01B574"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} lg={3}>
                        <StatCard
                            title="Premium Users"
                            value={summary.premium_users?.toLocaleString()}
                            icon={Shield}
                            color="#FFB547"
                        />
                    </Grid>

                    {/* Secondary Cards */}
                    <Grid item xs={12} sm={6} lg={3}>
                        <StatCard
                            title="Businesses"
                            value={summary.total_businesses?.toLocaleString()}
                            icon={Briefcase}
                            color="#39B8FF"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} lg={3}>
                        <StatCard
                            title="Invoices"
                            value={summary.total_invoices?.toLocaleString()}
                            icon={FileText}
                            color="#FF7A00"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} lg={3}>
                        <StatCard
                            title="Average Rating"
                            value={summary.average_rating?.toFixed(1)}
                            icon={Star}
                            color="#FFCE20"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} lg={3}>
                        <StatCard
                            title="Feedback Count"
                            value={summary.feedback_count?.toLocaleString()}
                            icon={FileText}
                            color="#EE5D50"
                        />
                    </Grid>

                    {/* Charts */}
                    <Grid item xs={12} lg={7}>
                        <Paper sx={{ p: 3, borderRadius: '20px', boxShadow: '0px 10px 30px rgba(17, 38, 146, 0.05)', height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <Box mb={3} display="flex" justifyContent="space-between" alignItems="center">
                                <Typography variant="h6" sx={{ fontWeight: 700, color: '#2B3674' }}>
                                    User Growth & Transactions
                                </Typography>
                            </Box>
                            <Box sx={{ flexGrow: 1, minHeight: 350 }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={growth} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                        <defs>
                                            <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#4318FF" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="#4318FF" stopOpacity={0} />
                                            </linearGradient>
                                            <linearGradient id="colorTransactions" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#39B8FF" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="#39B8FF" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E0E5F2" />
                                        <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#A3AED0', fontSize: 12, fontWeight: 500 }} dy={10} />
                                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#A3AED0', fontSize: 12, fontWeight: 500 }} />
                                        <Tooltip content={<CustomTooltip />} />
                                        <Area
                                            type="monotone"
                                            dataKey="new_users"
                                            stroke="#4318FF"
                                            strokeWidth={4}
                                            fillOpacity={1}
                                            fill="url(#colorUsers)"
                                            name="New Users"
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="transactions"
                                            stroke="#39B8FF"
                                            strokeWidth={4}
                                            fillOpacity={1}
                                            fill="url(#colorTransactions)"
                                            name="Transactions"
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </Box>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} lg={5}>
                        <Paper sx={{ p: 3, borderRadius: '20px', boxShadow: '0px 10px 30px rgba(17, 38, 146, 0.05)', height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <Box mb={3}>
                                <Typography variant="h6" sx={{ fontWeight: 700, color: '#2B3674' }}>
                                    Income Overview
                                </Typography>
                            </Box>
                            <Box sx={{ flexGrow: 1, minHeight: 350 }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={growth} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                        <defs>
                                            <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="0%" stopColor="#4318FF" stopOpacity={1} />
                                                <stop offset="100%" stopColor="#39B8FF" stopOpacity={1} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E0E5F2" />
                                        <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#A3AED0', fontSize: 12, fontWeight: 500 }} dy={10} />
                                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#A3AED0', fontSize: 12, fontWeight: 500 }} />
                                        <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f4f7fe' }} />
                                        <Bar dataKey="income" fill="url(#colorIncome)" name="Daily Income" radius={[6, 6, 6, 6]} maxBarSize={30} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </Fade>
    );
};

export default Dashboard;
