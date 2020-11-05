import React from 'react';
import { setBtn } from '../redux';
import { useSelector, useDispatch } from 'react-redux';

function Btn() {
  console.log('Btn');
  const status = useSelector((state) => state.chocolate.status);
  const dispatch = useDispatch();
  return (
    <div>
      <h2>Number of Chocolate-btn - {`${status}`}</h2>
      <button
        onClick={() => {
          dispatch(setBtn(new Date()));
        }}
      >
        Buy Chocolate-btn
      </button>
    </div>
  );
}

// const mapStateToProps = (state) => {
//   return {
//     status: state.chocolate.status,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     setBtn: (p) => dispatch(setBtn(p)),
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Btn);
export default React.memo(Btn);
