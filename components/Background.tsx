import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
const Background = ({ src }: { src: string }) => {
  const Img = useRef<HTMLElement>(null);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      Img.current!.style.backgroundImage = `url(${src})`;
      document.body.style.opacity = '1';
    };
  }, []);
  return (
    <Figure src={src} ref={Img}>
      {/* <Image src={src} alt="메인이미지" layout="fill" objectFit="cover" /> */}
    </Figure>
  );
};

export default Background;

const Figure = styled.figure<{ src: string }>`
  top: 0;
  width: 100vw;
  left: 0;
  margin: 0;
  background-color: #0005;
  background-blend-mode: darken;
  /* background-image: url(${props => props.src}); */
  background-size: 100vw calc(var(--vh, 1vh) * 100);
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
  display: block;
  z-index: unset !important;
  position: absolute;
  span {
    z-index: 0;
  }
  img {
  }
  /* &:before {
    content: '';
    z-index: 1;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.32);
  } */
`;
