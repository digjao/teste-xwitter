import {  Route, Routes } from "react-router-dom";

import PostList from "../pages/PostList";


export const AppRoutes = () => (
    <Routes>
        <Route path="/posts" element={<PostList />} />
        <Route path="/login" element={<div>Teste</div>} />

    </Routes>
);
