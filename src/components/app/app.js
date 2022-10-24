import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CreateArticle from '../createArticle';
import ArticleList from '../articleList';
import ArticleSingle from '../articleSingle';
import HeaderLogin from '../headerLogin';
import HeaderUnLogin from '../headerUnLogin';
import SignUpForm from '../signUpForm';
import LoginForm from '../loginForm';
import EditProfileForm from '../editProfileForm';

import './app.scss';

const App = ({ login }) => {
  const [local, setLocal] = useState(null);
  useEffect(() => {
    setLocal(localStorage.getItem('user'));
  }, [localStorage.getItem('user')]);
  const setLocalFn = (state) => {
    return setLocal(state);
  };
  return (
    <>
      {login || local ? <HeaderLogin setLocalFn={setLocalFn} /> : <HeaderUnLogin />}
      <main>
        <Routes>
          <Route path="/" element={<ArticleList />} />
          <Route path="/new-article" element={<CreateArticle />} />
          <Route path="/:slug/edit" element={<CreateArticle />} />
          <Route path="/:slug" element={<ArticleSingle />} />
          <Route path="/sign-in" element={<LoginForm />} />
          <Route path="/sign-up" element={<SignUpForm />} />
          <Route path="/profile" element={<EditProfileForm />} />
        </Routes>
      </main>
      <footer className="footer" />
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    login: state.login,
  };
};
export default connect(mapStateToProps, null)(App);
