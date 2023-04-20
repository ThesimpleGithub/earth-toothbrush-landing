import React from 'react';
import styled, { css } from 'styled-components';
import InstagramIcon from '@mui/icons-material/Instagram';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import CallIcon from '@mui/icons-material/Call';

const Footer = () => {
  return (
    <Wrapper>
      <Container>
        <div>
          <BoldSpan>상호 : 주식회사 더심플</BoldSpan>{' '}
          <Span>
            주소 : 광주광역시 서구 경열로 17번길 12 303호 / 광주 AI 스타트업캠프
            303호
          </Span>{' '}
          <br />
          <br />
          사업자등록번호 : 264-86-00613
          <Span>대표 : 오경미</Span>
          <br />
          <br />
          Copyright © Thesimple Co,.Ltd. All Rights Reserved.
        </div>
      </Container>
      <RightContainer>
        <IconWrapper onClick={() => alert('준비 중입니다.')}>
          <InstaIcon />
          <span>Instagram</span>
        </IconWrapper>
        <IconWrapper href="tel:010-3637-5258">
          <TelIcon />
          <span>010-3637-5258</span>
        </IconWrapper>
        <IconWrapper href="mailto:thesimple@thesimple.kr">
          <MailIcon />
          <span>thesimple@thesimple.kr</span>
        </IconWrapper>
      </RightContainer>
    </Wrapper>
  );
};

export default Footer;

const Wrapper = styled.footer`
  * {
    font-family: 'Pretendard Variable';
  }
  display: flex;
  width: 100%;
  overflow: hidden;
  background: black;
  padding: 0px 30px;
  font-weight: 200;
  word-break: keep-all;
  @media (max-width: 1360px) {
    padding: 0 2.21vw;
  }
  @media (max-width: 740px) {
    flex-direction: column;
  }
`;

const Container = styled.div`
  position: relative;
  width: 100%;
  margin: 0 auto;
  padding: 0px;
  color: #a5a5a5;
  font-size: 16px;
  line-height: 18px;
  padding: 30px 0;
  justify-content: center;
  display: flex;
  @media (max-width: 1360px) {
    font-size: 1.18vw;
    padding: 2.21vw 0;
    line-height: 1.32vw;
  }
  @media (max-width: 740px) {
    font-size: 9.9px;
    padding: 8px 0;
    line-height: 11px;
  }
`;

const RightContainer = styled(Container)`
  a {
    color: #a5a5a5 !important;
    text-decoration: none;
  }
  align-items: center;
  font-size: 20px;
  @media (max-width: 1360px) {
    font-size: 1.37vw;
  }
  @media (max-width: 740px) {
    font-size: 9px;
  }
`;

const Span = styled.span`
  padding-left: 20px;
  @media (max-width: 1360px) {
    padding-left: 1.47vw;
  }
  @media (max-width: 740px) {
    padding-left: 12.1px;
  }
`;
const BoldSpan = styled.span`
  font-weight: bold;
`;

const IconWrapper = styled.a`
  display: flex;
  align-items: center;
  margin-right: 20px;
  transition: all 0.1s;
  :hover {
    font-weight: 600;
  }
  @media (max-width: 1360px) {
    margin-right: 1.47vw;
  }
  @media (max-width: 740px) {
    margin-right: 12.1px;
  }
`;

const Icon = css`
  font-size: 45px;
  margin-right: 5px;
  @media (max-width: 1360px) {
    font-size: 3.31vw;
    margin-right: 0.37vw;
  }
  @media (max-width: 740px) {
    font-size: 26.4px;
    margin-right: 3.3px;
  }
`;

const InstaIcon = styled(InstagramIcon)`
  ${Icon}
`;

const TelIcon = styled(CallIcon)`
  ${Icon}
`;
const MailIcon = styled(MailOutlineIcon)`
  ${Icon}
`;
