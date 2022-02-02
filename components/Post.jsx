import { Avatar, IconButton } from "@mui/material";
import { useRecoilState } from "recoil";
import { modalState, modalTypeState } from "../atoms/modalAtom";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import { useState } from "react";
import { getPostState } from "../atoms/postAtom";

// modalPost는 글을 클릭했을 때 뜨는 화면이다, Modal.jsx에서 보내준다.
function Post({ post, modalPost }) {
  const [modalOpen, setModalOpen] = useRecoilState(modalState);
  const [showInput, setShowInput] = useState(false);

  const [modalType, setModalType] = useRecoilState(modalTypeState);
  const [postState, setPostState] = useRecoilState(getPostState);

  // string은 input에서 받고, n은 number로, 몇글자까지 보여줄 것인지 설정하는 것이다. 이건 아래에서 수정 가능
  const truncate = (string, n) =>
    string?.length > n ? string.substr(0, n - 1) + "...see more" : string;

  return (
    <div
      className={`bg-white dark:bg-[#1d2226] ${
        modalPost ? "rounded-r-lg" : "rounded-lg"
      } space-y-2 py-2.5 border border-gray-300 dark:border-none`}
    >
      <div className="flex items-center  px-2.5 cursor-pointer">
        <Avatar src={post.userImg} className="!h-10 !w-10 cursor-pointer" />
        <div className="mr-auto ml-2 leading-none">
          <h6 className="font-medium hover:text-blue-500 hover:underline">
            {post.username}
          </h6>
          <p className="text-sm dark:text-white/75 opacity-80">{post.email}</p>
          {/* Timeago stamp */}
        </div>
        {/* 오, 이거 하니까 옆에 ...누르면 임펙트생김 ㅋ 개이득 */}
        {modalPost ? (
          <IconButton onClick={() => setModalOpen(false)}>
            <CloseRoundedIcon className="dark:text-white/75 h-7 w-7" />
          </IconButton>
        ) : (
          <IconButton>
            <MoreHorizRoundedIcon className="dark:text-white/75 h-7 w-7" />
          </IconButton>
        )}
      </div>
      {/* word-break는 텍스트들을 줄을 바꾸면서 표시해야 할때 텍스트를 어떤식으로 줄바꿈 해줄지 정하는 속성. break-all : 문자 단위로 줄바꿈 - 문자 단위로 줄바꿈을 해주는 속성 문자를 강제로 줄바꿈을 해준다. */}
      {post.input && (
        <div className="px-2.5 break-all md:break-normal">
          {/* showInput은 글이 길어지면 ...see more로 뒀다가 그걸 클릭하면 풀로 보여주는 역할을 할것이다. =>truncate이지..*/}
          {modalPost || showInput ? (
            <p onClick={() => setShowInput(false)}>{post.input}</p>
          ) : (
            // 아니 고작 setShowInput을 true로 바꿨더니 이게 먹힌다고? ..아 ㅇㅋ, 여기서 true로 바꿔주면 showInput이 참이 되면서 위에 post.input이 되는 것이구나. 즉, see more(지금 showInput false상태)를 눌러 true로 만들고 저 위에 컴포넌트를 실행시키는 것!
            <p onClick={() => setShowInput(true)}>
              {truncate(post.input, 150)}
            </p>
          )}
        </div>
      )}
      {post.photoUrl && !modalPost && (
        <img
          src={post.photoUrl}
          alt=""
          className="w-full cursor-pointer"
          onClick={() => {
            setModalOpen(true);
            setModalType("gifYouUp");
            // post(input과 등등 정보)를 여기에 넣어주면서 사진을 클릭했을 때도 이것들이 함께 보이게 한다.(post는 props로 받아옴)
            setPostState(post);
          }}
        />
      )}
    </div>
  );
}

export default Post;
