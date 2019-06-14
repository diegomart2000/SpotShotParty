import React from 'react';
import styled from 'styled-components';

const Grid = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: 1.5rem 1fr 1.5rem;
`;

export default Grid;
