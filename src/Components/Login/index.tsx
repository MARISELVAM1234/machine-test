import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./styles.module.scss";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import loginImg from "../../../public/assets/login-img.png";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex =
  /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;

const Login = () => {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [keepSignedIn, setKeepSignedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{
    emailOrUsername?: string;
    password?: string;
  }>({});
  const router = useRouter();

  const validate = () => {
    const newErrors: { emailOrUsername?: string; password?: string } = {};

    if (!emailOrUsername.trim()) {
      newErrors.emailOrUsername = "Username or email is required";
    } else if (
      !emailRegex.test(emailOrUsername) &&
      emailOrUsername.includes("@")
    ) {
      newErrors.emailOrUsername = "Enter a valid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (!passwordRegex.test(password)) {
      newErrors.password =
        "Password must be at least 8 characters, include 1 capital letter, 1 number, and 1 symbol";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      const userData = JSON.stringify({ emailOrUsername, password });
      if (keepSignedIn) {
        localStorage.setItem("loginData", userData);
      } else {
        sessionStorage.setItem("loginData", userData);
      }
      router.push("/home");
    }
  };

  return (
    <div className={styles.login_container}>
      <div className={styles.form_section}>
        <h1 className={styles.title}>Sign In</h1>
        <div className={styles.description}>
          <p className={styles.new_user}> New user?</p>
          <p className={styles.create_acc}>Create an account</p>
        </div>
        <Form onSubmit={handleSubmit} noValidate>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="text"
              placeholder="Username or email"
              value={emailOrUsername}
              onChange={(e) => setEmailOrUsername(e.target.value)}
              isInvalid={!!errors.emailOrUsername}
            />
            <Form.Control.Feedback type="invalid">
              {errors.emailOrUsername}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              isInvalid={!!errors.password}
            />
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check
              type="checkbox"
              label="Keep me signed in"
              checked={keepSignedIn}
              onChange={(e) => setKeepSignedIn(e.target.checked)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>

        <div className={styles.social_divider}>
          <span>Or Sign In With</span>
        </div>
        <div className={styles.social_icons}>
          <div className={styles.icon_btn}>
            <Image
              src="/icons/google.svg"
              alt="Google"
              width={40}
              height={40}
            />
          </div>
          <div className={styles.icon_btn}>
            <Image
              src="/icons/facebook.svg"
              alt="Facebook"
              width={40}
              height={40}
            />
          </div>
          <div className={styles.icon_btn}>
            <Image
              src="/icons/linkedin.svg"
              alt="LinkedIn"
              width={40}
              height={40}
            />
          </div>
          <div className={styles.icon_btn}>
            <Image
              src="/icons/twitter.svg"
              alt="Twitter"
              width={40}
              height={40}
            />
          </div>
        </div>
      </div>
      <div className={styles.login_img}>
        <Image src={loginImg} alt="login" width={300} height={500} />
      </div>
    </div>
  );
};

export default Login;
