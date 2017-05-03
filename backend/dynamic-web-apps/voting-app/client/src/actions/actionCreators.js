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

const logIn = (username, password) => {
  // TODO: Do login
  return {
    type: 'LOGIN',
    loggedIn: false,
    errorMessage: 'Invalid credentials',
  };
};

export { addPoll, removePoll, addChoice, vote, logIn };
