// styles
import styles from "./styles.module.scss";

// packages and hooks
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

// assets
import loginImg from "../../../public/assets/login-img.png";
import twitter from "../../../public/assets/twitter.png";
import linkedin from "../../../public/assets/likedin.png";
import google from "../../../public/assets/google.png";
import facebook from "../../../public/assets/facebook.png";

// regex for validation
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

  // validate form inputs
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

  // handle form submission
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

  // handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "emailOrUsername") {
      setEmailOrUsername(value);
      let error = "";
      if (!value.trim()) {
        error = "Username or email is required";
      } else if (!emailRegex.test(value) && value.includes("@")) {
        error = "Enter a valid email address";
      }
      setErrors((prev) => ({ ...prev, emailOrUsername: error }));
    }

    if (name === "password") {
      setPassword(value);
      let error = "";
      if (!value) {
        error = "Password is required";
      } else if (!passwordRegex.test(value)) {
        error =
          "Password must be at least 8 characters, include 1 capital letter, 1 number, and 1 symbol";
      }
      setErrors((prev) => ({ ...prev, password: error }));
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
              name="emailOrUsername"
              value={emailOrUsername}
              onChange={handleChange}
              isInvalid={!!errors.emailOrUsername}
            />
            <Form.Control.Feedback type="invalid">
              {errors.emailOrUsername}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              value={password}
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
            <Image src={google} alt="Google" width={48} height={48} />
          </div>
          <div className={styles.icon_btn}>
            <Image src={facebook} alt="Facebook" width={48} height={48} />
          </div>
          <div className={styles.icon_btn}>
            <Image src={linkedin} alt="LinkedIn" width={48} height={48} />
          </div>
          <Link href="#" className={styles.icon_btn}>
            <Image src={twitter} alt="Twitter" width={48} height={48} />
          </Link>
        </div>
      </div>
      <div className={styles.login_img}>
        <Image src={loginImg} alt="login" width={300} height={500} />
      </div>
    </div>
  );
};

export default Login;
