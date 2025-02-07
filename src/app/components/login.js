"use client";
import { useState } from "react";
import Head from "next/head";

export const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      formData.email === "test@example.com" &&
      formData.password === "password123"
    ) {
      setLoggedIn(true);
      setError("");
      alert("Login successful!");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="description" content="Log in to access your account." />
      </Head>
      <section className="section">
        <div className="container">
          <div className="column is-half is-offset-one-quarter">
            <div className="box p-5" style={{ backgroundColor: "black" }}>
              <h1
                className="title has-text-centered"
                style={{ color: "white" }}
              >
                Login to Your Account
              </h1>
              {loggedIn ? (
                <div className="notification is-success">
                  Login successful! Welcome back!
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  {error && (
                    <div className="notification is-danger">{error}</div>
                  )}
                  <div className="field">
                    <label className="label" style={{ color: "white" }}>
                      Email
                    </label>
                    <div className="control">
                      <input
                        className="input"
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="field">
                    <label className="label" style={{ color: "white" }}>
                      Password
                    </label>
                    <div className="control">
                      <input
                        className="input"
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="field">
                    <button className="button is-primary is-fullwidth has-background-warning">
                      Log In
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
