import React from 'react';
import styled from 'styled-components';

// Make the grid content start in column 1 and span over 10 columns
const GridContent = styled.div`
  grid-column: 2 / span 10;
  grid-row-start: 2;
`;

export default GridContent;
