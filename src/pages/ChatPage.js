import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";

const ChatPage = () => {
  const { otherUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);

  const userId = localStorage.getItem("user_id");

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (!userId || !otherUserId) return;

    const socketUrl = `ws://127.0.0.1:8000/ws/chat/${userId}/${otherUserId}/`;
    socketRef.current = new WebSocket(socketUrl);

    socketRef.current.onopen = () => console.log("✅ WebSocket connected");

    socketRef.current.onmessage = (e) => {
      const data = JSON.parse(e.data);
      setMessages((prev) => [...prev, data]);
      scrollToBottom();
    };

    socketRef.current.onclose = () => console.log("❌ WebSocket disconnected");

    return () => socketRef.current.close();
  }, [userId, otherUserId]);

  const handleSend = () => {
    if (text.trim() === "") return;

    socketRef.current.send(
      JSON.stringify({ message: text, sender: userId, receiver: otherUserId })
    );
    setText("");
  };

  return (
    <div style={{ maxWidth: "600px", margin: "20px auto" }}>
      <h2>Chat with User {otherUserId}</h2>
      <div
        style={{
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "5px",
          height: "400px",
          overflowY: "auto",
        }}
      >
        {messages.map((msg, idx) => (
          <p
            key={idx}
            style={{
              textAlign: msg.sender == userId ? "right" : "left",
              margin: "5px 0",
            }}
          >
            <strong>{msg.sender == userId ? "You" : `User ${msg.sender}`}:</strong>{" "}
            {msg.message}
          </p>
        ))}
        <div ref={messagesEndRef}></div>
      </div>
      <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
          style={{ flex: 1, padding: "10px" }}
        />
        <button onClick={handleSend} style={{ padding: "10px 20px" }}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
