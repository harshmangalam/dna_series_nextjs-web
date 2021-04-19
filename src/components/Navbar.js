import Link from "next/link";
import { useAuthState } from "../context/auth";
import { FaUser } from "react-icons/fa";
import { MdDashboard, MdMenu } from "react-icons/md";
import { RiLoginBoxLine } from "react-icons/ri";
import Sidebar from "./Sidebar";
import { useState } from "react";
export default function Navbar() {
  const { authenticated, user } = useAuthState();
  const [showSidebar, setShowSidebar] = useState(false);
  return (
    <div className="bg-primary-1">
      <div className="flex items-center justify-between max-w-7xl m-auto px-3 py-5 text-white">
        <div className="flex items-center space-x-6">
          <div className="lg:hidden">
            <MdMenu
              size="30px"
              className="cursor-pointer"
              onClick={() => setShowSidebar(!showSidebar)}
            />
          </div>
          <div className="w-30 h-12">
            <img src="/logo1.png" alt="image" className="w-full h-full" />
          </div>
        </div>

        <div className="lg:flex lg:items-center space-x-7 hidden ">
          <Link href="/">
            <a className="text-lg font-bold hover:text-pink-400">Home</a>
          </Link>
          <Link href="/about">
            <a className="text-lg font-bold hover:text-pink-400">About</a>
          </Link>
          <Link href="/contact">
            <a className="text-lg font-bold hover:text-pink-400">Contact</a>
          </Link>
        </div>

        {authenticated ? (
          <div className="lg:flex items-center space-x-5 hidden">
            <Link href="/profile">
              <a className="uppercase text-lg flex items-center space-x-2 hover:text-yellow-400">
                <FaUser />
                <span>{user.name}</span>
              </a>
            </Link>
            {user.role === "ADMIN" && (
              <Link href="/admin">
                <a className="uppercase text-lg hover:text-yellow-500 flex items-center space-x-2">
                  <MdDashboard />
                  <span>Dashboard</span>
                </a>
              </Link>
            )}
          </div>
        ) : (
          <div className="lg:flex items-center space-x-6 hidden">
            <Link href="/login">
              <a className="uppercase text-lg flex items-center space-x-2 hover:text-yellow-400">
                <RiLoginBoxLine />
                <span>Login</span>
              </a>
            </Link>
            <Link href="/register">
              <a className="uppercase text-lg flex items-center space-x-2 hover:text-yellow-400">
                <FaUser />
                <span>Join</span>
              </a>
            </Link>
          </div>
        )}
      </div>
      <div className={showSidebar ? "block" : "hidden"}>
        <Sidebar setShowSidebar={setShowSidebar} />
      </div>
    </div>
  );
}
