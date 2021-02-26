import { useAuthDispatch, useAuthState } from "../context/auth";
import { useRouter } from "next/router";
import { FaUser } from "react-icons/fa";
import classNames from "classnames"
import axios from "axios";

export default function Profile({user}) {
  const router = useRouter();
  const authDispatch = useAuthDispatch();

  const logoutUser = async () => {
    const res = await axios.get("/auth/logout");
    authDispatch("LOGOUT");
    router.push("/");
  };
  return (
    <div className="min-h-screen h-screen py-6  bg-primary-1 text-white">
      <div className="max-w-3xl m-auto py-8  md:border-pink-600 md:border-2 flex items-center justify-center flex-col space-y-5">
        <div className="bg-primary-4 w-32 h-32 rounded-full flex items-center justify-center">
          <FaUser size="80px" />
        </div>
        <h3 className="text-3xl flex items-center justify-center space-x-3">
          <div>{user.name}</div>
          <div
            className={classNames("w-4 h-4 rounded-full animate-ping", {
              "bg-green-400": user.isActive,
              "bg-red-400": !user.isActive,
            })}
          ></div>
        </h3>
        <h4 className="text-xl">{user.email}</h4>
        <h5 className="text-xl">
          Joind : {new Date(user.createdAt).toDateString()}
        </h5>
        {!user.isActive && <h5 className="text-xl">
          Last Seen : {new Date(user.lastSeen).toDateString()}
        </h5>
}
        <button
          onClick={() => logoutUser()}
          className="py-3 px-5 bg-yellow-500 text-yellow-100 rounded-md text-xl"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export const getServerSideProps = async ({ req, res }) => {
  try {
    const cookie = req.headers.cookie;
    if (!cookie) throw new Error("Missing auth token cookie");

    const res = await axios.get("/auth/me", { headers: { cookie } });

    if (!res.data) {
      res.writeHead(307, { Location: "/login" }).end();
    }
  
    return { props: { user: res.data.data.user } };
  } catch (err) {
    res.writeHead(307, { Location: "/login" }).end();
  }
};
