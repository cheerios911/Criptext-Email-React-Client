import { User } from '../actions/types';

export default (state = new List({}), action) => {
  switch (action.type) {
    case User.ADD: {
      const username = action.user.username.toString();
      return {
        ...state,
        [username]: action.user
      };
    }
    default:
      return state;
  }
};
