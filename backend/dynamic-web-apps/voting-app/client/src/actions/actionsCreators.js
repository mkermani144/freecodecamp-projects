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
    pollID,
  };
};

const addOption = (pollID, options) => {
  return {
    type: 'ADD_OPTION',
    pollID,
    options,
  };
};

const vote = (pollID, choice) => {
  return {
    type: 'VOTE',
    pollID,
    choice,
  };
};

export addPoll;
export removePoll;
export addOption;
export vote;
