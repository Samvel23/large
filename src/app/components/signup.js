"use client";
import { useState } from "react";
import Head from "next/head";

export const SignUpPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    alert("Signup successful!");
  };

  return (
    <>
      <Head>
        <title>Sign Up</title>
        <meta
          name="description"
          content="Create an account to access exclusive features."
        />
      </Head>
      <section className="section">
        <div className="container">
          <div className="column is-half is-offset-one-quarter">
            <div className="box p-5" style={{ backgroundColor: "black" }}>
              <h1
                className="title has-text-centered"
                style={{ color: "white" }}
              >
                Create an Account
              </h1>
              {submitted ? (
                <div className="notification is-success">
                  Signup successful! Welcome, {formData.name}!
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="field">
                    <label className="label" style={{ color: "white" }}>
                      Name
                    </label>
                    <div className="control">
                      <input
                        className="input"
                        type="text"
                        name="name"
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
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
                      Sign Up
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
