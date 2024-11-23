import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TopBar from "./components/TopBar";
import ListPage from "./pages/ListPage";
import CreatePage from "./pages/CreatePage";
import UpdatePage from "./pages/UpdatePage";
import Form from "./components/Form";

function ShowList() {
    return (
        <Router>
            <div className="container mt-5">
                <TopBar />
                <Routes>
                    <Route path="/" element={<Form />} /> {/* 메인 화면 */}
                    <Route path="/list" element={<ListPage />} /> {/* 데이터 목록 */}
                    <Route path="/create" element={<CreatePage />} /> {/* 데이터 추가 */}
                    <Route path="/update/:id" element={<UpdatePage />} /> {/* 데이터 수정 */}
                </Routes>
            </div>
        </Router>
    );
}

export default ShowList;
