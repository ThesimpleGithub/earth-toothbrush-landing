import React from 'react';
import styled, { keyframes } from 'styled-components';
import theme from '../styles/theme';
import Image from 'next/legacy/image';
import stu1 from '../public/images/stu1.png';
import stu2 from '../public/images/stu2.png';
import school from '../public/images/school.png';
import { BsFillArrowDownCircleFill } from 'react-icons/bs';
const Student = () => {
  return (
    <section>
      <Wrapper>
        <article>
          <h1>
            이 곳에선 지구를 위해 어린 용사를 <br />
            양성하고 있어요
          </h1>
          <p>
            어린 용사님들은 지구칫솔을 통해 지구를 지키기 위한 공부를 하고
            있답니다
          </p>
          <p>용사님도 함께해주세요!</p>
        </article>
        <Footer>
          <p>지구칫솔 알아보러가기</p>
          <BsFillArrowDownCircleFill />
        </Footer>
      </Wrapper>
      <Figure>
        <ImgWrapper>
          <div>
            <Image src={school} alt="메인이미지" layout="fill" />
          </div>
          <div>
            <Image src={stu2} alt="메인이미지" />
            <Image src={stu1} alt="메인이미지" />
          </div>
        </ImgWrapper>
      </Figure>
    </section>
  );
};

const animate = keyframes`
  0%{
    transform: scale(0.98);
  }
  50%{
    transform: scale(1.3);
  }
  100%{
    transform: scale(0.98);
  }
`;

const Wrapper = styled.div`
  ${theme.Container}
`;

const ImgWrapper = styled.div`
  display: flex;
  div:first-child {
    width: 75vw;
  }
  div:last-child {
    display: flex;
    width: 30vw;
    flex-direction: column;
    img {
      height: 50vh !important;
    }
  }
`;

const Footer = styled.footer`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
  p {
    font-size: 20px;
    margin-bottom: 10px;
    color: #ffffff;
  }
  svg {
    animation: ${animate} 0.8s ease-in infinite;
    font-size: 20px;
  }
`;

const Figure = styled.figure`
  top: 0;
  width: 100vw;
  left: 0;
  margin: 0;
  height: 100vh;
  display: block;
  z-index: unset !important;
  position: absolute;
  span {
    z-index: 0;
  }
  &:before {
    content: '';
    z-index: 1;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.32);
  }
`;

export default Student;
