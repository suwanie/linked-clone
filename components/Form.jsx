import { useState } from "react";

function Form() {
  const [input, setInput] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");

  const uploadPost = async (e) => {
    e.preventDefault();
  };

  return (
    // flex, flex-col를 주니, textarea의 width가 늘어났다. 왜 갑자기 div의 width full이 되는거지?? =>저번엔 안되더니?
    <form className="flex flex-col relative space-y-2 text-black/80 dark:text-white/75">
      <textarea
        rows="4"
        placeholder="What do you want to talk about?"
        className=" bg-transparent focus:outline-none dark:placeholder-white/75"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <input
        type="text"
        placeholder="Add a phote URL(optional)"
        // truncate는 내용이 div를 넘어가면 ...으로 표시된다. 여기선 placeholder 내용이 ...으로 표시됨,
        className="bg-transparent focus:outline-none truncate max-w-xs md:max-w-sm"
        value={photoUrl}
        onChange={(e) => setPhotoUrl(e.target.value)}
      />

      {/* absol에 부모태그(relative)의 처음엔, 상단 왼쪽에 붙었다가 bottom 0=> 가장 아래로 내리고, right 0=> 가장 오른쪽으로 이동시킨다. */}
      {/* disabled로 버튼을 못누르게 하고있다. trim으로 그냥 내용없는 게시물도 안되게끔 해준다.*/}
      <button
        className="absolute bottom-0 right-0 font-medium bg-blue-400 hover:bg-blue-500 disabled:text-black/40 disabled:bg-white/75 disabled:cursor-not-allowed text-white rounded-full px-3.5 py-1"
        disabled={!input.trim()}
        type="submit"
        onClick={uploadPost}
      >
        Post
      </button>
    </form>
  );
}

export default Form;
// modal를 켰을 때 글을 쓰는 부분,
// modal에 글 내용이 없으면 post를 아예 못하게 할 수 있다.
// 5:00:00부터 post uoload에 관해 한다.
