import Image from 'next/image';
import React, { useState } from 'react';
import styled from 'styled-components';

const Detail = () => {
  const [isClicked, setClicked] = useState(false);
  return (
    <Section isClicked={isClicked}>
      {new Array(isClicked ? 5 : 1).fill(undefined).map((_, idx) => (
        <Image
          src={`${process.env.PATH}/images/detail_${idx + 1}.jpg`}
          alt="상품상세설명"
          layout="responsive"
          width="100"
          height="100"
          key={idx}
          placeholder="blur"
          loading="eager"
          blurDataURL="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
        />
      ))}
      <button onClick={() => setClicked(!isClicked)}>상품 설명 더 보기</button>
    </Section>
  );
};

const Section = styled.section<{ isClicked: boolean }>`
  text-align: center;
  ${props =>
    props.isClicked
      ? `
    height : unset;
    overflow : unset;
  `
      : `
    height: calc(var(--vh, 1vh) * 100);
    overflow : hidden;    
  `}
  img {
    max-width: 985px;
  }
  button {
    display: ${props => (props.isClicked ? 'none' : 'block')};
    position: absolute;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #21a826;
    color: white;
    border-radius: 10px;
    font-size: 20px;
    padding: 10px 40px;
    white-space: nowrap;
  }
`;

export default Detail;
