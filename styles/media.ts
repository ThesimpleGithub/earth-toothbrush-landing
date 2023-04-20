import { CSSProp, css } from 'styled-components';

type MediaQueryProps = {
  mobile: number;
  tablet: number;
  miniDesktop: number;
  landscape: number;
  portrait: string;
};

export const sizes: MediaQueryProps = {
  mobile: 684,
  tablet: 768,
  miniDesktop: 1170,
  landscape: 900,
  portrait: 'portrait',
};

// // Iterate through the sizes and create a media template
type BackQuoteArgs = string[];

const media = {
  portrait: (literals: TemplateStringsArray, ...args: BackQuoteArgs): CSSProp =>
    css`
      @media only screen and (orientation: portrait) {
        ${css(literals, ...args)}
      }
    `,
  landscape: (
    literals: TemplateStringsArray,
    ...args: BackQuoteArgs
  ): CSSProp =>
    css`
      @media only screen and (orientation: landscape) and (max-width: ${sizes.landscape}px),
        (max-width: ${sizes.landscape}px) {
        ${css(literals, ...args)}
      }
    `,
  mobile: (literals: TemplateStringsArray, ...args: BackQuoteArgs): CSSProp =>
    css`
      @media only screen and (max-width: ${sizes.mobile}px) {
        ${css(literals, ...args)}
      }
    `,
  tablet: (literals: TemplateStringsArray, ...args: BackQuoteArgs): CSSProp =>
    css`
      @media only screen and (max-width: ${sizes.tablet}px) {
        ${css(literals, ...args)}
      }
    `,
  miniDesktop: (
    literals: TemplateStringsArray,
    ...args: BackQuoteArgs
  ): CSSProp =>
    css`
      @media only screen and (max-width: ${sizes.miniDesktop}px) {
        ${css(literals, ...args)}
      }
    `,
} as Record<
  keyof typeof sizes,
  (l: TemplateStringsArray, ...p: BackQuoteArgs) => CSSProp
>;

export default media;
