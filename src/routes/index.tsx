import {  Route, Routes } from "react-router-dom";

import PostList from "../pages/PostList";
import Register from "../pages/Register";
import Login from "../pages/Login";


export const AppRoutes = () => (
    <Routes>
        <Route path="/posts" element={<PostList />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

    </Routes>
);
