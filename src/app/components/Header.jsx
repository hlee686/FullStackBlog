import { useState, useEffect } from "react";
import "../../css/Header.css";
import { useRouter } from "next/router";

export default function Header() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loggedin, setLoggedin] = useState(true);
  const [modalLogin, setModalLogin] = useState(false);
  const [login,setLogin] = useState(false)

  const closeModal = () => {
    setIsModalOpen(false);
    setModalLogin(false)
  };

  const router = useRouter()

  const signUp = async () => {
    try {
      const res = await fetch(`api/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (res.ok) {
        console.log(res);
        setLoggedin(false)
        closeModal()
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  const signIn = async () => {
    try {
      const res = await fetch(`api/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (res.ok) {
        const json = await res.json();
        setLogin(true)
        closeModal()
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  const logout = () => {
    setLogin(false)
  }

  return (
    <div>
      <div style={{ textAlign: "right" }}>
       
          <button style={{ borderRadius: "20px" }} onClick={() => setIsModalOpen(true)}>
            회원가입
          </button>
        {!login ? (
          <button style={{ borderRadius: "20px" }} onClick={() => setModalLogin(true)}>
            로그인
          </button>
        ): (
          <>
          <button onClick={()=>router.push("/Write")} style={{borderRadius: "20px"}}>새 글 작성</button>
          <button onClick={logout}>로그아웃</button>
          </>
        )}
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <input type="text" placeholder="이메일 입력" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="text" placeholder="비밀번호 입력" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={() => signUp()}>회원가입하기</button>
          </div>
        </div>
      )}

      {modalLogin && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <input type="text" placeholder="이메일 입력" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="text" placeholder="비밀번호 입력" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={() => signIn()}>로그인하기</button>
          </div>
        </div>
      )}
    </div>
  );
}
