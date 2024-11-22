import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/auth';
import '../styles/ChatStyles.css';
import Layout from './Layout/Layout';

const Chat = () => {
    const [auth] = useAuth();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [selectedChat, setSelectedChat] = useState(null);

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/chat`);
            setMessages(res.data.messages);
        } catch (error) {
            console.error('Failed to fetch messages:', error);
        }
    };

    const handleSendMessage = async () => {
        if (!auth.user?._id) {
            console.error('User ID is missing.');
            return;
        }
    
        try {
            const payload = {
                senderId: auth.user._id,
                content: newMessage,
            };
            await axios.post(`${process.env.REACT_APP_API}/api/v1/chat`, payload);
            setNewMessage('');
            fetchMessages();
        } catch (error) {
            console.error('Failed to send message:', error);
        }
    }

    return (
    <Layout>
        <div className="chat-page">
            <div className="chat-sidebar">
                <h3>Chats</h3>
                {/* This list can be populated with chat previews */}
                <div className="chat-preview" onClick={() => setSelectedChat(1)}>
                    Akash
                </div>
                <div className="chat-preview" onClick={() => setSelectedChat(2)}>
                    Raju
                </div>
                <div className="chat-preview" onClick={() => setSelectedChat(2)}>
                    Varun
                </div>
                {/* More chat previews can go here */}
            </div>

            <div className="chat-container">
                <div className="chat-header">
                    <h2>Raju</h2>
                </div>
                <div className="messages">
    {messages.map((msg, index) => (
        <div
            key={index}
            className={`message ${msg.senderId === auth.user._id ? 'sent' : 'received'}`}
        >
            <p>{msg.content}</p>
        </div>
    ))}
</div>

                <div className="input-container">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message..."
                    />
                    <button onClick={handleSendMessage}>Send</button>
                </div>
            </div>
        </div>
    </Layout>
    );
};

export default Chat;