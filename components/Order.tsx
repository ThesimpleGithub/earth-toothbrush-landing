import React, {
  ReactElement,
  RefObject,
  useEffect,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components';
import Background from './Background';
import DaumPostcode from 'react-daum-postcode';
import axios from 'axios';
import ModalPortal from './Portal';
import Modal from './Modal';

const Order = ({ OrderRef }: { OrderRef: RefObject<HTMLElement> }) => {
  const [openPostcode, setOpenPostcode] = React.useState<boolean>(false);
  const nameInput = useRef<HTMLInputElement>(null);
  const emailInput = useRef<HTMLInputElement>(null);
  const textInput = useRef<HTMLInputElement>(null);
  const telInput = useRef<HTMLInputElement>(null);
  const addressInput = useRef<HTMLInputElement>(null);
  const addressInput2 = useRef<HTMLInputElement>(null);
  const certificateInput = useRef<HTMLInputElement>(null);
  const imprintInput = useRef<HTMLInputElement>(null);
  const quantityInput = useRef<HTMLInputElement>(null);
  const productNumInput = useRef<HTMLSelectElement>(null);
  const sixthSetInput = useRef<HTMLInputElement>(null);

  const [modalTitle, setModalTitle] = useState('');
  const [modalText, setModalText] = useState('');
  const [icon, setIcon] = useState('');
  const [selectValue, setSelectValue] = useState(1);

  const checkBoxRef = useRef<HTMLInputElement | null>(null);

  const handle = {
    // 버튼 클릭 이벤트
    clickButton: () => {
      setOpenPostcode(current => !current);
    },

    // 주소 선택 이벤트
    selectAddress: (data: any) => {
      (addressInput.current as HTMLInputElement).value = data.address;
      (addressInput2.current as HTMLInputElement).focus();
      setOpenPostcode(false);
    },
  };

  const setModal = (title: string, text: string, img: string) => {
    setModalTitle(title);
    setModalText(text);
    setIcon(img);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!checkBoxRef.current?.checked) {
      setModal(
        '체크해주세요',
        '상담을 위한 개인정보 수집에 동의해주세요!',
        'sad',
      );
      return;
    }

    const formData = new FormData();
    const obj = {
      clientName: nameInput.current?.value,
      address: addressInput.current!.value + addressInput2.current!.value,
      email: emailInput.current?.value,
      phone: telInput.current?.value,
      prodNum: productNumInput.current?.value,
      quantity: quantityInput.current?.value,
      inquiry: sixthSetInput.current?.value,
      imprintText: textInput.current?.value,
    };
    if (!obj.quantity) delete obj.quantity;
    if (!obj.inquiry) delete obj.inquiry;
    console.log(obj);
    formData.append(
      'orderDto',
      new Blob([JSON.stringify(obj)], { type: 'application/json' }),
    );
    if (certificateInput.current!.files![0])
      formData.append(
        'certificateFile',
        certificateInput.current?.files![0] as Blob,
      );

    if (imprintInput.current!.files![0])
      formData.append('imprintFile', imprintInput.current?.files![0] as Blob);

    const url1 = 'http://localhost:8082/order/commission';
    const url2 = 'https://home.thesimple.synology.me/order/commission';
    axios
      .post(url1, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(res => {
        const { code } = res.data;
        if (code === 'O001') {
          setModal(
            '주문이 완료되었어요',
            '빠른 시일내에 상담사가 연락드릴거예요!',
            'heart',
          );
          return;
        }
        setModal(
          '주문에 실패했어요',
          '동일한 주문 내역이 이미 존재하네요!',
          'sad',
        );
      })
      .catch(err => {
        setModal(
          '주문에 실패했어요',
          '다시 시도해보시고 안되면 전화상담을 요청해주세요!',
          'sad',
        );
      });
  };

  return (
    <section ref={OrderRef}>
      <ModalPortal>
        {
          (modalText && (
            <Modal
              text={modalText}
              title={modalTitle}
              icon={icon}
              onClick={() => setModalText('')}
            />
          )) as ReactElement
        }
      </ModalPortal>
      <Wrapper>
        {openPostcode && (
          <PostModal>
            <button type="button" onClick={() => setOpenPostcode(false)}>
              닫기 X
            </button>
            <DaumPostcode
              onComplete={handle.selectAddress} // 값을 선택할 경우 실행되는 이벤트
              autoClose={false} // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
              style={{
                position: 'absolute',
                maxWidth: '610px',
                width: '81.6%',
                zIndex: '2',
              }}
            />
          </PostModal>
        )}
        <Header data-aos="fade-up">
          <h5>문의하기</h5>
          <p>원하시는 상품과 문구를 적어주시면 상담사가 연락을 드릴거예요!</p>
        </Header>
        <FormWrapper data-aos="fade-up">
          <form onSubmit={handleSubmit}>
            <InputWrapper>
              <div>
                <label>주문자명</label>
                <input ref={nameInput} required name="user_name" />
              </div>
              <div>
                <label>이메일</label>
                <input
                  ref={emailInput}
                  required
                  type="email"
                  name="user_email"
                />
              </div>
            </InputWrapper>
            <InputWrapper>
              <div>
                <label>각인 문구</label>
                <input ref={textInput} required name="user_name" />
              </div>
              <div>
                <label>휴대폰 번호</label>
                <input ref={telInput} required type="tel" name="user_email" />
              </div>
            </InputWrapper>
            <InputWrapper>
              <div>
                <label>주소</label>
                <AddressWrapper>
                  <input required ref={addressInput} disabled />
                  <button type="button" onClick={handle.clickButton}>
                    주소 검색
                  </button>
                </AddressWrapper>
              </div>
              <div>
                <label>상세 주소</label>
                <input required ref={addressInput2} />
              </div>
            </InputWrapper>
            <InputWrapper>
              <FIleInputWrapper>
                <label>사업자등록증 업로드(개인이면 업로드 X)</label>
                <input ref={certificateInput} type="file" />
              </FIleInputWrapper>
              <FIleInputWrapper>
                <label>각인할 이미지 (없다면 업로드 X)</label>
                <input ref={imprintInput} type="file" />
              </FIleInputWrapper>
            </InputWrapper>
            <InputWrapper>
              <div>
                <label id="select-label">상품 선택</label>
                <select
                  onChange={e => setSelectValue(Number(e.target.value))}
                  ref={productNumInput}
                  name="select-label"
                >
                  <option value={1}>1번 싱글세트</option>
                  <option value={2}>2번 커플세트</option>
                  <option value={3}>3번 춥춥박스</option>
                  <option value={4}>4번 지구박스</option>
                  <option value={5}>5번 싹싹박스</option>
                  <option value={6}>6번 내맘대로</option>
                </select>
              </div>
              {selectValue !== 6 && (
                <div>
                  <label>수량 선택</label>
                  <input required ref={quantityInput} type="number" />
                </div>
              )}
              {selectValue === 6 && (
                <div>
                  <label>원하는 상품과 수량을 적어주세요.</label>
                  <input
                    placeholder="ex) 칫솔2개 치약3개 홀더1개"
                    required
                    ref={sixthSetInput}
                  ></input>
                </div>
              )}
            </InputWrapper>
            <DataAgree data-type="agree">
              <h5>개인정보 수집 및 이용안내</h5>
              <h6>
                문의 신청 시, 아래와 같이 고객님의 개인정보를 수집하고 있습니다.
              </h6>
              <ol>
                <Li>개인정보 수집범위 : 이름, 이메일, 휴대폰번호, 주소</Li>
                <Li>개인정보 수집 및 이용목적 : 주문 확인 및 상담자료</Li>
                <Li>
                  개인정보 수집 및 보유기간 : 이용자의 개인정보는 원칙적으로
                  개인정보의 수집 및 이용 목적이 달성되면 지체 없이 파기하며
                  보유기간은 최대 1년을 넘기지 않는 것을 원칙으로 한다.
                </Li>
              </ol>
            </DataAgree>
            <label>
              <input ref={checkBoxRef} type="checkbox" name="agree" />
              개인정보 수집 및 이용 동의
            </label>
            <Submit type="submit" value="보내기" />
          </form>
        </FormWrapper>
      </Wrapper>
      <Background src={`${process.env.PATH}/images/contactBG2.jpg`} />
    </section>
  );
};

export default Order;

const PostModal = styled.div`
  button {
    background: #21a826;
    color: white;
    padding: 10px;
    border-top-right-radius: 7px;
    border-top-left-radius: 7px;
    margin: 0;
  }
`;
const AddressWrapper = styled.div`
  position: relative;
  input {
    background-color: #adadad !important;
    text-align: unset !important;
    padding-left: 5px;
  }
  button {
    height: 40px;
    position: absolute;
    right: 0;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    background-color: #21a826;
    color: white;
    ${({ theme }) => theme.media.landscape`
    font-size : 2vmin;
    height : 5vmin;
    border-top-right-radius: 1vmin;
    border-bottom-right-radius: 1vmin;
  `}
  }
`;

const Header = styled.header`
  * {
    font-family: 'Pretendard Variable';
  }
  h5 {
    margin: 0;
  }
  p {
    font-size: 17px !important;
  }
  margin-top: 10px;
  color: white;
  z-index: 1;
  margin-bottom: 30px;
  font-size: 35px;
  text-align: center;
  ${({ theme }) => theme.media.landscape`
    font-size : 5vmin;
    margin-bottom : 3vmin;
    p{
      font-size : 2vmin !important;
    }
  `}
`;

const FIleInputWrapper = styled.div`
  input {
    color: #7a7a7a;
    cursor: pointer;
    text-align: center;
    height: unset !important;
    opacity: 1 !important;
    padding-left: 0px !important;
    ${({ theme }) => theme.media.landscape`
        font-size : 2vmin !important;
   `}
    ::file-selector-button {
      color: white;
      background: #21a826;
      border: none;
      height: 40px;
      outline: none;
      border-radius: unset;
      font-size: 13px;
      font-family: 'Pretendard Variable';
      cursor: pointer;
      ${({ theme }) => theme.media.landscape`
        height : 5vmin;
        font-size : 2vmin;
        border-radius: unset !important;
  `}
    }
  }
`;

const FormWrapper = styled.div`
  z-index: 1;
  max-width: 620px;
  font-size: 16px;
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  ${({ theme }) => theme.media.tablet`
    margin-left: 10px;
    margin-right: 10px;
  `}
  input,select {
    font-size: 15px;
    border-radius: 8px;
    background: #ffffff 0% 0% no-repeat padding-box;
    opacity: 0.81;
    border: none;
    width: 300px;
    height: 40px;
    text-align: center;
    ${({ theme }) => theme.media.tablet`
    border-radius: 1vmin;
    font-size : 2vmin;
  `}
  }
  label {
    color: white;
    margin-bottom: 4px;
    cursor: pointer;
    display: flex;
    ${({ theme }) => theme.media.landscape`
      font-size : 2vmin;
  `}
    align-items: center;
  }
  input[type='checkbox'] {
    cursor: pointer;
    accent-color: #21a826;
    width: 22px;
    height: 22px;
    clip-path: circle(62% at 50% 50%);
    opacity: 1;
    font-size: 16px;
    ${({ theme }) => theme.media.landscape`
    width: 3vmin; 
    height: 3vmin;
  `}
  }
  input[type='submit'] {
    background-color: #21a826;
    width: 200px;
    height: 44px;
    border-radius: 42px;
    font-family: 'Pretendard Variable';
    opacity: 1;
    font-size: 16px;
    ${({ theme }) => theme.media.landscape`
    width : 26vmin;
    height : 7vmin;
    font-size : 2.5vmin;
    padding : 0px;
  `}
    ${({ theme }) => theme.brownBtn}
  }
  textarea {
    width: 620px;
  }
  ${({ theme }) => theme.media.landscape`
  input,select{
    width: 35.85vmin;
    height: 5vmin;
  }
  textarea, div[data-type="agree"]{
    width : 76vmin;
  }
  `}
`;

const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
  div:first-child {
    margin-right: 10px;
  }
  div {
    display: flex;
    flex-direction: column;
  }
  ${({ theme }) => theme.media.landscape`
    width : 76vmin;
  `}
`;
const LastInputWrapper = styled(InputWrapper)`
  div,
  input {
    width: 100% !important;
    margin-right: 0 !important;
  }
`;

const DataAgree = styled.div`
  * {
    font-family: 'Noto Sans' !important;
  }
  height: 150px;
  padding: 00px 20px 10px 20px;
  border: 1px solid #ddd;
  background-color: #fff;
  overflow-y: scroll;
  color: black;
  border-radius: 8px;
  margin: 10px 0;
  ::-webkit-scrollbar {
    display: none;
  }
  @media (max-height: 644px) {
    height: 20vh;
  }
`;
const Wrapper = styled.article`
  ${props => props.theme.Container}
  height: unset;
  position: absolute;
  input,
  select,
  button,
  option,
  header {
    font-family: 'Pretendard Variable';
  }
  padding-top: unset !important;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;
const Li = styled.li`
  margin-bottom: 5px;
  font-size: 13px;
`;
const Submit = styled.input`
  outline: 0;
  border: 0;
  border-radius: 15px;
  background: black;
  color: white;
  padding: 10px 40px;
  cursor: pointer;
`;
