import React from 'react';
import { buyChocolate } from '../redux';
import { useSelector, useDispatch } from 'react-redux';
import Btn from './Btn';

function ChocolateContainer(props) {
  console.log('ChocolateContainer');
  const numOfCakes = useSelector((state) => state.chocolate.numOfChocolate);
  const dispatch = useDispatch();
  return (
    <div>
      <h2>Number of Chocolate - {numOfCakes}</h2>
      <button
        onClick={() => {
          dispatch(buyChocolate());
        }}
      >
        Buy Chocolate
      </button>
      <Btn />
    </div>
  );
}

// const mapStateToProps = (state) => {
//   return {
//     numOfChocolate: state.chocolate.numOfChocolate,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     buyChocolate: () => dispatch(buyChocolate()),
//   };
// };

export default ChocolateContainer;
