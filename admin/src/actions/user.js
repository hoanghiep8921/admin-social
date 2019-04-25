export const signIn = (token) => {
    return {
      type: 'signIn',
      token,
    };
  };
  
  export const signOut = () => {
    return {
      type: 'signOut',
    };
  };
  
  export const updateInfo = (info) => {
    return {
      type: 'updateInfo',
      info,
    };
  };

  