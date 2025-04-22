import React, { useCallback } from "react";
import logo from "../../assets/logowithout3.png";
import { Button } from "../../components";
import icons from "../../ultils/icon";
import { useNavigate } from "react-router-dom";
import { path } from "../../ultils/constant";

const { AiOutlinePlus } = icons;

const Header = () => {
  const navigate = useNavigate();
  const goLogin = useCallback(() => {
    navigate(path.LOGIN);
  }, ['']);

  return (
    <div className="w-full flex justify-center">
      <div className="w-[1100px] flex items-center justify-between">
        <img
          src={logo}
          alt="logo"
          className="w-[240px] h-[70px] object-contain"
        />
        <div className="flex items-center gap-1">
          <span>FriendHome.com Hello World!</span>
          <Button
            text="Login"
            textColor="text-white"
            bgColor="bg-blue-500"
            onClick={goLogin}
          />
          <Button
            text="Sign Up"
            textColor="text-white"
            bgColor="bg-blue-500"
            onClick={goLogin}
          />
          <Button
            text="New Feed"
            textColor="text-white"
            bgColor="bg-red-500"
            IcAfter={AiOutlinePlus}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
