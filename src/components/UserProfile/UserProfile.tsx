import React from 'react';
import {Avatar, Box, Card, CardContent, Typography} from '@mui/material';
import {User} from "../../types/User.ts";

const UserProfile: React.FC = () => {
    const user: User = {
        name: 'Гакал Анжелика',
        email: 'user.user@example.com',
        group: 'Студент',
        avatarUrl: 'https://via.placeholder.com/150'
    };

    return (
        <Box sx={{p: 3, display: 'flex', justifyContent: 'center'}}>
            <Card sx={{maxWidth: 400}}>
                <CardContent>
                    <Avatar
                        src={user.avatarUrl}
                        alt={user.name}
                        sx={{width: 100, height: 100, m: 'auto', mb: 2}}
                    />
                    <Typography variant="h5" component="div" gutterBottom align="center">
                        {user.name}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" align="center">
                        Email: {user.email}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" align="center">
                        Группа: {user.group}
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );
};

export default UserProfile;