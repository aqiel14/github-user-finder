import Head from "next/head";
import { useRef, useState } from "react";
import User from "../components/User";

export default function Home() {
  const inputRef = useRef();

  const [username, setUsername] = useState("aqiel14");

  const handleSubmit = (e) => {
    e.preventDefault();
    const inputUsername = inputRef.current.value;
    if (!inputUsername.trim()) return;

    setUsername(inputUsername);
    e.target.reset();
  };
  return (
    <div className="flex flex-col justify-center min-h-screen">
      <User username={username} />
      <form onSubmit={handleSubmit} className="self-center">
        <input
          ref={inputRef}
          type="search"
          placeholder="enter github username"
          className="mt-8 p-4 px-96 text-3xl"
        />
      </form>
    </div>
  );
}
