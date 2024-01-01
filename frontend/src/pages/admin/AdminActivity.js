import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import { Box, Paper } from '@mui/material';

const fetchActivity = async () => {
    const res = await axios.get("http://localhost:3000/admin/activity")
        .then(response => response.data);
    return res;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const AdminActivity = () => {
    const [stats, setStats] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetchActivity();
            console.log(res);

            setStats([
                { name: 'Doctors', count: res.totalDoctors },
                { name: 'Patients', count: res.totalPatients },
            ]);
        };

        fetchData();
    }, []);

    return (
        <Box sx={{ width: '100%', height: 500, p: 2 }}>
            <Paper>
                <h1 style={{ textAlign: 'center', marginTop: 15, padding: 20 }}>Total Users</h1>
                <ResponsiveContainer width="100%" height={450}>
                    <PieChart>
                        <Pie
                            dataKey="count"
                            startAngle={360}
                            endAngle={0}
                            data={stats}
                            cx="50%"
                            cy="50%"
                            outerRadius={150}
                            fill="#8884d8"
                            label
                            innerRadius={110}
                        >
                            {stats.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </Paper>
        </Box>
    );
};

export default AdminActivity;