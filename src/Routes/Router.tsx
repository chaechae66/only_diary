import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "../components/layout/Layout";
import WriteDiary from "../pages/WriteDiary";
import ShowDiary from "../pages/ShowDiary";
import Intro from "../pages/Intro";
import Login from "../pages/Login";
import MyDiaryList from "../pages/MyDiaryList";
import Page404 from "../pages/Page404";
import SignUp from "../pages/SignUp";
import { PATH } from "./path";

function Router() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path={PATH.BASE} element={<Intro />} />
        <Route path={PATH.LOGIN} element={<Login />} />
        <Route path={PATH.SIGNUP} element={<SignUp />} />
        <Route path={PATH.CREATE} element={<WriteDiary />} />
        <Route path={PATH.PUBLIC}>
          <Route path=':id' element={<ShowDiary />} />
        </Route>
        <Route path='/:uid' element={<MyDiaryList />} />
        <Route path='/:uid/:id' element={<ShowDiary />} />
        <Route path={PATH.UPDATE}>
          <Route path=':id' element={<WriteDiary />} />
        </Route>
        <Route path={PATH.NOTFOUND} element={<Page404 />} />
      </Route>
    </Routes>
  );
}

export default Router;
