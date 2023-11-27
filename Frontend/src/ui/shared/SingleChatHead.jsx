import React, { useEffect, useState } from "react";
import { Avatar } from "../../ui";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { fetchMessages } from "../../app/index";
import { currentChatWith } from "../../app/chat/chatSlice";

const SingleChatHead = ({ chats: data }) => {
  const [user, setUser] = useState();
  const { authData, token } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const friendId = data?.participants.filter((item) => item !== authData._id);

  // fetching the users data for the display in the chat list
  useEffect(() => {
    (async () => {
      const response = await axios.get(
        `http://localhost:8080/api/user/single-user/${friendId[0]}`
      );
      setUser(response?.data.user);
    })();
  }, [data]);

  // fetching the messages of the selected chat to display in the chat component
  const fetchChatHandler = async (chatData, receiverName) => {
    dispatch(fetchMessages(chatData._id));
    dispatch(currentChatWith(receiverName));
  };

  return (
    <section
      className="bg-gray-600 flex gap-2 items-center p-1 rounded-md"
      onClick={() => fetchChatHandler(data, user?.fullName)}
    >
      <Avatar src={user?.url} />
      <div className="bg-gray-900 text-white rounded-md p-1 flex-1">
        <h3 className="font-medium text-lg">{user?.fullName}</h3>
        <p className="font-thin text-sm">Start chatting</p>
      </div>
    </section>
  );
};

export default SingleChatHead;