import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../../storage/action';
import './headerLogin.scss';
import avatar from '../app/avatar.png';

const HeaderLogin = ({ setLogOut, setLocalFn, userInfo, setCreateBolTrue, asyncArticles }) => {
  let user = JSON.parse(localStorage.getItem('user'));
  const localName = user.username || userInfo.username;
  const localImage = user.image || avatar;
  return (
    <header className="header">
      <Link to="/" className="header__title">
        Realworld Blog
      </Link>
      <ul className="header__list">
        <li className="header__item">
          <Link to="/new-article" onClick={() => setCreateBolTrue()} className="header__create">
            Create article
          </Link>
        </li>
        <li style={{ display: 'flex' }} className="header__item">
          <Link to="/profile" className="header__avatar">
            {localName}
            <img alt="avatar" className="user__image" src={localImage} />
          </Link>
        </li>
        <li className="header__item">
          <Link
            to="/"
            onClick={() => {
              localStorage.clear();
              setLocalFn(null);
              setLogOut();
              asyncArticles(1);
            }}
            className="header__button button--black"
          >
            Log Out
          </Link>
        </li>
      </ul>
    </header>
  );
};
const mapStateToProps = (state) => {
  return {
    userInfo: state.userInfo,
    arrayArticle: state.arrayArticle,
  };
};
export default connect(mapStateToProps, actions)(HeaderLogin);
