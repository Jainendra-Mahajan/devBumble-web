import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { createSocketConnection } from '../utils/socket';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';


const Chat = () => {
    const targetId = useParams().targetId;
    const user = useSelector((store) => store.user);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const userId = user?._id;
    const firstName = user?.firstName;
    const lastName = user?.lastName;

    useEffect(() => {
        if (!userId) return;
        const socket = createSocketConnection();

        socket.emit("joinChat", { firstName, lastName, userId, targetId });

        socket.on("messageReceived", ({ firstName, text }) => {
            setMessages(prev => [...prev, { firstName, lastName, text }]);
        })

        return () => {
            socket.disconnect();
        }
    }, [userId, targetId]);


    useEffect(() => {
        fetchChat();
    }, [])
    const fetchChat = async () => {
        const res = await axios.get(BASE_URL + `chat/${targetId}`, { withCredentials: true });
        console.log(res?.data?.chat?.messages);


        const chatMessages = res?.data?.chat?.messages.map(msg => {
            const { senderId, text } = msg;
            return {
                firstName: senderId?.firstName,
                lastName: senderId?.lastName,
                text
            }
        });

        setMessages(chatMessages);
    }


    const sendMessage = () => {
        const socket = createSocketConnection();
        socket.emit("sendMessage", { firstName, userId, targetId, text: newMessage });
        setNewMessage("");
    }

    return (
        <div className="p-4 sm:p-6 md:p-10 max-w-3xl mx-auto">
            <h1 className="text-2xl font-semibold text-center text-white">Chat</h1>

            <div className="mt-2 mockup-window bg-base-200 border border-base-300 rounded-xl shadow-lg overflow-hidden">
                <div className="p-4 space-y-6 max-h-[60vh] overflow-y-auto">


                    {messages.map((msg, index) => (
                        <div key={index} className={"chat " + (user.firstName === msg.firstName ? "chat-end" : "chat-start")}>
                            <div className="chat-image avatar">

                                <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                    <img
                                        alt="Obi-Wan"
                                        src="https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
                                    />
                                </div>
                            </div>


                            <div className="chat-header text-white">
                                {msg.firstName} {msg.lastName}
                                <time className="text-xs opacity-50 ml-2">12:45</time>
                            </div>
                            <div className="chat-bubble bg-primary text-white">{msg.text}</div>
                            <div className="chat-footer text-xs opacity-60">Delivered</div>
                        </div>
                    ))}
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
