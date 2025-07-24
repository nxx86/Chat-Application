import React from "react";
import { User } from "lucide-react";
import type { chatType } from "../../../types";
import Image from "next/image";

type chatItemProps = {
  chat: chatType;
  isActive: boolean;
  handleClick: (arg: string) => void;
};

export default function ChatItem({
  chat,
  isActive,
  handleClick,
}: chatItemProps) {
  return (
    <div
      onClick={() => handleClick(chat._id)}
      className={`flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-50 border-b border-gray-100 transition-colors ${
        isActive ? "bg-blue-50 border-l-4 border-l-blue-500" : ""
      }`}
    >
      {/* Profile Picture */}
      <div className="flex-shrink-0">
        {chat.avatar ? (
          <Image
            src={chat.avatar}
            alt={chat.name}
            className="w-12 h-12 rounded-full object-cover"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
            <User size={20} className="text-gray-500" />
          </div>
        )}
      </div>

      {/* Chat Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-medium text-gray-900 truncate">{chat.name}</h3>
          <span className="text-xs text-gray-500 flex-shrink-0">
            {chat.time}
          </span>
        </div>
        <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
      </div>

      {/* Unread indicator */}
      {chat.unread > 0 && (
        <div className="flex-shrink-0">
          <div className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {chat.unread}
          </div>
        </div>
      )}
    </div>
  );
}
