import { useSession, signOut } from "next-auth/react";
import React from "react";
// props를, 첫 글자가 대문자면 괄호가 아니라 <>이걸로 해준다.
// feed는 login했을 때 뜨는 아이콘이라고 ?? 아이콘이라던데., 컬러/xx는 opacity?랑 같은 효과를 주나보다.
function HeaderLink({ Icon, text, avatar, feed, active, hidden }) {
  const { data: session } = useSession();
  return (
    <div
      // cursor-pointer와 괄호사이에 띄어쓰기가 없으면 앞의 조건은 적용되지 않는다.
      className={`${
        hidden && "hidden md:inline-flex"
      } cursor-pointer flex flex-col justify-center items-center
      ${
        feed
          ? "text-black/60 hover:text-black dark:text-white/75 dark:hover:text-white lg:-mb-1.5 space-y-1 "
          : "text-gray-500 hover:text-gray-700"
        // !(important)는 덮어쓰기이다.
      } ${active && "!text-black dark:!text-white"}`}
      onClick={() => avatar && signOut()}
    >
      {avatar ? (
        <Icon className="!h-7 !w-7 lg:!-mb-1" src={session?.user?.image} />
      ) : (
        <Icon />
      )}
      <h4
        className={`text-sm ${
          feed && "hidden lg:flex justify-center w-full mx-auto"
        }`}
      >
        {text}
      </h4>
      {active && (
        // calc가 밑줄??
        <span className="hidden lg:inline-flex h-0.5 w-[calc(100%+20px)] bg-black dark:bg-white rounded-t-full" />
      )}
    </div>
  );
}

export default HeaderLink;
