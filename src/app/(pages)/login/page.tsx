"use client";
import React, { useState } from "react";
import "./style.css"; // Import file CSS
import { useRouter } from "next/navigation";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const { push } = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "" || password === "") {
      setMessage("Kolom tidak boleh kosong.");
      return;
    }
    const payload = { username, password };

    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (data.success) {
        setMessage("Login successful!");
        push("/dashboard");
      } else {
        setMessage("Invalid credentials!");
      }
    } catch (error: unknown) {
      console.log(error);
      setMessage("Kesalahan pada server.");
    }
  };

  return (
    <div className="container">
      <h1 className="header">Login</h1>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="input"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input"
          required
        />
        <button type="submit" className="button">
          Login
        </button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default LoginPage;
