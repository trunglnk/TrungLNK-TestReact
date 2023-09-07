import React, { memo, useContext, useEffect, useRef, useState } from "react";
import { authContext } from "../../useContext/authContext";
import { GiHamburgerMenu } from "react-icons/gi";

const HeaderAd = memo(() => {
  const { Logout } = useContext(authContext);
  const dataUser = JSON.parse(localStorage.getItem("user"));

  const [isUserDropActive, setIsUserDropActive] = useState(false);
  const userContentRef = useRef(null);

  const handleUserInfoClick = () => {
    setIsUserDropActive(!isUserDropActive);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        userContentRef.current &&
        !userContentRef.current.contains(event.target)
      ) {
        setIsUserDropActive(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    await Logout();
  };

  return (
    <div className="headerAd">
      <div className="icon-menu">
        <button className="btn-icon-menu">
          <GiHamburgerMenu className="icon" />
        </button>
      </div>
      <div className="headerAd-content">
        <div className="headerAd-logo">
          <img alt="logo" src="http://wlp.howizbiz.com/static/img/logo.png" />
        </div>
        <div className="headerAd-title">
          <h1>
            HỆ THỐNG BÁO CÁO VỀ HIỆN TRẠNG LOÀI NGUY CẤP, QUÝ, HIẾM ĐƯỢC ƯU TIÊN
            BẢO VỆ
          </h1>
        </div>
      </div>
      <div className="headerAd-user">
        <div className="headerAd-userInfo">
          <button
            className="headerAd-userInfo-content"
            onClick={(e) => {
              e.stopPropagation();
              handleUserInfoClick();
            }}
          >
            <div className="headerAd-userInfo-logo">
            {dataUser.avatar_url ? <img alt="avatar" src={dataUser.avatar_url}/> : <span>B</span>}
              
            </div>
            <div className="headerAd-userInfo-name">{dataUser.name}</div>
          </button>
          <div
            className={`headerAd-userDrop ${
              isUserDropActive ? "headerAd-userDrop-active" : ""
            }`}
            ref={userContentRef}
          >
            <div className="headerAd-userDrop-content">
              <div className="headerAd-userDrop-logo">
                {dataUser.avatar_url ? (
                  <img alt="avatar" src={dataUser.avatar_url} />
                ) : (
                  <span>B</span>
                )}
              </div>
              <div className="headerAd-userDrop-name">{dataUser.name}</div>
              <div className="headerAd-userDrop-role">{dataUser.role.name}</div>
              <div className="headerAd-userDrop-action">
                <button className="headerAd-userDrop-profile">Hồ sơ</button>
                <button
                  color="#da2a1c"
                  colorhover="rgba(221, 0, 0, 0.2)"
                  class="headerAd-userDrop-logout"
                  onClick={() => handleLogout()}
                >
                  Đăng xuất
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default HeaderAd;
