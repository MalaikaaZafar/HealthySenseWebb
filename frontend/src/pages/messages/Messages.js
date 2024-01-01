import React, { useState } from "react";
import { maxHeight, styled } from "@mui/system";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import {
  Card,
  CardContent,
  Grid,
  List,
  ListItemButton,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import Divider from "@mui/material/Divider";

import { useImmer } from "use-immer";
import fetchMessages from "../../services/fetchMessages";
import sendMessage from "../../services/sendMessage";
import { useEffect } from "react";
import { useParams } from "react-router-dom";


export const Messages = () => {
  const [messageInput, setMessageInput] = useState("");
  const [chats, setChat] = useState([]);
  const [selectedChat, setSelectedChat] = useImmer(null);
  const [userId, setUserId] = useState(0);
  const { patientId, docId, id } = useParams();
  

  const handleSendMessage = async () => {
    if (messageInput.trim() === "") return;

    const message = {
      text: messageInput,
      date: new Date(),
      senderId: userId,
    };


    var receiverId = 0;
    if (selectedChat?.primary?._id === userId )
      receiverId = selectedChat?.secondary?._id;
    else 
      receiverId = selectedChat?.primary?._id;

    const response = await sendMessage(message, receiverId);
    if (response.message === "Success") {
      setSelectedChat((draft) => {
        draft.messages.push({
            message
        });
      });
      setMessageInput("");
    } else {
      console.log("Error");
      alert("Error");
    }
  };

  useEffect(() => {
    const fetch = async () => {
      if (patientId)
    setUserId(patientId)
  else 
    setUserId(docId)
      const response = await fetchMessages(id);
      if (response.message === "Success") {
        setChat(response.chat);
        response?.chat?.map ((chat) => {
          if (chat?.primary?._id === id || chat?.secondary?._id === id) {
            setSelectedChat(chat);
          }
        })
      } else {
        console.log("Error");
        alert("Error");
      }
    };

    const intervalId = setInterval(fetch, 500);

    // Clean up function
    return () => clearInterval(intervalId);
  }, []);
  return (
    <Grid container sx={{ overflow: "hidden" }}>
      <Grid
        item
        xs={12}
        sm={3}
        sx={{ boxShadow: "0px 0px 10px 10px rgba(0, 0, 0, 0.2)" }}
      >
        <Box sx={{ p: 2 }}>
          <TextField placeholder="Search..." variant="outlined" fullWidth />
        </Box>
        <List>
          {chats &&
            chats.map((chat, index) => (
              <ListItemButton
                onClick={() => setSelectedChat(chat)}
                key={index}
                selected={
                  chat?.primary?._id === selectedChat?.primary?._id &&
                  chat?.secondary?._id === selectedChat?.secondary?._id
                }
              >
                <ListItemAvatar>
                  <Avatar>
                    <PersonIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    chat?.secondary?._id !== userId
                      ? chat?.secondary?.name
                      : chat?.primary?.name
                  }
                  secondary= "Online" 
                />
              </ListItemButton>
            ))}
        </List>
      </Grid>
      <Grid
        item
        xs={12}
        sm={9}
        sx={{
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          padding: "0px",
          margin: "0px",
        }}
      >
        <Box
          sx={{
            p: 2,
            background: "#eeeeee",
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
          }}
        >
          <Typography variant="h6">
            {selectedChat?.secondary?._id !== userId
              ? selectedChat?.secondary?.name
              : selectedChat?.primary?.name}
          </Typography>
        </Box>
        <Box
          sx={{
            p: 3,
            maxHeight: "400px",
            minHeight: "400px",
            overflowY: "scroll",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {selectedChat &&
            Array.isArray(selectedChat.messages) && selectedChat.messages.length>0 &&
            selectedChat.messages.map((message, index) => (
              (message.senderId === userId || message.senderId ===id) &&
              <Box
                p={1}
                bgcolor={message.senderId === userId ? "#2854C3" : message.senderId===id?  "#eeeeee": null}
                borderRadius={
                  message.senderId === userId
                    ? "16px 16px 0px 16px"
                    : "0px 16px 16px 16px"
                }
                maxWidth="70%"
                min
                my={1}
                sx={{
                  marginLeft:
                    message.senderId === userId ? "auto" : "none",
                  position: "relative",
                  boxShadow: "0 3px 5px rgba(0, 0, 0, 0.2)",
                }}
              >
                <Typography
                  variant="body1"
                  color={message.senderId === userId ? "white" : message.senderId===id?  "black": null}
                  sx={{
                    fontFamily: "Arial",
                    fontSize: "16px",
                    wordWrap: "break-word",
                  }}
                >
                  {message.text}
                </Typography>
                <Typography
                  variant="caption"
                  color={message.senderId === userId ? "white" : message.senderId===id?  "black": null}
                  sx={{
                    display: "block",
                    textAlign: "right",
                    fontSize: "12px",
                  }}
                >
                  {message.senderId === userId ? new Date(message.date).toLocaleTimeString() : message.senderId===id? new Date(message.date).toLocaleTimeString() : null}
                </Typography>
              </Box>
            ))}
            {
              !selectedChat && 
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f5f5f5' }}>
              <Card 
                sx={{ 
                  width: '50%', 
                  padding: '20px', 
                  borderRadius: '10px', 
                  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', 
                }}
              >
                <CardContent>
                  <Typography 
                    variant="h4" 
                    color="text.secondary" 
                    sx={{ 
                      textAlign: "center", 
                      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                      fontWeight: 'bold',
                    }}
                  >
                    Select a chat to start messaging
                  </Typography>
                </CardContent>
              </Card>
            </Box>
            }
        </Box>
        <Box p={2} boxShadow="10px 10px 10px 10px rgba(0 0 0 0.5)">
          <Grid container spacing={2}>
            <Grid item xs={11}>
              <TextField
                label="Type a message"
                variant="outlined"
                fullWidth
                value={messageInput}
                sx={{ borderRadius: 5 }}
                onChange={(e) => setMessageInput(e.target.value)}
              />
            </Grid>
            <Grid item xs={1}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#2854c3",
                  color: "white",
                  borderRadius: "50px",
                  textTransform: "none",
                  pt: 1.5,
                  pb: 1.5,
                  fontSize: "medium",
                }}
                width="50%"
                borderRadius={5}
                onClick={handleSendMessage}
                endIcon={<SendOutlinedIcon />}
              >
                Send
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};

const styles = {
  button: {
    backgroundColor: "#2854c3",
    borderRadius: "100px",
    color: "white",
    height: "70%",
    width: "10%",
    marginRight: "1%",
    textTransform: "none",
  },
  messageSecondary: {
    backgroundColor: "#ffffff",
    borderRadius: "5px 20px 20px 20px",
    borderStyle: "solid",
    borderColor: "#2854c3",
    borderWidth: "2px",
    width: "max-content",
    maxWidth: "40%",
    textAlign: "left",
    p: 2,
    marginBottom: "2%",
    overflowWrap: "break-word",
  },
  messagePrimary: {
    backgroundColor: "#2854c3",
    borderRadius: "20px 5px 20px 20px",
    width: "max-content",
    maxWidth: "40%",
    textAlign: "left",
    p: 2,
    marginBottom: "2%",
    overflowWrap: "break-word",
    color: "white",
  },
  list: {
    width: "100%",
    backgroundColor: "#EEEEEE",
    borderRadius: "5px",
    padding: "5%",
    margin: "0px",
    marginBottom: "2%",
    overflow: "auto",
    "&:hover": {
      backgroundColor: "#2854c3",
      color: "white",
    },
  },
  selected: {
    width: "100%",
    backgroundColor: "#2854c3",
    color: "white",
    borderRadius: "5px",
    padding: "5%",
    margin: "0px",
    marginBottom: "2%",
    overflow: "auto",
    "&:hover": {
      backgroundColor: "#2854c3",
      color: "white",
    },
    maxHeight: "50%",
  },
};
