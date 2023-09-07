import React, { useContext, useState } from "react";
import { authContext } from "../../../useContext/authContext";
import "./Login.css";
import { FaRegUser } from "react-icons/fa";
import { BiLock } from "react-icons/bi";
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";

const Login = () => {
  const { Login } = useContext(authContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  const validateInputs = () => {
    setUsernameError("");
    setPasswordError("");

    let isValid = true;

    if (!username) {
      setUsernameError("Trường tên đăng nhập không được bỏ trống");
      isValid = false;
    }

    if (!password) {
      setPasswordError("Trường mật khẩu không được bỏ trống");
      isValid = false;
    } else if (password.length < 8) {
      setPasswordError("Trường mật khẩu phải có ít nhất 8 ký tự");
      isValid = false;
    }

    return isValid;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateInputs()) {
      return;
    }

    await Login({
      username: username,
      password: password,
    });
  };

  return (
    <div className="container-fluid d-flex flex-column full-width p-0">
      <div className="header-login-container">
        <div className="px-3">
          <img
            src={"http://wlp.howizbiz.com/static/img/logoColor.e5de23ce.png"}
            height="70px"
            alt=""
          />
        </div>
        <div className="text-header-login">
          HỆ THỐNG BÁO CÁO VỀ HIỆN TRẠNG LOÀI NGUY CẤP, QUÝ, HIẾM ĐƯỢC ƯU TIÊN
          BẢO VỆ
        </div>
      </div>
      <div className="flex-grow-1 d-flex align-center login-container">
        <div className="text-center form-login">
          <div className="full-width full-height px-4 py-4">
            <div className="full-width d-flex justify-content-center align-center">
              <div
                className="logo-form d-flex"
                style={{ maxWidth: "90px", cursor: "pointer" }}
              >
                <div
                  className="v-responsive-sizer"
                  style={{ paddingBottom: "120%" }}
                ></div>
                <div
                  className="img-logo"
                  style={{
                    backgroundImage:
                      "url('http://wlp.howizbiz.com/static/img/logo.png')",
                    backgroundPosition: "center center",
                  }}
                ></div>
                <div
                  className="v-responsive-content"
                  style={{ width: "100px" }}
                ></div>
              </div>
            </div>
            <div className="v-card-title">
              <div
                className="text-center full-width"
                style={{ fontSize: "1.5rem" }}
              >
                Đăng nhập
              </div>
            </div>
            <div className="v-card-subtitle">
              {" "}
              HỆ THỐNG BÁO CÁO VỀ HIỆN TRẠNG LOÀI NGUY CẤP, QUÝ, HIẾM ĐƯỢC ƯU
              TIÊN BẢO VỆ{" "}
            </div>
            <div className="v-card-text py-0">
              <form className="login-form">
                <div className="input-container">
                  <span className="input-icon">
                    <FaRegUser className="icon-login" />
                  </span>
                  <input
                    className="input-field"
                    type="text"
                    placeholder="Tên đăng nhập"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                {usernameError && (
                  <div className="error-message">{usernameError}</div>
                )}

                <div className="input-container">
                  <span className="input-icon">
                    <BiLock className="icon-login" />
                  </span>
                  <input
                    className="input-field"
                    type={passwordVisible ? "text" : "password"}
                    placeholder="Mật khẩu"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <span
                    className="input-icon password-icon"
                    onClick={togglePasswordVisibility}
                  >
                    {passwordVisible ? (
                      <AiFillEyeInvisible className="icon-login" />
                    ) : (
                      <AiFillEye className="icon-login" />
                    )}
                  </span>
                </div>

                {passwordError && (
                  <div className="error-message">{passwordError}</div>
                )}

                <button
                  className="login-button"
                  type="submit"
                  onClick={handleLogin}
                >
                  Đăng nhập
                </button>
                <div className="forgot-pass pt-2">Quên mật khẩu</div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
