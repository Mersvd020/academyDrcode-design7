import { useState } from "react";
import { useSkin } from "@hooks/useSkin";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { handleLogin } from "./store";
import { Facebook, Twitter, Mail, GitHub } from "react-feather";
import InputPasswordToggle from "@components/input-password-toggle";
import {
  Row,
  Col,
  CardTitle,
  CardText,
  Form,
  Label,
  Input,
  Button,
  Alert,
  Spinner
} from "reactstrap";

import illustrationsLight from "@src/assets/images/pages/login-v2.svg";
import illustrationsDark from "@src/assets/images/pages/login-v2-dark.svg";
import "@styles/react/pages/page-authentication.scss";

const Login = () => {
  const { skin } = useSkin();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [phoneOrGmail, setPhoneOrGmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const { loading, error } = useSelector(state => state.authentication);

  const source = skin === "dark" ? illustrationsDark : illustrationsLight;

  const onSubmit = async e => {
    e.preventDefault();

    if (!phoneOrGmail || !password) return;

    const result = await dispatch(
      handleLogin({
        phoneOrGmail,
        password,
        rememberMe,
      })
    );
    if (result.type === "authentication/login/fulfilled") {
      navigate("/home");
    }
  };

  return (
    <div className="auth-wrapper auth-cover">
      <Row className="auth-inner m-0">
        <Link className="brand-logo" to="/" onClick={e => e.preventDefault()}>
          <svg viewBox="0 0 139 95" height="28">
            <g fill="currentColor">
              <path d="M0 0h39L69 32l32-32h38v30c0 7-2 13-6 16L83 94H56L7 44C2 40 0 35 0 30V0z" />
            </g>
          </svg>
          <h2 className="brand-text text-primary ms-1">Vuexy</h2>
        </Link>

        <Col className="d-none d-lg-flex align-items-center p-5" lg="8">
          <div className="w-100 d-lg-flex align-items-center justify-content-center px-5">
            <img className="img-fluid" src={source} alt="Login Cover" />
          </div>
        </Col>

        <Col className="d-flex align-items-center auth-bg px-2 p-lg-5" lg="4">
          <Col className="px-xl-2 mx-auto" sm="8" md="6" lg="12">
            <CardTitle tag="h2" className="fw-bold mb-1">
              به دکتر کد گروه ویید خوش آمدید 👋
            </CardTitle>
            <CardText className="mb-2">
              با ورود به پنل ادمین ماجراجویی جدیدی را شروع کنید:)
            </CardText>

            {error && (
              <Alert color="danger">
                <div className="alert-body font-small-2">
                  <p className="mb-0">{error}</p>
                </div>
              </Alert>
            )}

            <Form className="auth-login-form mt-2" onSubmit={onSubmit}>
              <div className="mb-1">
                <Label className="form-label" for="login-email">
                  ایمیل یا شماره شما
                </Label>
                <Input
                  type="text"
                  id="login-email"
                  placeholder="john@example.com or 09123456789"
                  value={phoneOrGmail}
                  onChange={e => setPhoneOrGmail(e.target.value)}
                  autoFocus
                  disabled={loading}
                  required
                />
              </div>

              <div className="mb-1">
                <div className="d-flex justify-content-between">
                  <Label className="form-label" for="login-password">
                    رمز ورود
                  </Label>
                  <Link to="/forgot-password">
                    <small>رمز را فراموش کردید؟</small>
                  </Link>
                </div>
                <InputPasswordToggle
                  className="input-group-merge"
                  id="login-password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  disabled={loading}
                  required
                />
              </div>

              <div className="form-check mb-1">
                <Input
                  type="checkbox"
                  id="remember-me"
                  checked={rememberMe}
                  onChange={e => setRememberMe(e.target.checked)}
                  disabled={loading}
                />
                <Label className="form-check-label" for="remember-me">
                  Remember Me
                </Label>
              </div>

              <Button color="primary" block type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <Spinner size="sm" className="me-50" />
                    <span className="align-middle">بارگذاری...</span>
                  </>
                ) : (
                  "Sign in"
                )}
              </Button>
            </Form>

            <p className="text-center mt-2">
              <span className="me-25">اکانت نداری?</span>
              <Link to="/register">ساختن اکانت جدید</Link>
            </p>

            <div className="divider my-2">
              <div className="divider-text">یا</div>
            </div>

            <div className="auth-footer-btn d-flex justify-content-center">
              <Button color="facebook"><Facebook size={14} /></Button>
              <Button color="twitter"><Twitter size={14} /></Button>
              <Button color="google"><Mail size={14} /></Button>
              <Button color="github"><GitHub size={14} /></Button>
            </div>
          </Col>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
