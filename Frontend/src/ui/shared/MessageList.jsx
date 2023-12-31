import React, { useEffect, useRef, useState } from "react";
import { Avatar, TypingAnimation } from "../../ui";
import { useDispatch, useSelector } from "react-redux";
import { useSocket } from "../../socketContext/Context";
import TimeAgo from "../components/TimeAgo";
import ChatSkeletonLoader from "../components/ChatSkeletonLoader";

const MessageList = ({ messages, setMessages, url }) => {
  const { authData } = useSelector((state) => state.user);
  const { currentChatId, messagesLoading } = useSelector((state) => state.chat);
  const { socket, friendIsTypingMessages } = useSocket();

  // scroll when messages changes
  const messagesContainerRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom of the messages container
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // socket to get new message
  useEffect(() => {
    if (socket === null) return;

    socket.on("getMessage", (messageDetails) => {
      const { sender, receiver, message, chatId } = messageDetails;
      if (currentChatId !== chatId) return;
      setMessages((prevMessages) => [...prevMessages, messageDetails]);
    });

    return () => {
      socket.off("getMessage");
    };
  }, [socket, currentChatId]);

  if (messages?.length === 0 && !messagesLoading) {
    return (
      <div className="flex-1 flex flex-col justify-center items-center relative">
        <p className="text-sm md:text-xl">Send message</p>
      </div>
    );
  }

  return (
    <div
      ref={messagesContainerRef}
      className="flex-1 flex gap-2 flex-col max-w-full p-2 scrollable-div scrollbar-style scroll-smooth relative"
    >
      {messagesLoading && <ChatSkeletonLoader />}
      {!messagesLoading &&
        messages?.map((item, index) => (
          <div
            key={index}
            className={
              authData._id !== item?.sender
                ? "self-start max-w-[70%] flex gap-2 items-center "
                : "self-end max-w-[70%]"
            }
          >
            {authData._id !== item?.sender && (
              // <p className="font-semibold">{friendName}</p>
              <Avatar src={url} />
            )}
            <div
              className={`break-all font-normal text-sm md:text-base rounded-sm p-1 ${
                authData._id !== item?.sender
                  ? "bg-gray-200  text-black"
                  : " bg-violet-900 text-white"
              }`}
            >
              <p>{item.message}</p>
              <p className="text-[10px]  font-thin text-gray-black">
                <TimeAgo createdAt={item.createdAt} />
              </p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default MessageList;
