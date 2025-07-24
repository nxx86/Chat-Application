"use client";
import { useEffect, useState } from "react";
import ChatWindow from "./components/chatWindow";
import ContactWidnow from "./components/contactWindow";

type user = {
  name: string;
  _id: string;
  __v?: number;
};
export default function Home() {
  const [users, setUsers] = useState<user[]>([]);
  useEffect(() => {
    const getUsers = async () => {
      const response = await fetch("http://localhost:3500/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);
      setUsers(data);
    };
    getUsers();
    console.log(users);
  }, []);

  return (
    <>
      <div className="flex">
        <ContactWidnow />
        <ChatWindow />
      </div>
    </>
  );
}
