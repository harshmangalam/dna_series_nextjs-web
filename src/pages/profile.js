import { useAuthDispatch, useAuthState } from "../context/auth";
import { useRouter } from "next/router";
import { FaUser } from "react-icons/fa";
import classNames from "classnames";
import axios from "axios";
import useSWR from "swr";
import Head from "next/head";
export default function Profile() {
  const router = useRouter();
  const authDispatch = useAuthDispatch();

  const { data: user, error } = useSWR("/auth/me");

  const logoutUser = async () => {
    const res = await axios.get("/auth/logout");
    localStorage.removeItem("token");
    axios.defaults.headers["Authorization"] = "";
    authDispatch("LOGOUT");
    window.location.reload();
  };
  return (
    <div className="min-h-screen h-screen py-6  bg-primary-1 text-white">
      <Head>
        <title>{!user ? "Loading..." : user.data.user.name} | Profile</title>
        <meta
          name="description"
          content="Login and subscribe to my newsletter"
        ></meta>
      </Head>
      <div className="max-w-3xl px-6 m-auto py-8  md:border-pink-600 md:border-2 flex items-center justify-center flex-col space-y-5">
        <div className="bg-primary-4 w-32 h-32 rounded-full flex items-center justify-center">
          <FaUser size="80px" />
        </div>
        {!user ? (
          <div className="h-4 bg-yellow-400 rounded w-full"></div>
        ) : (
          <h3 className="text-3xl flex items-center justify-center space-x-3">
            <div>{user.data.user.name}</div>
            <div
              className={classNames("w-4 h-4 rounded-full animate-ping", {
                "bg-green-400": user.data.user.isActive,
                "bg-red-400": !user.data.user.isActive,
              })}
            ></div>
          </h3>
        )}
        {!user ? (
          <div className="h-4 bg-yellow-400 rounded w-3/4"></div>
        ) : (
          <h4 className="text-xl">{user.data.user.email}</h4>
        )}
        {!user ? (
          <div className="h-4 bg-yellow-400 rounded w-full"></div>
        ) : (
          <h5 className="text-xl">
            Joind : {new Date(user.data.user.createdAt).toDateString()}
          </h5>
        )}
        {!user ? (
          <div className="h-4 bg-yellow-400 rounded w-3/4"></div>
        ) : (
          !user.data.isActive && (
            <h5 className="text-xl">
              Last Seen : {new Date(user.data.user.lastSeen).toDateString()}
            </h5>
          )
        )}
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
