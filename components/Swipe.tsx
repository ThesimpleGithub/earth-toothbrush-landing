import NextImage from 'next/image';
import React, {
  RefObject,
  useEffect,
  useRef,
  useState,
  ReactElement,
} from 'react';
import styled from 'styled-components';
import theme from '../styles/theme';
import Background from './Background';
import toothbrush from '../public/images/지구칫솔.png';
import Modal from './Modal';
import ModalPortal from './Portal';

// eslint-disable-next-line react/display-name
const Swipe = ({ SwipeSection }: { SwipeSection: RefObject<HTMLElement> }) => {
  const [pixelLength, setPixelLength] = useState(0);
  const [remainPixelLength, setRemainPixelLength] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const toothBrush = useRef<HTMLImageElement>(null);

  const modalOnClick = () => {
    setIsOpen(false);
    document.body.style.overflow = 'unset';
    SwipeSection.current?.nextElementSibling?.scrollIntoView();
  };

  useEffect(() => {
    if (
      ((pixelLength - remainPixelLength) / pixelLength) * 100 > 70 &&
      !isFinished
    ) {
      setIsOpen(true);
      setIsFinished(true);
    }
  }, [remainPixelLength]);

  useEffect(() => {
    if (navigator.userAgent.toLocaleUpperCase().includes('MOBILE'))
      SwipeSection.current?.addEventListener('touchmove', e => {
        const { clientX, clientY } = e.touches[0];
        toothBrush.current!.style.transform = `translate(${clientX - 30}px,${
          clientY - 30
        }px)`;
      });
    else
      SwipeSection.current?.addEventListener('mousemove', e => {
        const { clientX, clientY } = e;
        toothBrush.current!.style.transform = `translate(${clientX}px,${clientY}px)`;
      });
  }, []);
  return (
    <section style={{ cursor: isOpen ? 'unset' : 'none' }} ref={SwipeSection}>
      <ModalPortal>
        {
          (isOpen && (
            <Modal
              text="다른 곳에서 지구를 구하고 있는 용사님들이 기다리고 있어요 가볼까요?"
              title="용사님! 엄청난 칫솔질이었어요!!"
              icon="heart"
              onClick={modalOnClick}
            />
          )) as ReactElement
        }
      </ModalPortal>
      <ImgWrapper ref={toothBrush}>
        <NextImage src={toothbrush} width={350} alt="칫솔이미지" />
      </ImgWrapper>
      <Wrapper>
        <article>
          <h1>
            쓰레기 줍는 여인들을 <br />
            도와 지구를 청소하라!
          </h1>
          <p>지구칫솔을 움직여 쓰레기를 지워주세요!</p>
          <ProgressWrapper>
            <label>청소 진행도</label>
            <div>
              <progress
                value={pixelLength - remainPixelLength}
                max={pixelLength}
              ></progress>
            </div>
          </ProgressWrapper>
        </article>
      </Wrapper>
      <Background src={`${process.env.PATH}/images/withoutTrash.png`} />
      <CanvasComponent
        setPixelLength={setPixelLength}
        setRemainPixelLength={setRemainPixelLength}
      />
    </section>
  );
};

const ImgWrapper = styled.div`
  position: absolute;
  transform: translate(50%, 50%);
  z-index: 3;
`;
const ProgressWrapper = styled.div`
  margin-top: 10px;
  display: flex;
  align-items: center;
  label {
    font-size: 13px;
    width: 100px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Pretendard Variable';
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    background-color: #363636;
    color: white;
  }
  div {
    display: flex;
    align-items: center;
    background-color: white;
    width: 300px;
    height: 50px;
    padding: 0 20px 0 20px;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }
  progress {
    width: 100%;
  }
  progress::-webkit-progress-bar {
    border: 0;
    border-radius: 15px;
    background: #9ea7a1;
  }
  progress::-webkit-progress-value {
    border: 0;
    border-radius: 15px;
    background: #22ce5b;
  }
  progress::-moz-progress-bar {
    border: 0;
    border-radius: 15px;
    background: #9ea7a1;
  }
`;
const Wrapper = styled.div`
  ${theme.Container}
`;
export default Swipe;
const CanvasComponent = ({
  setPixelLength,
  setRemainPixelLength,
}: {
  setPixelLength: React.Dispatch<React.SetStateAction<number>>;
  setRemainPixelLength: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const getRemainPixel = (
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
  ) => {
    const data = ctx.getImageData(
      0,
      canvas.height / 2,
      canvas.width,
      canvas.height,
    ).data;

    let remainPixel = 0;
    for (let i = 3; i < data.length; i += 4) {
      if (data[i] != 0) remainPixel++;
    }
    return remainPixel;
  };

  useEffect(() => {
    const canvas = canvasRef.current as HTMLCanvasElement;
    const ctx = canvas.getContext('2d', {
      willReadFrequently: true,
    }) as CanvasRenderingContext2D;
    const image = new Image();
    image.src = `${process.env.PATH}/images/trash.png`;
    image.crossOrigin = 'Anonymous';
    image.onload = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      setPixelLength(getRemainPixel(ctx, canvas));
      setRemainPixelLength(getRemainPixel(ctx, canvas));

      if (navigator.userAgent.toLocaleUpperCase().includes('MOBILE')) {
        canvas.focus();
        canvas.parentElement!.addEventListener('touchmove', e => {
          const x = e.touches[0].clientX + 15 - 30;
          const y = e.touches[0].clientY + 20 - 30;
          ctx.save();
          ctx.beginPath();
          ctx.translate(x, y);
          ctx.rotate((45 * Math.PI) / 180);
          ctx.translate(-x, -y);
          ctx.clearRect(x, y, 70, 25);
          ctx.fill();
          ctx.restore();
          setRemainPixelLength(getRemainPixel(ctx, canvas));
        });
      } else
        canvas.parentElement!.addEventListener('mousemove', e => {
          const x = e.clientX + 15;
          const y = e.clientY + 20;
          ctx.save();
          ctx.beginPath();
          ctx.translate(x, y);
          ctx.rotate((45 * Math.PI) / 180);
          ctx.translate(-x, -y);
          ctx.clearRect(x, y, 70, 25);
          ctx.fill();
          ctx.restore();
          setRemainPixelLength(getRemainPixel(ctx, canvas));
        });
    };
  }, []);
  return <Canvas ref={canvasRef}></Canvas>;
};

const Canvas = styled.canvas`
  position: absolute;
  z-index: 2;
  left: 0;
  top: 0;
`;
