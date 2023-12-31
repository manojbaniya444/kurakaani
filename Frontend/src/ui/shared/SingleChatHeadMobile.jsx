import React, { useEffect, useState } from "react";
import Avatar from "../components/Avatar";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { fetchMessages, currentChatWith } from "../../app/index";
import { getUserByUserId } from "../../utils/getUserByUserId";

const SingleChatHeadMobile = ({ chatData }) => {
  const [user, setUser] = useState();
  const [online, setOnline] = useState(false);
  const { authData, token, activeUsers } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const friendId = chatData?.participants.filter(
    (item) => item !== authData._id
  );

  // checking if the user is online or not
  useEffect(() => {
    const isUserOnline = activeUsers.some(
      (user) => user.userId === friendId[0]
    );
    setOnline(isUserOnline);
  }, [activeUsers]);

  // fetching the users data for the display in the chat list
  useEffect(() => {
    const fetchUser = async () => {
      const response = await getUserByUserId(friendId[0]);
      setUser(response);
    };
    fetchUser();
  }, [chatData]);

  // fetching the messages of the selected chat to display in the chat component
  const fetchChatHandler = async (chatData, receiverUserDetails) => {
    const chatId = chatData?._id;
    dispatch(fetchMessages(chatData?._id));
    dispatch(currentChatWith({ receiverUserDetails, chatId }));
  };

  return (
    <section
      className={`flex items-center flex-col cursor-pointer transition duration-300 transform hover:scale-105 min-w-[60px]`}
      // fetching the chat with chatData id and then setting the current chat receiver id and chat id
      onClick={() => fetchChatHandler(chatData, user)}
    >
      <div>
        <Avatar size="lg" src={user?.url} />
      </div>
      <p className="mt-1 font-medium text-xs md:text-sm text-gray-200">
        {user?.fullName.split(" ")[0]}
      </p>
      {online && (
        <div className="w-4 h-4 bg-green-500 rounded-full absolute bottom-4 right-2"></div>
      )}
    </section>
  );
};

export default SingleChatHeadMobile;
