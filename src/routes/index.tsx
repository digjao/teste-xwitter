import {  Route, Routes } from "react-router-dom";
import ListaDePosts from "../pages/ListaDePosts";


export const AppRoutes = () => (
    <Routes>
        <Route path="/posts" element={<ListaDePosts />} />
        <Route path="/login" element={<div>Teste</div>} />

    </Routes>
);
