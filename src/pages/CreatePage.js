import React, { useState, useRef } from "react";
import Modal from "../components/Modal"; // 모달 컴포넌트 가져오기

export default function CreatePage() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [major, setMajor] = useState("");
  const [modal, setModal] = useState(false); // 모달 상태
  const [modalMessage, setModalMessage] = useState(""); // 모달 메시지

  // useRef를 이용해 input 참조
  const nameRef = useRef(null);
  const ageRef = useRef(null);
  const majorRef = useRef(null);

  // 모달 열기
  function showAlert(message) {
    setModalMessage(message);
    setModal(true);
  }

  // 모달 닫기
  function hideModal() {
    setModal(false);
  }

  // 데이터 생성 요청
  const handleCreate = () => {
    if (!name) {
      showAlert("이름을 입력하세요.");
      nameRef.current.focus(); // 이름 입력창에 포커스
      return;
    }
    if (!age || isNaN(age) || age <= 0) {
      showAlert("유효한 나이를 입력하세요.");
      ageRef.current.focus(); // 나이 입력창에 포커스
      return;
    }
    if (!major) {
      showAlert("전공을 입력하세요.");
      majorRef.current.focus(); // 전공 입력창에 포커스
      return;
    }

    fetch("https://672818b6270bd0b97554501f.mockapi.io/api/v1/student", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, age, major }),
    })
      .then((response) => {
        if (response.ok) {
          showAlert("데이터가 성공적으로 추가되었습니다.");
        } else {
          showAlert("데이터 추가에 실패했습니다.");
        }
      })
      .catch((error) => {
        console.error("데이터 추가 중 오류 발생:", error);
        showAlert("서버 오류로 인해 데이터를 추가할 수 없습니다.");
      });
  };

  return (
    <div className="container mt-5">
      <h1>학생 추가</h1>
      <input
        type="text"
        placeholder="이름"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="form-control my-2"
        ref={nameRef} // ref 추가
      />
      <input
        type="number"
        placeholder="나이"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        className="form-control my-2"
        ref={ageRef} // ref 추가
      />
      <input
        type="text"
        placeholder="전공"
        value={major}
        onChange={(e) => setMajor(e.target.value)}
        className="form-control my-2"
        ref={majorRef} // ref 추가
      />
      <button onClick={handleCreate} className="btn btn-success">
        추가
      </button>
      <Modal isOpen={modal} message={modalMessage} onClose={hideModal} />
    </div>
  );
}
