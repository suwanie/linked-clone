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
import { connectToDatabase } from "../util/mongodb";

export default function Home({ posts }) {
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
          <Feed posts={posts} />
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

  // Get posts on SSR
  const { db } = await connectToDatabase();
  const posts = await db
    .collection("posts")
    .find()
    .sort({ timestamp: -1 })
    .toArray();

  // Get google news api, 오른쪽에 뜨는 news들

  return {
    props: {
      session,

      // ssr로 준비해놓고 한방에 다 같이 띄우기 위함
      posts: posts.map((post) => ({
        // _이건 monogodb에 _id로 저장하기 때문
        _id: post._id.toString(),
        input: post.input,
        photoUrl: post.photoUrl,
        username: post.username,
        email: post.email,
        userImg: post.userImg,
        createAt: post.createAt,
      })),
    },
  };
}
