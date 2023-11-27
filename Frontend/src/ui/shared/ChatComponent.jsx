import React from "react";
import { MessageList, SendMessageComponent } from "../../ui";
import { useSelector, useDispatch } from "react-redux";

const ChatComponent = () => {
  const { messages, currentChat } = useSelector((state) => state.chat);

  if (currentChat === "") {
    return (
      <p className="text-center mt-5 font-bold text-xl">Select one chat</p>
    );
  }

  return (
    <div className="py-1 px-2 bg-blue-200 flex flex-1 flex-col gap-1">
      <h1 className="text-center font-semibold text-xl md:text-2xl">
        {currentChat}
      </h1>
      <MessageList messages={messages} friendName={currentChat} />
      <SendMessageComponent />
    </div>
  );
};

export default ChatComponent;
