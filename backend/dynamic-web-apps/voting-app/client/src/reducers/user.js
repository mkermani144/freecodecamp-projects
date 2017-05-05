const user = (state = [], action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        loggedIn: action.loggedIn,
        errorMessage: action.errorMessage,
      };
    default:
      return state;
  }
};

export default user;
