import Image from "next/image";
import HeaderLink from "../components/HeaderLink.jsx";
import ExploreIcon from "@mui/icons-material/Explore";
import GroupIcon from "@mui/icons-material/Group";
import OndemandVideoSharpIcon from "@mui/icons-material/OndemandVideoSharp";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import Head from "next/head";
import { getProviders, signIn } from "next-auth/react";

function home({ providers }) {
  return (
    <div className="space-y-10 relative">
      <Head>
        <title>LinkedIn Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="flex justify-around items-center py-4">
        <div className="relative w-36 h-10 ">
          <Image src="https://rb.gy/vtbzlp" layout="fill" objectFit="contain" />
        </div>
        {/* divide-x는 sign in과 이모티콘들 사이에 선을 나눠준다.  */}
        <div className="flex items-center sm:divide-x divide-gray-300">
          <div className="hidden sm:flex space-x-8 pr-4">
            <HeaderLink Icon={ExploreIcon} text="Discover" />
            <HeaderLink Icon={GroupIcon} text="People" />
            <HeaderLink Icon={OndemandVideoSharpIcon} text="Learning" />
            <HeaderLink Icon={BusinessCenterIcon} text="Jobs" />
          </div>
          {/* div를 또 사용한 이유는 부모태그의 divide-gray-300때문이다, 또한 부모태그에 space-x-로 공간을 주지 않고 pl-4로 준 이유도 divide때문에 space-x가 먹히지 않는다고 하는데? ->굳이 16px로 준 이유는 아이콘들과 블럭 사이의 간격이랑 맞추려고 하나보다..*/}
          {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <div className="pl-4">
                <button
                  className="text-blue-700 font-semibold rounded-full border border-blue-700 px-5 py-1.5 transition-all hover:border-2"
                  onClick={() => signIn(provider.id, { callbackUrl: "/" })}
                >
                  Sign in
                </button>
              </div>
            </div>
          ))}
        </div>
      </header>
      {/* xl일때 row로 놓은 이유는 화면을 키웠을때 이미지와 나란히 놓기 위함이다. */}
      <main className="flex flex-col xl:flex-row items-center max-w-screen-lg mx-auto">
        <div className="space-y-6 xl:space-y-10">
          {/* leading-snug 이건 저 글자가 화면이 작아지면 두 줄로 되는데, 이때 마우스로 drag를 해보면 파란색이 안겹치는걸 볼 수 있다. */}
          <h1 className="text-3xl md:text-5xl text-amber-800/80 max-w-xl !leading-snug pl-4 xl:px-0">
            Welcome to your professional community
          </h1>
          <div className="space-y-4 ">
            <div className="intent">
              <h2 className="text-xl">Search for a job</h2>
              <ArrowForwardIosRoundedIcon className="text-gray-700" />
            </div>
            <div className="intent">
              <h2 className="text-xl">Find a person you know</h2>
              <ArrowForwardIosRoundedIcon className="text-gray-700" />
            </div>
            <div className="intent">
              <h2 className="text-xl">Learn a new skill</h2>
              <ArrowForwardIosRoundedIcon className="text-gray-700" />
            </div>
          </div>
        </div>
        <div className="relative xl:absolute w-80 h-80 xl:w-[650px] xl:h-[650px] top-14 right-5">
          {/* priority는 nextjs홈페이지에서 함 찾아보기 */}
          <Image src="https://rb.gy/vkzpzt" layout="fill" priority />
        </div>
      </main>
    </div>
  );
}

export default home;

// SSR(Server Side Rendering) ->모든 로그인 관련은 provider로 가져오는데, 그걸 server side에서 가져온다?, log로 provider를 찍어보면 1개의 오브젝트가 뜨는데, 안을 들여다보면 google이 나오는것을 볼 수 있다.
export async function getServerSideProps(context) {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}
