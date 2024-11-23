import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ListPage() {
    const [tempList, setTempList] = useState([]);

    const getList = () => {
        axios
            .get("https://672818b6270bd0b97554501f.mockapi.io/api/v1/student")
            .then((response) => {
                setTempList(response.data);
            })
            .catch((error) => {
                console.error("데이터를 가져오는 중 오류 발생:", error);
            });
    };

    useEffect(() => {
        getList();
    }, []);

    return (
        <div>
            <h1>학생 목록</h1>
            <div className="row"> 
                {tempList.map((student) => (
                    <div key={student.id} className="col-md-4 mb-4"> {/* 3개의 열로 나눔 */}
                        <div className="card p-3">
                            <h3>ID: {student.id}</h3>
                            <p>이름: {student.name}</p>
                            <p>나이: {student.age}</p>
                            <p>전공: {student.major}</p>
                        </div>
                    </div>
                ))}
            </div>
            <button onClick={getList} className="btn btn-primary mt-3">
                데이터 새로고침
            </button>
        </div>
    );
}
