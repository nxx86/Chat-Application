"use client";

import React, { useState } from "react";
import ChatItem from "./chatItem";

export default function ContactWidnow() {
  const [activeChat, setActiveChat] = useState("");
  // Sample chat data
  const chats = [
    {
      _id: "1",
      name: "John Doe",
      avatar: null,
      lastMessage: "Hey! How are you doing today?",
      time: "2:30 PM",
      unread: 2,
    },
    {
      _id: "2",
      name: "Sarah Wilson",
      avatar: null,
      lastMessage: "Thanks for the help with the project!",
      time: "1:15 PM",
      unread: 0,
    },
    {
      _id: "3",
      name: "Mike Johnson",
      avatar: null,
      lastMessage: "Can we schedule a meeting for tomorrow?",
      time: "11:45 AM",
      unread: 1,
    },
  ];

  const handleChatClick = (chatId: string) => {
    setActiveChat(chatId);
  };

  return (
    <div className="w-80 h-screen bg-white border-r border-gray-200">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Messages</h2>
        <p className="text-sm text-gray-500 mt-1">
          {chats.length} conversations
        </p>
      </div>

      {/* Chat List */}
      <div className="overflow-y-auto h-full">
        {chats.map((chat) => (
          <ChatItem
            key={chat._id}
            chat={chat}
            isActive={activeChat === chat._id}
            handleClick={handleChatClick}
          />
        ))}
      </div>
    </div>
  );
}
