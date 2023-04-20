import Image from 'next/image';
import React, { RefObject, useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import Background from './Background';
import logo from '../public/images/logo.png';
import insta from '../public/images/insta.png';
import blog from '../public/images/blog.png';
import kakao from '../public/images/kakao.png';
import theme from '../styles/theme';
import TouchAppIcon from '@mui/icons-material/TouchApp';
const Main = ({ SwipeSection }: { SwipeSection: RefObject<HTMLElement> }) => {
  const [isClicked, setClicked] = useState(false);
  const [isLandScape, setIsLandScape] = useState(false);

  useEffect(() => {
    if (innerWidth >= innerHeight) setIsLandScape(true);
    else setIsLandScape(false);
    window.addEventListener('resize', () => {
      if (innerWidth >= innerHeight) setIsLandScape(true);
      else setIsLandScape(false);
    });
  }, []);
  return (
    <section>
      <Wrapper>
        <header>
          <Logo />
          <ul>
            <li>
              <a
                href="https://www.instagram.com/earth_toothbrush/"
                target="_blank"
                rel="noreferrer"
              >
                <Image src={insta} alt="인스타아이콘" />
              </a>
            </li>
            <li>
              <a
                href="https://blog.naver.com/earthtoothbrush"
                target="_blank"
                rel="noreferrer"
              >
                <Image src={blog} alt="블로그아이콘" />
              </a>
            </li>
            <li>
              <a
                href="http://pf.kakao.com/_Ixhxjeb/chat
"
                target="_blank"
                rel="noreferrer"
              >
                <Image src={kakao} alt="카카오아이콘" />
              </a>
            </li>
          </ul>
        </header>
        <article>
          <h1>
            지구를 구하기 위해 <br />
            지구칫솔 탄생하다!
          </h1>
          <p>
            지구를 생각하는 멋진 용사님!
            <br />
            지구칫솔을 들어 지구를 구해주세요!
          </p>
        </article>
        <Img
          src={`${process.env.PATH}/images/main_toothbrush.png`}
          alt="칫솔 이미지"
          layout="fill"
          objectFit={isLandScape ? 'fill' : 'cover'}
          isClicked={isClicked}
        />
        <div
          onClick={e => {
            setClicked(!isClicked);
            setTimeout(() => {
              SwipeSection.current?.scrollIntoView();
            }, 250);
            setTimeout(() => {
              setClicked(isClicked => !isClicked);
            }, 1000);
          }}
        >
          <div>
            <TouchAppIcon />
            <div>
              <span>클릭해서 칫솔을 들어주세요</span>
            </div>
          </div>
        </div>
      </Wrapper>
      <Background src={`${process.env.PATH}/images/mainBG.png`} />
    </section>
  );
};

const animate = keyframes`
  0%{
    transform: scale(0.96);
  }
  50%{
    transform: scale(1);
  }
  100%{
    transform: scale(0.96);
  }
`;

const animate2 = keyframes`
  0%{
    transform: scale(0.8) rotate(-45deg);
  }
  50%{
    transform: scale(1) rotate(-45deg);
  }
  100%{
    transform: scale(0.8) rotate(-45deg);
  }
`;

const bigger = keyframes`
    100%{
        transform: scale(8);
    }
`;
const Logo = styled.div`
  width: 70px;
  height: 80px;
`;

const Img = styled(Image)<{ isClicked: boolean }>`
  animation: ${props => (props.isClicked ? bigger : animate)} 0.8s ease-in
    ${props => (!props.isClicked ? 'infinite' : 'forwards')};
  transition: 2s;
`;

const Wrapper = styled.div`
  article {
    z-index: 3;
  }
  ${theme.Container}
  ul {
    list-style: none;
    display: flex;
    align-items: center;
    li {
      margin-left: 5px;
    }
  }
  > div {
    z-index: 4;
    position: absolute;
    left: 50%;
    bottom: 30%;
    color: white;
    cursor: pointer;
    div > div {
      padding: 10px 20px;
      background-color: #21a826;
      border-radius: 10px;
      font-size: 15px;
      position: relative;
      right: 62px;
      @media (max-width: 540px) {
        font-size: 3vmin;
        padding: 2vmin 4vmin;
        border-radius: 2vmin;
        right: 13vmin;
      }
    }
    svg {
      animation: ${animate2} 0.8s ease-in infinite;
      color: black;
      transform: rotate(-45deg);
      font-size: 50px;
    }
  }
  header {
    display: flex;
    justify-content: space-between;
    z-index: 3;
    position: relative;
    li {
      cursor: pointer;
    }
    ul > li:last-child img {
      width: 30px;
      height: 30px;
    }
  }
  article {
    position: relative;
    top: 10vmin;
  }
`;

export default Main;
