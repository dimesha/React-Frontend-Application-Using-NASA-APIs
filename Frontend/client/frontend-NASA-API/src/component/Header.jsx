import { Button, Navbar, TextInput } from "flowbite-react";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon } from "react-icons/fa";
import nasaLogo from "../assets/NASA_logo.png";

export default function Header() {
  const path = useLocation().pathname;
  return (
    <Navbar className="border-b-2">
      <div className="flex items-center flex-shrink-0 text-black mr-6">
        <img className="mr-3 h-11 sm:h-9" src={nasaLogo} />
        <span className="font-bold text-xl tracking-tight">
          NASA API READER
        </span>
      </div>

      <div className="flex gap-2 md:order-2">
        <Button className="w-12 h-10 hidden sm:inline" color="gray" pill>
          <FaMoon />
        </Button>
        <Link to="/sign-in">
          <Button gradientDuoTone="purpleToBlue" outline>
            Sign In
          </Button>
        </Link>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link active={path === "/"} as={"div"}>
          <Link to="/">Home</Link>
        </Navbar.Link>

        <Navbar.Link active={path === "/sign-in"} as={"div"}>
          <Link to="/sign-in">Sign In</Link>
        </Navbar.Link>

        <Navbar.Link active={path === "/sign-up"} as={"div"}>
          <Link to="/sign-up">Sign Up</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
