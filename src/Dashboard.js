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
    Paper
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
    DollarSign,
    Briefcase,
    FileText,
    Star,
    TrendingUp,
    Shield
} from "lucide-react";

const StatCard = ({ title, value, icon: Icon, color }) => (
    <Card sx={{ height: '100%', borderRadius: 2, boxShadow: 3 }}>
        <CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box>
                    <Typography color="textSecondary" gutterBottom variant="overline">
                        {title}
                    </Typography>
                    <Typography variant="h4" component="div" fontWeight="bold">
                        {value}
                    </Typography>
                </Box>
                <Box
                    sx={{
                        backgroundColor: `${color}15`,
                        borderRadius: '50%',
                        p: 1.5,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <Icon color={color} size={28} />
                </Box>
            </Box>
        </CardContent>
    </Card>
);

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
        <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
            <CircularProgress />
        </Box>
    );

    if (error) return <Typography color="error">{error}</Typography>;

    const { summary, growth } = data;

    return (
        <Box mt={2}>
            <Title title="Admin Dashboard" />

            <Grid container spacing={3}>
                {/* Summary Cards */}
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard
                        title="Total Users"
                        value={summary.total_users}
                        icon={Users}
                        color="#2196f3"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard
                        title="Active Users"
                        value={summary.active_users}
                        icon={TrendingUp}
                        color="#4caf50"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard
                        title="Premium Users"
                        value={summary.premium_users}
                        icon={Shield}
                        color="#ff9800"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard
                        title="Total Income"
                        value={`₹${summary.total_income}`}
                        icon={DollarSign}
                        color="#f44336"
                    />
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <StatCard
                        title="Businesses"
                        value={summary.total_businesses}
                        icon={Briefcase}
                        color="#9c27b0"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard
                        title="Invoices"
                        value={summary.total_invoices}
                        icon={FileText}
                        color="#607d8b"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard
                        title="Average Rating"
                        value={summary.average_rating}
                        icon={Star}
                        color="#ffeb3b"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard
                        title="Feedback Count"
                        value={summary.feedback_count}
                        icon={FileText}
                        color="#795548"
                    />
                </Grid>

                {/* Charts */}
                <Grid item xs={12} md={8}>
                    <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
                        <Typography variant="h6" gutterBottom>User Growth & Revenue</Typography>
                        <Box height={300}>
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={growth}>
                                    <defs>
                                        <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#2196f3" stopOpacity={0.8} />
                                            <stop offset="95%" stopColor="#2196f3" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis dataKey="date" />
                                    <YAxis />
                                    <Tooltip />
                                    <Area
                                        type="monotone"
                                        dataKey="new_users"
                                        stroke="#2196f3"
                                        fillOpacity={1}
                                        fill="url(#colorUsers)"
                                        name="New Users"
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="transactions"
                                        stroke="#4caf50"
                                        fillOpacity={0.3}
                                        fill="#4caf50"
                                        name="Transactions"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </Box>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
                        <Typography variant="h6" gutterBottom>Income Overview</Typography>
                        <Box height={300}>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={growth}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis dataKey="date" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="income" fill="#f44336" name="Daily Income" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Dashboard;
