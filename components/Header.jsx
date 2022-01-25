import Image from "next/image";
import { useEffect, useState } from "react";
import GroupIcon from "@mui/icons-material/Group";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import ChatIcon from "@mui/icons-material/Chat";
import NotificationsIcon from "@mui/icons-material/Notifications";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AppsOutlinedIcon from "@mui/icons-material/AppsOutlined";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { Avatar } from "@mui/material";

import HeaderLink from "./HeaderLink";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

const spring = {
  type: "spring",
  stiffness: 700,
  damping: 30,
};

function Header() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme, theme } = useTheme();

  // After mounting, we have access to the theme, 이거때문에 로고가 늦게뜬다고?
  useEffect(() => setMounted(true), []);
  console.log("최근 테마", theme);

  // true면 로고가 화이트여야 하는데 안변한다. 내 생각엔 지금 false인데 콘솔창에 true로 뜨는거 같다., 일단 toggle까지 만들어서 onClick을 줘보자
  return (
    // within 저건 input field에서만 작용한다? search창을 클릭하면 아래 그림자가 생김
    <header className="sticky top-0 z-40 bg-white dark:bg-[#1D2226] flex items-center justify-around py-1.5 px-3 focus:focus-within:shadow-lg">
      {/* left */}
      <div className="flex items-center space-x-2 w-full max-w-xs">
        {/* left의 로고 이미지는 다크모드일때 하나, 아닐때 하나가 필요하다. */}
        {mounted && (
          <>
            {resolvedTheme === "dark" ? (
              <Image src="https://rb.gy/bizvqj" width={45} height={45} />
            ) : (
              <Image src="https://rb.gy/dpmd9s" width={55} height={55} />
            )}
          </>
        )}

        <div className="flex items-center space-x-1 dark:md:bg-gray-700 py-2.5 px-4 rounded w-full">
          <SearchRoundedIcon />
          <input
            type="text"
            placeholder="Search"
            // outline-none에 focus를 준 이유는 마우스로 클릭했을 때에도 아웃라인이 보이지 않게 하기 위해서이다.
            className="hidden md:inline-flex bg-transparent text-sm focus:outline-none placeholder-black/70
            dark:placeholder-white/75 flex-grow"
          />
        </div>
      </div>

      {/* right */}
      <div className="flex items-center space-x-6">
        <HeaderLink Icon={HomeRoundedIcon} text="Home" feed active />
        <HeaderLink Icon={GroupIcon} text="My Network" feed />
        <HeaderLink Icon={BusinessCenterIcon} text="Jobs" feed hidden />
        <HeaderLink Icon={ChatIcon} text="Messaging" feed />
        <HeaderLink Icon={NotificationsIcon} text="Notifications" feed />
        <HeaderLink Icon={Avatar} text="Me" feed avatar hidden />
        <HeaderLink Icon={AppsOutlinedIcon} text="Work" feed hidden />

        {/* dark mode toggle */}
        {mounted && (
          <div
            className={`bg-gray-600 flex items-center px-0.5 rounded-full h-6 w-12 cursor-pointer flex-shrink-0 relative ${
              // 이건 motion이 다크일땐 왼쪽에 있게하고, 아닐땐 오른쪽에 있게 한다.
              resolvedTheme === "dark" ? "justify-end" : "justify-start"
            }`}
            // dark모드를 눌렀을 때 동그라미가 라이트쪽으로 가서 달 모양이 보이게 하라, ->이렇게만해도 next theme animation이 적용된다. 즉 setTheme은 함수이다?
            onClick={() =>
              setTheme(resolvedTheme === "dark" ? "light" : "dark")
            }
          >
            <span className="absolute left-0">🌜</span>
            {/* 이거 하니까 그 동그라미가 생긴다. */}
            <motion.div
              className="w-5 h-5 bg-white rounded-full z-40"
              layout
              transition={spring}
            />

            <span className="absolute right-0.5">🌞</span>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
