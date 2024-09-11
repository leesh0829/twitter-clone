import { useState } from "react";
import { auth } from "../firebase";
import { Error, Input, Title, Wrapper } from "../components/auth-components";
import { Form, Link } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { sendPasswordResetEmail } from "firebase/auth";

export default function ResetPassword() {
  const [isLoading, setLoading] = useState(false);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === "email") {
      setEmail(value);
    }
  };
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  if (isLoading) return;

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    try {
      sendPasswordResetEmail(auth, email);
      alert("Please, check your email.");
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
        <Form onSubmit={onSubmit}>
          <Title>
            <h1>Reset your password.</h1>
          </Title>
          <h2>Write your email</h2>
          <Input
            onChange={onChange}
            name="email"
            placeholder="Email"
            value={email}
            type="email"
            required
          />
          <Input
            type="submit"
            value={isLoading ? "Loading..." : "Reset Password"}
          />
          <Link to="/login">Back to Login</Link>
        </Form>
        {error !== "" ? <Error>{error}</Error> : null}
      </Wrapper>
    </div>
  );
}
