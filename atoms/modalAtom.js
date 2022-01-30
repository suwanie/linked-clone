import { atom } from "recoil";

export const modalState = atom({
  key: "modalState",
  default: false,
});

export const modalTypeState = atom({
  key: "modalTypeState",
  default: "dropIn",
});

/* 첫 번째 것은 
const [modal, setModal] = useState(false)
와 같다 */
