import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";

export default function Form() {
    const navigate = useNavigate();
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [major, setMajor] = useState("");
    const [modal, setModal] = useState(false); // 모달 상태
    const [modalMessage, setModalMessage] = useState(""); // 모달 메시지

    // 모달 열기
    function showAlert(message) {
        setModalMessage(message);
        setModal(true);
    }

    // 모달 닫기
    function hideModal() {
        setModal(false);
    }

    // 데이터 삭제 (DELETE)
    function deleteDataFromJSONFile() {
        if (!id) {
            showAlert("ID를 입력하세요."); // ID가 없을 경우 메시지 표시
            return;
        }

        const xhr = new XMLHttpRequest();
        xhr.open("DELETE", `https://672818b6270bd0b97554501f.mockapi.io/api/v1/student/${id}`);
        xhr.setRequestHeader("content-type", "application/json; charset=UTF-8");
        xhr.send();
        xhr.onload = () => {
            if (xhr.status === 200) {
                showAlert("삭제 성공!"); // 삭제 성공 메시지 표시
            } else {
                showAlert("삭제 실패! 해당 ID를 찾을 수 없습니다."); // 삭제 실패 메시지
            }
        };
    }

    return (
        <div className="card p-4 mb-4">
            <div className="row g-3">
                <div className="col-md-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="ID"
                        value={id}
                        onChange={(e) => setId(e.target.value)} // ID 상태 업데이트
                    />
                </div>
                <div className="col-md-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)} // Name 상태 업데이트
                    />
                </div>
                <div className="col-md-3">
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Age"
                        value={age}
                        onChange={(e) => setAge(e.target.value)} // Age 상태 업데이트
                    />
                </div>
                <div className="col-md-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Major"
                        value={major}
                        onChange={(e) => setMajor(e.target.value)} // Major 상태 업데이트
                    />
                </div>
            </div>
            <div className="text-center mt-3">
                <button onClick={() => navigate("/list")} className="btn btn-primary me-2">
                    Get Data
                </button>
                <button onClick={() => navigate("/create")} className="btn btn-success me-2">
                    Create Data
                </button>
                <button onClick={() => {
                    if (!id) {
                        showAlert("ID를 입력하세요.");
                        return;
                    }
                    navigate(`/update/${id}`);
                }} className="btn btn-warning me-2">
                    Update Data
                </button>
                <button onClick={deleteDataFromJSONFile} className="btn btn-danger">
                    Delete Data
                </button>
            </div>

            {/* 모달 */}
            <Modal isOpen={modal} message={modalMessage} onClose={hideModal} />
        </div>
    );
}
