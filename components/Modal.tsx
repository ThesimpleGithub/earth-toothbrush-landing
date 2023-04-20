import { ReactElement } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 100004;
  top: 0;
`;

const Wrapper = styled.div`
  flex-direction: column;
  align-items: center;
  padding: 25px;
  position: relative;
  left: 50%;
  top: 50%;
  border-radius: 10px;
  display: flex;
  max-width: 300px;
  transform: translate(-50%, -50%);
  background: white;
  box-shadow: 1px 1px 4px gray;
  span:nth-child(3) {
    font-size: 15px;
    text-align: center;
    margin-top: 10px;
    word-break: keep-all;
    color: #737971;
    font-family: 'Pretendard Variable';
  }
  img {
    width: 50px;
    height: 50px;
  }
`;

const Button = styled.button`
  background-color: #21a826;
  color: white;
  border-radius: 10px;
  width: 80%;
  padding: 8px;
  margin-top: 10px;
  font-size: 20px;
`;

const Title = styled.span`
  color: black;
  font-size: 20px;
  margin-top: 15px;
  margin-bottom: 3px;
`;
const Modal = ({
  title,
  text,
  onClick,
  icon,
}: {
  title: string;
  text: string;
  icon: string;
  onClick: () => void;
}): ReactElement => {
  return (
    // 인공지능 불러오기 전 로딩 박스
    <Container>
      <Wrapper>
        {/* <div style={{ width: '50px', height: '50px' }}> */}
        <img src={`${process.env.PATH}/images/${icon}.png`} />
        {/* </div> */}
        <Title>{title}</Title>
        <span>{text}</span>
        <Button onClick={onClick}>확인</Button>
      </Wrapper>
    </Container>
  );
};

export default Modal;
