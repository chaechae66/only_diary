import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "../components/layout/Layout";
import CreateDiary from "../pages/createDiary";
import DiaryCardPage from "../pages/diaryCardPage";
import Intro from "../pages/intro";
import Login from "../pages/login";
import MyDiary from "../pages/myDiary";
import Page404 from "../pages/page404";
import PublicCardPage from "../pages/publicCardPage";
import SignUp from "../pages/signUp";
import UpdateDiary from "../pages/updateDiary";
import { PATH } from "./path";

function Router() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path={PATH.BASE} element={<Intro />} />
        <Route path={PATH.LOGIN} element={<Login />} />
        <Route path={PATH.SIGNUP} element={<SignUp />} />
        <Route path={PATH.CREATE} element={<CreateDiary />} />
        <Route path='/:uid' element={<MyDiary />} />
        <Route path='/:uid/:id' element={<DiaryCardPage />} />
        <Route path={PATH.PUBLIC}>
          <Route path=':id' element={<PublicCardPage />} />
        </Route>
        <Route path={PATH.UPDATE}>
          <Route path=':id' element={<UpdateDiary />} />
        </Route>
        <Route path={PATH.NOTFOUND} element={<Page404 />} />
      </Route>
    </Routes>
  );
}

export default Router;
