import React from 'react';
import PropTypes from 'prop-types';

export const TestComp = ({
  strOrNumVal,
  numVal,
  stateTest,
  rendarable,
  comp
}) => {
  return (
    <>
      <div>
        <p>Text val: {strOrNumVal}</p> <p>Num val: {numVal + 5}</p>
      </div>
      {stateTest}
      {rendarable}
      {comp}
    </>
  );
};

TestComp.propTypes = {
  strOrNumVal: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  numVal: PropTypes.number.isRequired,
  stateTest: PropTypes.oneOf(['Loading', 'Ready']),
  rendarable: PropTypes.node,
  comp: PropTypes.element
};
