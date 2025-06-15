import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { createSocketConnection } from '../utils/socket';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';

const Chat = () => {
    const { targetId } = useParams();
    const user = useSelector((store) => store.user);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [onlineUsers, setOnlineUsers] = useState({});
    const bottomRef = useRef(null);

    const userId = user?._id;
    const firstName = user?.firstName;
    const lastName = user?.lastName;

    useEffect(() => {
        if (!userId) return;

        const socket = createSocketConnection();

        socket.emit("joinChat", { firstName, lastName, userId, targetId });

        socket.on("messageReceived", ({ firstName, lastName, text, photoUrl }) => {
            setMessages(prev => [...prev, { firstName, lastName, text, photoUrl }]);
        });

        socket.on("onlineUsers", (users) => {
            const onlineMap = Object.fromEntries(users);
            setOnlineUsers(onlineMap);
        });

        return () => {
            socket.disconnect();
        };
    }, [userId, targetId]);

    useEffect(() => {
        fetchChat();
    }, [targetId]);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const fetchChat = async () => {
        try {
            const res = await axios.get(`${BASE_URL}chat/${targetId}`, { withCredentials: true });

            const chatMessages = res?.data?.chat?.messages.map(msg => {
                const { senderId, text } = msg;
                return {
                    firstName: senderId?.firstName,
                    lastName: senderId?.lastName,
                    text,
                    photoUrl: senderId?.photoUrl
                };
            });

            setMessages(chatMessages);
        } catch (err) {
            console.error("Error fetching chat:", err);
        }
    };

    const sendMessage = () => {
        const socket = createSocketConnection();
        socket.emit("sendMessage", { firstName, userId, targetId, text: newMessage });
        setNewMessage('');
    };

    const isTargetOnline = onlineUsers?.[targetId];

    return (
        <div className="p-4 sm:p-6 md:p-10 max-w-3xl mx-auto">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-semibold text-white">
                    Chat with {onlineUsers?.[targetId]?.firstName || "User"}
                </h1>
                <span className={`text-sm font-medium ${isTargetOnline ? "text-green-400" : "text-gray-400"}`}>
                    {isTargetOnline ? "Online" : "Offline"}
                </span>
            </div>

            <div className="mockup-window bg-base-200 border border-base-300 rounded-xl shadow-lg overflow-hidden">
                <div className="p-4 space-y-6 max-h-[60vh] overflow-y-auto">
                    {messages.map((msg, index) => (
                        <div key={index} className={`chat ${user.firstName === msg.firstName ? "chat-end" : "chat-start"}`}>
                            <div className="chat-image avatar">
                                <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                    <img
                                        alt="Avatar"
                                        src={user.firstName === msg.firstName ?
                                            user?.photoUrl : msg?.photoUrl}


                                    />
                                </div>
                            </div>
                            <div className="chat-header text-white">
                                {msg.firstName} {msg.lastName}
                            </div>
                            <div className="chat-bubble bg-primary text-white">{msg.text}</div>
                            <div className="chat-footer text-xs opacity-60">Delivered</div>
                        </div>
                    ))}
                    <div ref={bottomRef} />
                </div>
            </div>

            <div className="mt-4 flex items-center gap-2 mb-10">
                <input
                    type="text"
                    className="input input-bordered flex-grow"
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                />
                <button className="btn btn-primary" onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
};

export default Chat;
