import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

import Pag from '../pagination';
import Loader from '../loader';
import Like from '../app/like';
import avatar from '../app/avatar.png';
import * as actions from '../../storage/action';

import './articleList.scss';

const ArticleList = ({
  arrayArticles,
  resetLoader,
  asyncArticles,
  loader,
  asyncArticleLike,
  stateDelete,
  asyncArticleDislike,
}) => {
  const [page, setPage] = useState(Number(localStorage.getItem('page')));
  useEffect(() => {
    asyncArticles(page);
    return () => resetLoader();
  }, []);
  useEffect(() => {
    asyncArticles(page);
    return () => resetLoader();
  }, [page, stateDelete]);
  const titleSlice = (str) => {
    return str.split(' ').slice(0, 4).join(' ');
  };
  const setPageFn = (page) => setPage(page);
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
  const articles = arrayArticles.map(
    ({ title, favoritesCount, tagList, author, slug, favorited, createdAt, description }, index) => {
      return (
        <div key={slug}>
          <div className="article__container">
            <div className="article__header">
              <div className="title__container">
                <Link to={`/articles/${slug}`} className="title__name">
                  {titleSlice(title)}
                </Link>
                <button
                  className="title__button"
                  onClick={() => {
                    if (!favorited) {
                      asyncArticleLike(slug, page);
                    } else {
                      asyncArticleDislike(slug, page);
                    }
                  }}
                >
                  <Like setlike={favorited} />
                </button>
                <span className="title__count">{favoritesCount}</span>
                <br />
                {getTags(tagList)}
              </div>
              <div className="article__user">
                <div className="user__info">
                  <span className="user__name">{author.username}</span>
                  <span className="user__date">{format(new Date(createdAt), 'dd MMMMMM yyyy')}</span>
                </div>
                <img alt="avatar" className="user__image" src={author.image ? author.image : avatar} />
              </div>
            </div>
            <div className="article__main">
              <p className="article__text">{description}</p>
            </div>
          </div>
          {index === arrayArticles.length - 1 ? <Pag page={page} setPageFn={setPageFn} /> : null}
        </div>
      );
    }
  );
  const itemRender = loader ? articles : <Loader />;
  return <>{itemRender}</>;
};
const mapStateToProps = (state) => {
  return {
    arrayArticles: state.arrayArticles,
    loader: state.loader,
    arrayLike: state.arrayLike,
    stateDelete: state.delete,
  };
};
export default connect(mapStateToProps, actions)(ArticleList);
