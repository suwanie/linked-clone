import Input from "./Input";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { handlePostState, useSSRPostsState } from "../atoms/postAtom";
function Feed({ posts }) {
  // posts는 ssr로 준비한 data를 가져온 것이다.
  const [realtimePosts, setRealtimePosts] = useState([]);
  const [handlePost, setHandlePost] = useRecoilState(handlePostState);
  // SSRPosts => Server Side Rendering Posts ..ㅇㅋ?
  const [useSSRPosts, setUseSSRPosts] = useRecoilState(useSSRPostsState);
  //우리는 이게 계속해서 request되는 쓸데없는 것을 원하지 않음, 그래서 두개의 recoilState를 써준다. 오로지 handlePost일때만 useEffect가 발생하게 한다, 이거 두개 하니까 갑자기 데이터가 realtimePosts에 담김; =>아, realtime이란게 글을 썼을때 refresh가 필요 없이 바로 렌더되는 것을 말하는 거구나, 그럼 계속해서 request란 계속 새로고침으로 가져와야 하는 것을 막는다는 것인가? (영어공부좀 하자 ㅠㅠ)
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/posts", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      // 이건 뭔지 모르겠군
      const responseData = await response.json();
      setRealtimePosts(responseData);
      setHandlePost(false);
      setUseSSRPosts(false);
    };

    fetchPosts();
  }, [handlePost]);

  // post.input은 form에서 볼 수 있다.->그냥 textarea
  return (
    <div className="space-y-6 pb-24 max-w-lg">
      <Input />
      {/* posts */}
      {/* 데이터를 가져왔으면 화면에 보여줘야지, imgUrl를 불러올때 img태그를 쓰면 뭐지? 그 내용하고 함께 렌더가 되지 않고 살짝 늦게된다, 이건 SSR이 아니라고? 그래서 index.js에서 get post on ssr를 해준다. */}
      {realtimePosts.map((post) => (
        <>
          <img src={post.photoUrl} alt="" />
          <div>{post.input}</div>
        </>
      ))}
    </div>
  );
}

export default Feed;
