import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function UpdatePage() {
    const { id } = useParams(); // URL에서 ID 가져오기
    const [name, setName] = useState(""); 
    const [age, setAge] = useState(""); 
    const [major, setMajor] = useState("");

    // 기존 데이터 불러오기
    useEffect(() => {
        fetch(`https://672818b6270bd0b97554501f.mockapi.io/api/v1/student/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setName(data.name);
                setAge(data.age);
                setMajor(data.major);
            })
            .catch((error) => {
                console.error("데이터 로드 중 오류 발생:", error);
            });
    }, [id]);

    // API에 실시간 업데이트 요청
    const updateField = (field, value) => {
        fetch(`https://672818b6270bd0b97554501f.mockapi.io/api/v1/student/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ [field]: value }), // 변경된 필드만 전송
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("데이터 업데이트 실패");
                }
                return response.json();
            })
            .then((data) => {
                console.log(`Updated ${field}:`, data[field]);
            })
            .catch((error) => {
                console.error("데이터 업데이트 중 오류 발생:", error);
            });
    };

    return (
        <div className="container mt-5">
            <h1>학생 정보 수정 (실시간 반영)</h1>
            <div className="form-group">
                <label>ID: {id}</label>
                <input
                    type="text"
                    className="form-control my-2"
                    placeholder="이름"
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value); // 상태 업데이트
                        updateField("name", e.target.value); // 서버 반영
                    }}
                />
                <input
                    type="number"
                    className="form-control my-2"
                    placeholder="나이"
                    value={age}
                    onChange={(e) => {
                        setAge(e.target.value); // 상태 업데이트
                        updateField("age", e.target.value); // 서버 반영
                    }}
                />
                <input
                    type="text"
                    className="form-control my-2"
                    placeholder="전공"
                    value={major}
                    onChange={(e) => {
                        setMajor(e.target.value); // 상태 업데이트
                        updateField("major", e.target.value); // 서버 반영
                    }}
                />
            </div>
        </div>
    );
}
