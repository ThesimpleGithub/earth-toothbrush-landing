import { useEffect, useRef } from 'react';
import Detail from '../components/Detail';
import Footer from '../components/Footer';
import Main from '../components/Main';
import Nav from '../components/Nav';
import Order from '../components/Order';
import ProductList from '../components/ProductList';
import Student from '../components/Student';
import Swipe from '../components/Swipe';
export default function Home() {
  const SwipeRef = useRef<HTMLElement>(null);
  const OrderRef = useRef<HTMLElement>(null);

  const resizeHeight = () => {
    console.log(`${window.innerHeight * 0.01}px`);
    document.documentElement.style.setProperty(
      '--vh',
      `${window.innerHeight * 0.01}px`,
    );
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    resizeHeight();
    window.addEventListener('resize', resizeHeight);
  }, []);
  return (
    <>
      <Main SwipeSection={SwipeRef} />
      <Swipe SwipeSection={SwipeRef} />
      <Student />
      <Detail />
      <ProductList />
      <Order OrderRef={OrderRef} />
      <Nav OrderRef={OrderRef} />
      <Footer />
    </>
  );
}
