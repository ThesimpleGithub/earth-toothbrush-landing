import Image from 'next/image';
import React, { useState } from 'react';
import styled from 'styled-components';

const ProductList = () => {
  return (
    <Section>
      {new Array(6).fill(undefined).map((_, idx) => (
        <Image
          src={`${process.env.PATH}/images/product_${idx + 1}.jpg`}
          alt="상품상세설명"
          layout="responsive"
          width="100"
          height="100"
          key={idx}
        />
      ))}
    </Section>
  );
};

const Section = styled.section`
  text-align: center;
  overflow: unset;
  height: unset;
  img {
    max-width: 985px;
  }
`;

export default ProductList;
