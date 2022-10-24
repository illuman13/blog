import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import * as actions from '../../storage/action';

import warning from './Vector.png';
import './modalDelete.scss';

const ModalDelete = ({ asyncArticlesDelete, arrayArticle, showModal }) => {
  return (
    <div className="modal__container">
      <div className="modal__decoration" />
      <div className="modal__text">
        <img src={warning} className="modal__icon" alt="warning" />
        <p>Are you sure to delete this article?</p>
      </div>
      <Link className="modal__button" onClick={() => showModal()}>
        No
      </Link>
      <Link className="modal__button button--blue" to={'/'} onClick={() => asyncArticlesDelete(arrayArticle.slug)}>
        Yes
      </Link>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    arrayArticle: state.arrayArticle,
  };
};
export default connect(mapStateToProps, actions)(ModalDelete);
