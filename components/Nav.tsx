import React, { RefObject, useEffect, useState } from 'react';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import styled from 'styled-components';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import CategoryIcon from '@mui/icons-material/Category';

const Nav = ({ OrderRef }: { OrderRef: RefObject<HTMLElement> }) => {
  const actions = [
    {
      icon: <ShoppingCartIcon />,
      name: '주문하기',
      onclick: () => OrderRef.current?.scrollIntoView(),
    },
    {
      icon: <CategoryIcon />,
      name: '상품 종류',
      onclick: () => OrderRef.current?.previousElementSibling?.scrollIntoView(),
    },
    {
      icon: <ManageSearchIcon />,
      name: '상품 설명',
      onclick: () =>
        OrderRef.current?.previousElementSibling?.previousElementSibling?.scrollIntoView(),
    },
    {
      icon: <ArrowUpwardIcon />,
      name: '맨 위로',
      onclick: () => window.scrollTo(0, 0),
    },
  ];
  const [isEntered, setIsEntered] = useState(false);
  useEffect(() => {
    const target =
      OrderRef.current!.previousElementSibling!.previousElementSibling!
        .previousElementSibling!.previousElementSibling!;
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(i => {
          console.log(i.isIntersecting);
          if (i.intersectionRatio > 0.8) {
            setIsEntered(true);
          } else {
            setIsEntered(false);
          }
        });
      },
      { threshold: 0.8 },
    );
    observer.observe(target);
  }, []);
  return (
    <>
      {!isEntered ? (
        <Wrapper>
          <SpeedDial
            ariaLabel="SpeedDial basic example"
            sx={{
              position: 'absolute',
              bottom: 16,
              right: 16,
            }}
            icon={<SpeedDialIcon />}
          >
            {actions.map(action => (
              <SpeedDialAction
                key={action.name}
                onClick={action.onclick}
                icon={action.icon}
                tooltipTitle={action.name}
              />
            ))}
          </SpeedDial>
        </Wrapper>
      ) : (
        ''
      )}
    </>
  );
};

const Wrapper = styled.nav`
  position: fixed;
  right: 2vmin;
  bottom: 2vmin;
  z-index: 3;
  div:nth-child(1) > button {
    background-color: #21a826;
  }
`;

export default Nav;
