import { Timestamp } from "mongodb";
import { connectToDatabase } from "../../../util/mongodb";

export default async function handler(req, res) {
  const { method, body } = req;

  // connectToDatabase이게 비동기니까 await를 써줌
  const { db } = await connectToDatabase();

  //fetching logic
  if (method === "GET") {
    try {
      const posts = await db
        .collection("posts")
        .find()
        .sort({ timestamp: -1 })
        .toArray();
      res.status(200).json(posts);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  //story post to my db
  if (method === "POST") {
    try {
      //옛날 firebase랑 비슷?
      const post = await db
        .collection("posts")
        .insertOne({ ...body, timestamp: new Timestamp() });
      //이건 그 john doe? api/hello에 있는 그것하고 같다.
      res.status(201).json(post);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

// 5시 13분정도에 설명 .., status 200은 fetching일때 쓰고 201은 post일때 쓰는 코드인가보다.
