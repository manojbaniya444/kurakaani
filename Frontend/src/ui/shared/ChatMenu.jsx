import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GrNotification } from "react-icons/gr";
import { Avatar, IconButton, MobileMenu } from "../../ui";
import { AiOutlineMenu } from "react-icons/ai";

const ChatMenu = () => {
  const [mobileView, setMobileView] = useState(false);

  const { authData } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  return (
    <>
      {mobileView && <MobileMenu setMobileView={setMobileView} />}
      <div className="flex gap-2 p-3 bg-gray-300 items-center">
        {/* Menu Button Hidden on large devices and visible on small */}
        <div className="block md:hidden">
          <IconButton onClick={() => setMobileView(true)}>
            <AiOutlineMenu className="text-2xl" />
          </IconButton>
        </div>
        <input type="search" placeholder="search here" />
        <IconButton>
          <GrNotification className="text-2xl" />
        </IconButton>
        <div onClick={() => alert("Logout dispatch")}>
          <Avatar src={authData.url} />
        </div>
      </div>
    </>
  );
};

export default ChatMenu;
