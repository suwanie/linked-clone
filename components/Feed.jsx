import Input from "./Input";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { handlePostState, useSSRPostsState } from "../atoms/postAtom";
import Post from "./Post";
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
      {!useSSRPosts
        ? realtimePosts.map((post) => <Post key={post._id} post={post} />)
        : posts.map((post) => <Post key={post._id} post={post} />)}
    </div>
    // 이렇게 만약, ssr에서 준비된 상태면 새로고침을 눌렀을 때, 깜빡거리는게 없다. 즉 겁나 빠르다. 즉 만약 ssr이 아니면 realtimePosts로 db에서 데이터를 불러오고(useEffect 실행), 이미 준비가 되었다면 posts로 가져온다(useEffect 노실행), 또한 이렇게 함으로써 새로고침을 하지 않아도 post를 하면 realtime으로 글이 뜨게된다.
  );
}

export default Feed;
