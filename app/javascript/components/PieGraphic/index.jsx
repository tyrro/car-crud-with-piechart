import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { PieChart } from 'react-minimal-pie-chart';

const PieGraphic = props => {
  const [selected, setSelected] = useState(null);
  const [hovered, setHovered] = useState(null);

  const data = props.data.map((entry, i) => {
    if (hovered === i) {
      return {
        ...entry,
        color: 'grey',
      };
    }
    return entry;
  });

  return (
    <PieChart
      data={data}
      animate
      center={[100, 100]}
      label={data => data.dataEntry.title}
      labelPosition={112}
      labelStyle={{ fontSize: 4 }}
      radius={60}
      viewBoxSize={[200, 200]}
      segmentsStyle={{ transition: 'stroke .3s', cursor: 'pointer' }}
      segmentsShift={index => (index === selected ? 6 : 1)}
      onClick={(_event, index) => setSelected(index === selected ? null : index)}
      onMouseOver={(_event, index) => {
        setHovered(index);
      }}
      onMouseOut={() => {
        setHovered(null);
      }}
    />
  );
};

PieGraphic.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      value: PropTypes.number,
      color: PropTypes.string,
    }),
  ).isRequired,
};
export default PieGraphic;
