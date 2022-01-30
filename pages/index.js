import { AnimatePresence } from "framer-motion";
import { getSession, useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { modalState, modalTypeState } from "../atoms/modalAtom";
import Feed from "../components/Feed";
import Header from "../components/Header";
import Modal from "../components/Modal";
import Sidebar from "../components/Sidebar";
export default function Home() {
  const [modalOpen, setModalOpen] = useRecoilState(modalState);

  const [modalType, setModalType] = useRecoilState(modalTypeState);

  // user router is 맨 아래 redirect이다 ..
  const router = useRouter();

  // 여긴 cilent side, 아래는 server side
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      // The user is not authenticated, handle it here.
      router.push("/home");
    },
  });

  return (
    // 여기 dark일때 black인데 왜 Header 컴포넌트에는 영향이 없지?.
    <div className="bg-[#F3F2EF] dark:bg-black dark:text-white h-screen overflow-y-scroll md:space-y-6">
      <Head>
        <title>Feed | LinkedIn</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      {/* flexbox에선 gap을 쓰는게 좋다고??.. 함 알아보자, justify-center요것때문에 feed가 중앙에 있다.*/}
      <main className="flex justify-center gap-x-5 px-4 sm:px-12">
        <div className="flex flex-col md:flex-row gap-5">
          <Sidebar />
          <Feed />
        </div>
        {/* widget */}

        <AnimatePresence>
          {modalOpen && (
            <Modal handleClose={() => setModalOpen(false)} type={modalType} />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

// SSR, 3:50:00분쯤에 설명한다.
export async function getServerSideProps(context) {
  // Check if the user is authenticated on the server ...
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/home",
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}
