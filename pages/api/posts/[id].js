import { connectToDatabase } from "../../../util/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const {
    method,
    query: { id },
  } = req;
  // req.query.id와 같은 것 id가 query object 안에 있어서 저렇게 구조분해를 하나보다.

  const { db } = await connectToDatabase();

  if (method === "DELETE") {
    try {
      //  _id: new ObjectId(id) 이건 post delete fnc에서 /${post._id}와 일치한다.
      await db.collection("posts").deleteOne({ _id: new ObjectId(id) });
      res.status(200).json({ message: "The post has been delete!" });
    } catch (err) {
      // json뒤에는 return이구나 ?..
      res.status(500).json(err);
    }
  }
}

// mongodb에 id에 이게 있다. 홈페이지 들어가보면 안다.
// delete response를 만들어준다.

// http://localhost:3000/api/posts/뭐든 들어와도 된다고?
