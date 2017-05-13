const user = (state = [], action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        loggedIn: action.loggedIn,
        user: action.user,
        errorMessage: action.errorMessage,
      };
    case 'LOGOUT':
      return {
        ...state,
        loggedIn: false,
        errorMessage: '',
      };
    default:
      return state;
  }
};

export default user;
