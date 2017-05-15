const addPoll = (id, user, title, description, choices) => ({
  type: 'ADD_POLL',
  id,
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

const logIn = (status, user='') => {
  switch (status) {
    case 1:
      return {
        type: 'LOGIN',
        loggedIn: true,
        user,
        errorMessage: '',
      };
    case 2:
      return {
        type: 'LOGIN',
        loggedIn: false,
        user,
        errorMessage: 'Wrong username or password. Try again.',
      };
    case 3:
      return {
        type: 'LOGIN',
        loggedIn: false,
        user,
        errorMessage: 'Something bad happened. Try again later.',
      };
    default:
      return {
        type: 'LOGIN',
        loggedIn: false,
        user,
        errorMessage: 'Unknown',
      };
  }
};

const logOut = () => ({ type: 'LOGOUT' });

export { addPoll, removePoll, addChoice, vote, logIn, logOut };
