import React, { useEffect, useState } from 'react';
import Popover from '@mui/material/Popover';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import getNotifications from '../services/getNotifications';
import notifsImage from '../assets/images/notifs.png';
import { Box } from '@mui/system';
// ...

function UserNotifications() {
    const [unread, setUnread] = useState(0);
    const [anchorEl, setAnchorEl] = useState(null);
    const [notifications, setNotifications] = useState([]);



    const fetchNotifications = async () => {
        const result = await getNotifications();
        if (result) {

            const dummyNotifs = [
                {
                    _id: '1',
                    message: 'This is a dummy notification',
                    date: new Date().toISOString(),
                    isRead: false
                },
                {
                    _id: '2',
                    message: 'This is a dummy notification',
                    date: new Date().toISOString(),
                    isRead: false
                },
                {
                    _id: '3',
                    message: 'This is a dummy notification',
                    date: new Date().toISOString(),
                    isRead: false
                },
                {
                    _id: '4',
                    message: 'This is a dummy notification',
                    date: new Date().toISOString(),
                    isRead: false
                },
                {
                    _id: '5',
                    message: 'This is a dummy notification',
                    date: new Date().toISOString(),
                    isRead: false
                },
                {
                    _id: '6',
                    message: 'This is a dummy notification',
                    date: new Date().toISOString(),
                    isRead: false
                },
                {
                    _id: '7',
                    message: 'This is a dummy notification',
                    date: new Date().toISOString(),
                    isRead: false
                },
                {
                    _id: '8',
                    message: 'This is a dummy notification',
                    date: new Date().toISOString(),
                    isRead: false
                },
                {
                    _id: '9',
                    message: 'This is a dummy notification',
                    date: new Date().toISOString(),
                    isRead: false
                },
                {
                    _id: '10',
                    message: 'This is a dummy notification',
                    date: new Date().toISOString(),
                    isRead: false
                }
            ]
            setNotifications(result);
            setNotifications(dummyNotifs);
            setUnread(result.filter((notification) => !notification.isRead).length);
        }
    }

    const readNotfications = () => {
        setUnread(0);
    }

    useEffect(() => {
        fetchNotifications();
    }, []);


    const handleNotificationsClick = (event) => {
        setAnchorEl(event.currentTarget);
        readNotfications();

    };

    const handleNotificationsClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'notifications-popover' : undefined;


    return (
        <>
            <IconButton onClick={handleNotificationsClick}>
                <Badge badgeContent={unread} color="error">
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
                <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        {notifications.length > 0 ? (
                            notifications.map((notification) => (
                                <ListItem key={notification._id}>
                                    <ListItemText primary={notification.message} secondary={new Date(notification.date).toLocaleString()} />
                                </ListItem>
                            ))
                        ) : (
                            <>
                                <img src={notifsImage} alt="No notifications" style={{ width: '50%' }} />
                                <ListItemText primary="Emptiness..." />
                            </>
                        )}
                    </List>
                </Box>
            </Popover>
        </>
    );
}

export default UserNotifications;