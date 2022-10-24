import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import showdown from 'showdown';
import { format } from 'date-fns';

import ModalDelete from '../modalDelete';
import Loader from '../loader';
import Like from '../app/like';
import avatar from '../app/avatar.png';
import * as actions from '../../storage/action';

import './articleSingle.scss';

const ArticleSingle = ({
  asyncArticle,
  loader,
  arrayArticle,
  setCreateBolFalse,
  asyncArticleLike,
  asyncArticleDislike,
}) => {
  const [showModal, setShowModal] = useState(false);
  const setShowModalFn = () => setShowModal(false);
  const converts = new showdown.Converter();
  const { slug } = useParams();
  useEffect(() => {
    asyncArticle(slug);
  }, [slug]);
  useEffect(() => {
    return () => setShowModal(false);
  }, []);
  const titleSlice = (str) => {
    return str.split(' ').slice(0, 4).join(' ');
  };
  let key = 100;
  const getTags = (arr) => {
    return arr.map((item) => {
      return (
        <button key={(key += 1)} className="title__tag">
          {item}
        </button>
      );
    });
  };
  const renderLink = (
    <div style={{ display: 'flex', position: 'relative' }}>
      <Link className="article__delete" onClick={() => setShowModal(true)}>
        Delete
      </Link>
      {showModal ? <ModalDelete showModal={setShowModalFn} /> : null}
      <Link className="article__edit" to="edit" onClick={() => setCreateBolFalse()}>
        Edit
      </Link>
    </div>
  );
  const convertBody = arrayArticle ? converts.makeHtml(arrayArticle.body) : null;
  const renderItems = (
    <div>
      {arrayArticle && (
        <div className="article__single">
          <div className="article__container">
            <div className="article__header">
              <div className="title__container">
                <span className="title__name">{titleSlice(arrayArticle.title)}</span>
                <button
                  className="title__button"
                  onClick={() => {
                    if (!arrayArticle.favorited) {
                      asyncArticleLike(slug);
                    } else {
                      asyncArticleDislike(slug);
                    }
                  }}
                >
                  <Like setlike={arrayArticle.favorited} />
                </button>
                <span className="title__count">{arrayArticle.favoritesCount}</span>
                <br />
                {getTags(arrayArticle.tagList)}
              </div>
              <div className="article__user">
                <div className="user__info">
                  <span className="user__name">{arrayArticle.author.username}</span>
                  <span className="user__date">{format(new Date(arrayArticle.createdAt), 'dd MMMMMM yyyy')}</span>
                </div>
                <img
                  alt="avatar"
                  className="user__image"
                  src={arrayArticle.author.image ? arrayArticle.author.image : avatar}
                />
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <div className="article__main" dangerouslySetInnerHTML={{ __html: convertBody }} />
              {JSON.parse(localStorage.getItem('user')).username !== arrayArticle.author.username ? null : renderLink}
            </div>
          </div>
        </div>
      )}
    </div>
  );
  const renderArticle = loader ? renderItems : <Loader />;
  return <>{renderArticle}</>;
};
const mapStateToProps = (state) => {
  return {
    arrayArticle: state.arrayArticle,
    loader: state.loader,
  };
};

export default connect(mapStateToProps, actions)(ArticleSingle);
