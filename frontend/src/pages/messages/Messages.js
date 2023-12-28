import React, { useState } from "react";
import { styled } from "@mui/system";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import {
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

const ChatContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  width: "100%",
});

const MessageInputContainer = styled("div")({
  display: "flex",
  padding: "5px",
  borderTop: "1px solid #ccc",
  alignItems: "center",
  justifyContent: "center",
  position: "fixed",
  width: "80%",
  height: "10%",
  bottom: "0",
  background: "#F7F7F7",
  zIndex: 1,
});
const MessageInput = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    borderRadius: "100px",
    fontSize: "smaller",
    height: "10%",
  },
  flex: 1,
  marginRight: "8px",
  background: "#F7F7F7",
});

const User = ({ text }) => {
  return (
    <Paper sx={styles.messagePrimary} style={{ float: "right" }}>
      <p
        style={{
          padding: "0px",
          margin: "0px",
          maxWidth: "100%",
          fontSize: "medium",
        }}
      >
        {text}
      </p>
    </Paper>
  );
};

const SecondaryUser = ({ text }) => {
  return (
    <Paper sx={styles.messageSecondary}>
      <p
        style={{
          padding: "0px",
          margin: "0px",
          maxWidth: "100%",
          fontSize: "medium",
        }}
      >
        {text}
      </p>
    </Paper>
  );
};

const ChatList = styled("div")({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  width: "20%",
  border: "1px solid #ccc",
  padding: "16px",
  overflowY: "auto",
  background: "#EEEEEE",
});

export const Messages = () => {
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [chats, setChat] = useState([]);
  const [selectedChat, setSelectedChat] = useImmer(null);
  const{id}=useParams();
  const handleSendMessage = async () => {
    if (messageInput.trim() === "") return;
    const message = {text: messageInput, date: new Date(), senderId: selectedChat.primary._id};
    const response=await sendMessage(message, selectedChat.secondary._id);
    if (response.message==="Success")
    {
        setSelectedChat((draft) => {
            draft.messages.push({
              text: messageInput,
              date: new Date(),
              senderId: draft.primary._id,
            });
          });
          setMessageInput("");
    }
    else {
        console.log("Error");
        alert("Error")
    }

  };



  useEffect(() => {
    const fetch = async () => {
      const response = await fetchMessages();
      setMessages(response.messages[0].messages);
      setSelectedChat((draft) => {
        const select= response?.map((c)=> c.secondary._id === id || c.primary._id === id ? draft = c : null)
        if (select)
        {
            return  select;
        }
        return response.messages[0];
      });
      setChat(response.messages);
    };
    fetch();
  }, []);

  console.log(chats);
  console.log("selected chat", selectedChat);

  return (
    <Box sx={{ height: "75vh", display: "flex", flexDirection: "row" }}>
      <ChatList>
        <List>
          {chats.map((chat, index) => (
            <>
              <ListItemButton
                key={index}
                sx={
                  chat.secondary._id === selectedChat.secondary._id
                    ? styles.selected
                    : styles.list
                }
              >
                <ListItemAvatar>
                  <Avatar>
                    <PersonIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={chat?.secondary?.user?.name}
                  secondary="Online"
                />
              </ListItemButton>
              <Divider />
            </>
          ))}
        </List>
      </ChatList>
      <ChatContainer>
        <div
          className="chatWindow"
          style={{
            flex: 1,
            overflowY: "scroll",
            border: "1px solid #ccc",
            height: "calc(80% - 32px)",
            paddingTop: "2%",
            width: "100%",
            border: "none",
            display: "flex",
            flexDirection: "column-reverse",
            marginBottom: "2%",
          }}
        >
          {selectedChat?.messages?.toReversed().map((message, index) => (
            <>
              <div className="userMsg" style={{ width: "98%", paddingLeft:'10px', paddingRight:'10px' }}>
                {message.senderId === selectedChat.primary._id ? (
                  <User text={message.text} />
                ) : (
                  <SecondaryUser text={message.text} />
                )}
              </div>
            </>
          ))}
        </div>
        <MessageInputContainer>
          <MessageInput
            label="Type a message"
            variant="outlined"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
          />
          <Button
            variant="contained"
            onClick={handleSendMessage}
            sx={styles.button}
          >
            Send
          </Button>
        </MessageInputContainer>
      </ChatContainer>
    </Box>
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
  },
};
