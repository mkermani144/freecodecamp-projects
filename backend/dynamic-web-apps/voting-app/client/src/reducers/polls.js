const polls = (state = [], action) => {
  switch (action.type) {
    case 'ADD_POLL':
      const { id, user, title, description, choices } = action;
      return [
        ...state,
        {
          id,
          user,
          title,
          description,
          choices,
        }
      ];
    case 'REMOVE_POLL':
      return [
        ...state.slice(0, action.index),
        ...state.slice(action.index + 1),
      ];
    case 'ADD_CHOICE':
      return [
        ...state.slice(0, action.index),
        {
          ...state[action.index],
          choices: [...state[action.index].choices, [`${action.choice}`, 0]]
        },
        ...state.slice(action.index + 1),
      ];
    case 'VOTE':
      let pollIndex;
      for (let i = 0; i < state.length; i++) {
        if (state[i].id === action.index) {
          pollIndex = i;
          break;
        }
      }
      let choiceIndex;
      for (let i = 0; i < state[pollIndex].choices.length; i++) {
        if (state[pollIndex].choices[i][0] === action.choice) {
          choiceIndex = i;
        }
      }
      return [
        ...state.slice(0, pollIndex === 0 ? 0 : pollIndex - 1),
        {
          ...state[pollIndex],
          choices: [
            ...state[pollIndex].choices.slice(0, choiceIndex),
            [action.choice, state[pollIndex].choices[choiceIndex][1] + 1],
            ...state[pollIndex].choices.slice(choiceIndex + 1),
          ],
        },
        ...state.slice(pollIndex + 1),
      ];
    default:
      return state;
  }
};

export default polls;
