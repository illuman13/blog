import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../../storage/action';
import './headerUnLogin.scss';

const HeaderUnLogin = () => {
  return (
    <header className="header">
      <Link to="/" className="header__title">
        Realworld Blog
      </Link>
      <ul className="header__list">
        <li className="header__item">
          <Link to="/sign-in" className="header__button">
            Sign In
          </Link>
        </li>
        <li className="header__item">
          <Link to="/sign-up" className="header__button button--green">
            Sign Up
          </Link>
        </li>
      </ul>
    </header>
  );
};
export default connect(null, actions)(HeaderUnLogin);
