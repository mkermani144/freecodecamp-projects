const polls = (state = [], action) => {
  switch (action.type) {
    case 'ADD_POLL':
      const { user, title, description, choices } = action;
      return [
        ...state,
        {
          user,
          title,
          description,
          choices: choices.reduce((el, next) => Object.assign(el, {[`${next}`]: 0}), {}),
        }
      ];
      break;
    case 'REMOVE_POLL':
      return [
        ...state.slice(0, action.index),
        ...state.slice(action.index + 1),
      ];
    case 'ADD_CHOICE':
      return [
        ...state,
        {
          ...state[action.index],
          choices: Object.assign(state[action.index].choices, {
            action.choice: 0,
          }),
        }
      ];
    case 'VOTE':
      return [
        ...state,
        {
          ...state[action.index],
          choices: Object.assign(...state[action.index].choices, {
              action.choice: state[action.index].choices[action.choice] + 1
          }),
        }
      ];
    default:
      return state;
  }
};
