import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useMutation } from "react-query";
import { v4 as uuidv4 } from "uuid";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [sessionId] = useState(uuidv4());

  const sendChat = async (message) => {
    const { data } = await axios.post("/api/chatgrammar", {
      prompt: message,
      sessionId: sessionId,
    });
    return data.response;
  };

  const mutation = useMutation(sendChat);

  const bottomRef = useRef();

  useEffect(() => {
    bottomRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessages((prev) => [
      ...prev,
      { message: message, response: "Loading...", botResponse: false },
    ]);
    setMessage("");
    const response = await mutation.mutateAsync(message);
    setMessages((prev) => [
      ...prev.slice(0, prev.length - 1),
      { message: message, response: response, botResponse: true },
    ]);
  };

  // Function to determine text direction
  const getTextDirection = (text) => {
    // Regex to match Arabic characters
    const arabicRegex = /[\u0600-\u06FF]/;

    // Check if text contains Arabic characters
    return arabicRegex.test(text) ? "rtl" : "ltr";
  };

  return (
    <div className="container h-screen flex flex-col bg-gray-100 text-gray-900 px-6 py-4 mx-auto">
      <h1 className="text-4xl font-bold mb-4 text-center">اعراب نحوي</h1>
      <div className="flex flex-col flex-1 w-full overflow-auto pb-10">
        {messages.map((message, index) => (
          <div key={index} className="w-full my-2">
            <div className="p-3 bg-blue-200 rounded-lg text-black" style={{ direction: getTextDirection(message.message) }}>
              {message.message}
            </div>
            <div
              className="p-3 bg-blue-300 rounded-lg text-black mt-1 whitespace-pre-wrap"
              style={{ direction: getTextDirection(message.response) }}
            >
              {message.response}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-full py-2 flex items-center justify-center"
      >
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-3/4 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
          placeholder=" اكتب العبارة لإعربها..."
          style={{direction: "rtl"}}
        />
        <button
          type="submit"
          className="w-1/4 ml-2 p-3 bg-blue-500 text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent hover:bg-blue-600"
        >
          إرسال
        </button>
      </form>
    </div>
  );
}
