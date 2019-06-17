import React from 'react';
import styled from 'styled-components';

const Grid = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: 1fr;
`;

export default Grid;
