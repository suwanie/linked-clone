import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import clientPromise from "../../../lib/mongodb";
export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.JWT_SECRET,
  adapter: MongoDBAdapter(clientPromise),
  pages: {
    signIn: "/home",
  },
  session: {
    strategy: "jwt",
    // maxAge
    // updateAge
  },
});

// nextauth에 mongodb를 연결해줬다. firebase에도 이렇게 연결해주는 건가?
// secret은  https://generate-secret.vercel.app/32에서 얻는다.
// signIn은 path 상관없다. 그냥 custom하면 됨, 여기선 로그인 정보가 없으면 home으로 보내기 때문에 이렇게 해준것,
// session에 maxAge와 updateAge 한 번 찾아보기
