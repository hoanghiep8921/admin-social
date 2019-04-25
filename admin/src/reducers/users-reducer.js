import cookie from 'react-cookies'

const initialState = {};

const configureUser = (state = initialState, action) => {
  switch (action.type) {
    case 'signIn': {
      const {user} = action;
      cookie.save('token', user.accessToken, { path: '/' })
      return {
        ...state,
        token:user.accessToken,
      };
    }
    case 'updateInfo' : {
      return {
        ...state,
        user: action.user,
      };
    }
    case 'signOut' : {
      cookie.remove('token', { path: '/' })
      return {
        ...state,
        token: null,
        user: null,
      };
    }
    default: {
      return state;
    }
  }
};

export default configureUser;