import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import Layout from "./components/layout/Layout";
import HomePage from "./components/homepage/HomePage";
import AddTodo from "./pages/AddTodo";
import SingleTaskPage from "./pages/SingleTaskPage";

function App() {
  return (
    <Routes>
        <Route path={'/'} element={<Layout/>}>
            <Route index element={<HomePage/>}/>
            <Route path={'addTodo'} element={<AddTodo/>}/>
            <Route path={':id'} element={<SingleTaskPage/>}/>
        </Route>
    </Routes>
  );
}

export default App;
