import { BUY_CHOCOLATE, SS } from './chocolateTypes';

const initialState = {
  numOfChocolate: 15,
  status: false,
};

const chocolateReducer = (state = initialState, action) => {
  switch (action.type) {
    case BUY_CHOCOLATE:
      return {
        ...state,
        numOfChocolate: state.numOfChocolate - 1,
      };
    case SS:
      return {
        ...state,
        status: action.payload,
      };
    default:
      return state;
  }
};

export default chocolateReducer;
