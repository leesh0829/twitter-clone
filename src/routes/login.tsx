/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { Form, Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import {
  Error,
  Input,
  Switcher,
  Title,
  Wrapper,
} from "../components/auth-components";
import GithubButton from "../components/github-btn";

export default function CreateAccount() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (isLoading || email === "" || password === "") return;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      if (!auth.currentUser?.emailVerified)
        throw setError("Email got Notverified, Check your email.");
      else if (auth.currentUser?.emailVerified) navigate("/");
    } catch (e) {
      if (e instanceof FirebaseError) {
        setError(e.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Wrapper>
        <Title>Login Account</Title>
        <Form onSubmit={onSubmit}>
          <Input
            onChange={onChange}
            name="email"
            placeholder="Email"
            value={email}
            type="email"
            required
          />
          <Input
            onChange={onChange}
            name="password"
            placeholder="Password"
            type="password"
            required
            value={password}
          />
          <Input
            type="submit"
            value={isLoading ? "Loading..." : "Create Account"}
          />
        </Form>
        {error !== "" ? <Error>{error}</Error> : null}
        <Switcher>
          Dont have an account?{" "}
          <Link to="/create-account">Create one&rarr;</Link>
          <br />
          Did you forgot your password?{" "}
          <Link to="/reset-password">Reset your Password&rarr;</Link>
        </Switcher>
        <GithubButton />
      </Wrapper>
    </div>
  );
}
