import Head from "next/head";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function Home() {
  return (
    // 여기 dark일때 black인데 왜 Header 컴포넌트에는 영향이 없지?.
    <div className="bg-[#F3F2EF] dark:bg-black dark:text-white h-screen overflow-y-scroll md:space-y-6">
      <Head>
        <title>Feed | LinkedIn</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      {/* flexbox에선 gap을 쓰는게 좋다고??.. 함 알아보자 */}
      <main className="flex justify-center gap-x-5 px-4 sm:px-12">
        <div className="flex flex-col md:flex-row gap-5">
          <Sidebar />
          {/* feed */}
        </div>
        {/* widget */}
      </main>
    </div>
  );
}
