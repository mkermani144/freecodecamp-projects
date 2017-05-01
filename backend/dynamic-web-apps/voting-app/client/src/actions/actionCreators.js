const addPoll = (user, title, description, choices) => {
  return {
    type: 'ADD_POLL',
    user,
    title,
    description,
    choices,
  };
};

const removePoll = (user, pollID) => {
  return {
    type: 'REMOVE_POLL',
    user,
    index,
  };
};

const addChoice = (pollID, choice) => {
  return {
    type: 'ADD_CHOICE',
    index,
    choice,
  };
};

const vote = (pollID, choice) => {
  return {
    type: 'VOTE',
    index,
    choice,
  };
};

export addPoll;
export removePoll;
export addChoice;
export vote;
