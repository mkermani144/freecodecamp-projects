const addPoll = (user, title, description, choices) => {
  return {
    type: 'ADD_POLL',
    user,
    title,
    description,
    choices,
  };
};

const removePoll = (user, index) => {
  return {
    type: 'REMOVE_POLL',
    user,
    index,
  };
};

const addChoice = (index, choice) => {
  return {
    type: 'ADD_CHOICE',
    index,
    choice,
  };
};

const vote = (index, choice) => {
  return {
    type: 'VOTE',
    index,
    choice,
  };
};

export { addPoll, removePoll, addChoice, vote };
