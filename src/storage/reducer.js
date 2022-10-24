const initialState = {
  arrayArticles: [],
  arrayArticle: null,
  loader: false,
  login: false,
  arrayLike: null,
  userInfo: {},
  errSignUp: false,
  errSignIn: false,
  errEditProfile: false,
  completeEdit: false,
  completeCreate: false,
  createBol: true,
  delete: false,
  editArticle: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ASYNC__ARTICLES': {
      return {
        ...state,
        arrayArticles: action.results,
        loader: action.bol,
      };
    }
    case 'ASYNC__ARTICLE': {
      return {
        ...state,
        arrayArticle: action.results,
        loader: action.bol,
      };
    }
    case 'RESET_ARTICLE': {
      return {
        ...state,
        arrayArticle: null,
      };
    }
    case 'RESET_LOADER': {
      return {
        ...state,
        loader: false,
      };
    }
    case 'ASYNC__ARTICLES__LIKE': {
      return {
        ...state,
        arrayLike: action.results,
      };
    }
    case 'LOGIN': {
      return {
        ...state,
        login: true,
      };
    }
    case 'LOGOUT': {
      return {
        ...state,
        login: false,
      };
    }
    case 'ASYNC__SIGN_UP': {
      return {
        ...state,
        userInfo: action.json,
        errSignUp: false,
      };
    }
    case 'ASYNC__EDIT_PROFILE': {
      return {
        ...state,
        completeEdit: true,
        userInfo: action.json,
        errEditProfile: false,
      };
    }
    case 'ASYNC__SIGN_IN': {
      return {
        ...state,
        userInfo: action.json.user,
        errSignIn: false,
      };
    }
    case 'ERROR__SIGN_UP': {
      return {
        ...state,
        errSignUp: true,
      };
    }
    case 'ERROR__SIGN_IN': {
      return {
        ...state,
        errSignIn: true,
      };
    }
    case 'ERROR_EDIT_PROFILE': {
      return {
        ...state,
        errEditProfile: true,
      };
    }
    case 'SET__COMPLETE_EDIT': {
      return {
        ...state,
        completeEdit: false,
      };
    }
    case 'SET__TRUE_COMPLETE_CREATE': {
      return {
        ...state,
        completeCreate: true,
      };
    }
    case 'SET__FALSE_COMPLETE_CREATE': {
      return {
        ...state,
        completeCreate: false,
      };
    }
    case 'SET__CREATE_BOL_FALSE': {
      return {
        ...state,
        createBol: false,
      };
    }
    case 'SET__CREATE_BOL_TRUE': {
      return {
        ...state,
        createBol: true,
      };
    }
    case 'SET__DELETE': {
      return {
        ...state,
        delete: !state.delete,
      };
    }
    case 'SET__TRUE_COMPLETE_EDIT': {
      return {
        ...state,
        editArticle: true,
      };
    }
    case 'SET__FALSE_COMPLETE_EDIT': {
      return {
        ...state,
        editArticle: false,
      };
    }
    default:
      return state;
  }
};
export default reducer;
