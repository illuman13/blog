export const checkOne = () => ({ type: 'ONE' });
export const checkTwo = () => ({ type: 'TWO' });
export const checkThree = () => ({ type: 'THREE' });
export const checkFour = () => ({ type: 'FOUR' });
export const resetArticle = () => ({ type: 'RESET_ARTICLE' });
export const resetLoader = () => ({ type: 'RESET_LOADER' });
export const setLogin = () => ({ type: 'LOGIN' });
export const setLogOut = () => ({ type: 'LOGOUT' });
export const errorSignUp = () => ({ type: 'ERROR__SIGN_UP' });
export const errorSignIn = () => ({ type: 'ERROR__SIGN_IN' });
export const errorEditProfile = () => ({
  type: 'ERROR_EDIT_PROFILE',
});

export const setCompleteEdit = () => ({ type: 'SET__COMPLETE_EDIT' });
export const setTrueCompleteCreate = () => ({
  type: 'SET__TRUE_COMPLETE_CREATE',
});
export const setFalseCompleteCreate = () => ({
  type: 'SET__FALSE_COMPLETE_CREATE',
});
export const setCreateBolFalse = () => ({
  type: 'SET__CREATE_BOL_FALSE',
});
export const setCreateBolTrue = () => ({
  type: 'SET__CREATE_BOL_TRUE',
});
export const setDelete = () => ({ type: 'SET__DELETE' });
export const setTrueCompleteEdit = () => ({ type: 'SET__TRUE_COMPLETE_EDIT' });
export const setFalseCompleteEdit = () => ({ type: 'SET__FALSE_COMPLETE_EDIT' });

export const asyncSignUp = (user) => {
  return async (dispatch) => {
    const res = await fetch('https://blog.kata.academy/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(user),
    });
    if (res.status === 422) {
      console.log(res);
      dispatch(errorSignUp());
      throw new Error('error');
    }
    if (res.ok) {
      const json = await res.json();
      localStorage.clear();
      localStorage.setItem('user', JSON.stringify(json.user));
      dispatch({ type: 'ASYNC__SIGN_UP', json });
      dispatch(setLogin());
    }
  };
};
export const asyncSignIn = (user) => {
  return async (dispatch) => {
    const res = await fetch('https://blog.kata.academy/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(user),
    });
    if (res.status === 422) {
      console.log(res);
      dispatch(errorSignIn());
      throw new Error('error');
    }
    if (res.ok) {
      const json = await res.json();
      localStorage.clear();
      localStorage.setItem('user', JSON.stringify(json.user));
      dispatch({ type: 'ASYNC__SIGN_IN', json });
      dispatch(setLogin());
    }
  };
};
export const asyncEditProfile = (user) => {
  return async (dispatch) => {
    const users = JSON.parse(localStorage.getItem('user'));
    const token = users ? users.token : null;
    const res = await fetch('https://blog.kata.academy/api/user', {
      method: 'PUT',
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(user),
    });
    if (res.status === 422) {
      console.log(res);
      dispatch(errorEditProfile());
      throw new Error('error');
    }
    if (res.ok) {
      const json = await res.json();
      localStorage.clear();
      localStorage.setItem('user', JSON.stringify(json.user));
      dispatch({ type: 'ASYNC__EDIT_PROFILE', json });
      dispatch(setLogin());
    }
  };
};
export const asyncCreateArticle = (article) => {
  return async (dispatch) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user ? user.token : null;
    const res = await fetch('https://blog.kata.academy/api/articles', {
      method: 'POST',
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(article),
    });
    if (res.status === 422) {
      throw new Error('error');
    }
    if (res.ok) {
      dispatch(setTrueCompleteCreate());
    }
  };
};
export const asyncEditArticle = (article, slug) => {
  return async (dispatch) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user ? user.token : null;
    const res = await fetch(`https://blog.kata.academy/api/articles/${slug}`, {
      method: 'PUT',
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(article),
    });
    if (res.status === 422) {
      throw new Error('error');
    }
    if (res.ok) {
      dispatch(setTrueCompleteEdit());
    }
  };
};
export const asyncArticlesDelete = (slug) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const token = user ? user.token : null;
  return async (dispatch) => {
    const res = await fetch(`https://blog.kata.academy/api/articles/${slug}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json;charset=utf-8',
      },
    });
    if (!res.ok) {
      throw new Error('error');
    }
    dispatch(setDelete());
  };
};

export const asyncArticles = (page) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const token = user ? user.token : null;
  return async (dispatch) => {
    const res = await fetch(`https://blog.kata.academy/api/articles?offset=${page}`, {
      method: 'GET',
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json;charset=utf-8',
      },
    });
    if (!res.ok) {
      throw new Error('error');
    }
    const json = await res.json();
    const results = json.articles;
    const bol = true;
    dispatch({ type: 'ASYNC__ARTICLES', results, bol });
  };
};
export const asyncArticle = (slug) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const token = user ? user.token : null;
  return async (dispatch) => {
    const res = await fetch(`https://blog.kata.academy/api/articles/${slug}`, {
      method: 'GET',
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json;charset=utf-8',
      },
    });
    if (!res.ok) {
      throw new Error('error');
    }
    const json = await res.json();
    const results = json.article;
    const bol = true;
    dispatch({ type: 'ASYNC__ARTICLE', results, bol });
  };
};
export const asyncArticleLike = (slug, page) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const token = user ? user.token : null;
  return async (dispatch) => {
    const res = await fetch(`https://blog.kata.academy/api/articles/${slug}/favorite`, {
      method: 'POST',
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json;charset=utf-8',
      },
    });
    if (!res.ok) {
      throw new Error('error');
    }
    dispatch(asyncArticles(page));
    dispatch(asyncArticle(slug));
  };
};
export const asyncArticleDislike = (slug, page) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const token = user ? user.token : null;
  return async (dispatch) => {
    const res = await fetch(`https://blog.kata.academy/api/articles/${slug}/favorite`, {
      method: 'DELETE',
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json;charset=utf-8',
      },
    });
    if (!res.ok) {
      throw new Error('error');
    }
    dispatch(asyncArticles(page));
    dispatch(asyncArticle(slug));
  };
};
