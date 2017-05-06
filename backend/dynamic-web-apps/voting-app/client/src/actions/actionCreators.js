const addPoll = (user, title, description, choices) => ({
  type: 'ADD_POLL',
  user,
  title,
  description,
  choices,
});

const removePoll = (user, index) => ({
  type: 'REMOVE_POLL',
  user,
  index,
});

const addChoice = (index, choice) => ({
  type: 'ADD_CHOICE',
  index,
  choice,
});

const vote = (index, choice) => ({
  type: 'VOTE',
  index,
  choice,
});

const logIn = (status) => {
  switch (status) {
    case 1:
      return {
        type: 'LOGIN',
        loggedIn: true,
        errorMessage: '',
      };
    case 2:
      return {
        type: 'LOGIN',
        loggedIn: false,
        errorMessage: 'Wrong username or password. Try again.',
      };
    case 3:
      return {
        type: 'LOGIN',
        loggedIn: false,
        errorMessage: 'Something bad happened. Try again later.',
      };
    default:
      return {
        type: 'LOGIN',
        loggedIn: false,
        errorMessage: 'Unknown',
      };
  }
};

const logOut = () => ({ type: 'LOGOUT' });

export { addPoll, removePoll, addChoice, vote, logIn, logOut };
