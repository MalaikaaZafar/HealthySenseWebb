import React, { useState } from 'react';
import Popover from '@mui/material/Popover';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';

// ...

function UserNotifications() {
    const unreadNotifications = 1;
    const [anchorEl, setAnchorEl] = useState(null);

    const handleNotificationsClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleNotificationsClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'notifications-popover' : undefined;

    return (
        <>
            <IconButton onClick={handleNotificationsClick}>
                <Badge badgeContent={unreadNotifications} color="error">
                    <NotificationsIcon style={{ color: "white" }} />
                </Badge>
            </IconButton>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleNotificationsClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <List>
                    <ListItem>
                        <ListItemText primary="Notification 1" />
                    </ListItem>
                    {/* Add more ListItems for more notifications */}
                </List>
            </Popover>
        </>
    );
}

export default UserNotifications;