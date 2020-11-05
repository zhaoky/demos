import React from 'react';
import { connect } from 'react-redux';
import { buyCake, buyIceCream } from '../redux/';

function ItemContainer(props) {
  console.log('ItemContainer', props);
  return (
    <div>
      <h2>
        {props.cake ? 'cake' : 'iceCream'} Item - {props.item}{' '}
      </h2>
      <button onClick={props.buyItem}>Buy Items</button>
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  const itemState = ownProps.cake ? state.cake.numOfCakes : state.iceCream.numOfIceCreams;

  return {
    item: itemState,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const dispatchFunction = ownProps.cake ? () => dispatch(buyCake()) : () => dispatch(buyIceCream());

  return {
    buyItem: dispatchFunction,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemContainer);
