import { BUY_CHOCOLATE, SS } from './chocolateTypes';

export const buyChocolate = () => {
  return {
    type: BUY_CHOCOLATE,
  };
};
export const setBtn = (p) => {
  return {
    type: SS,
    payload: p,
  };
};
