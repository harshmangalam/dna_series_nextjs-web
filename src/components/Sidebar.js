import Link from "next/link";
import { useAuthState } from "../context/auth";
export default function Sidebar({ setShowSidebar }) {
  const { authenticated, user } = useAuthState();
  return (
    <div className="relative">
      <div className="absolute z-20  h-96 w-full bg-primary-1 shadow-md">
        <ul className="flex items-center justify-center flex-col text-xl">
          {links.map((link) => (
            <Link href={link.url} key={link.name}>
              <a onClick={() => setShowSidebar(false)}>
                <li className="px-4 py-3  text-gray-300 hover:text-white">
                  {link.name}
                </li>
              </a>
            </Link>
          ))}
          {!authenticated &&
            authLinks.map((link) => (
              <Link href={link.url} key={link.name}>
                <a onClick={() => setShowSidebar(false)}>
                  <li className="px-4 py-3  text-gray-300 hover:text-white">
                    {link.name}
                  </li>
                </a>
              </Link>
            ))}
          {authenticated && (
            <Link href="/profile">
              <a onClick={() => setShowSidebar(false)}>
                <li className="px-4 py-3  text-gray-300 hover:text-white">
                  {user.name}
                </li>
              </a>
            </Link>
          )}
          {authenticated && user.role == "ADMIN" && (
            <Link href="/admin">
              <a onClick={() => setShowSidebar(false)}>
                <li className="px-4 py-3  text-gray-300 hover:text-white">
                  Dashboard
                </li>
              </a>
            </Link>
          )}
        </ul>
      </div>
    </div>
  );
}

const links = [
  { name: "Home", url: "/" },
  { name: "About", url: "/about" },
  { name: "Contact", url: "/contact" },
];

const authLinks = [
  { name: "Login", url: "/login" },
  { name: "Register", url: "/register" },
];
