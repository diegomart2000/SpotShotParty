import React from 'react';
import styled from 'styled-components';

const PageGrid = styled.div`
  min-height: 100vh;
  display: grid;

  grid-template-rows: [top] 5rem [content-start] 1fr [content-end] 4rem [bottom];

  @media (min-width: 1024px) {
    grid-template-rows: [top] 8rem [content-start] 1fr [content-end] 8rem [bottom];
  }
`;

export const PageHeader = styled.div`
  grid-row: top / content-start;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

// Make the grid content start in column 1 and span over 10 columns
export const PageContent = styled.div`
  grid-row: content-start / content-end;
`;

export const PageFooter = styled.div`
  grid-row: content-end / bottom;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const Page = ({children, ...props}) => (
  <PageGrid {...props}>
      {children}
  </PageGrid>
);

export default Page;
