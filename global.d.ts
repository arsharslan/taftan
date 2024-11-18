declare namespace JSX {
  interface IntrinsicElements {
    'ion-icon': React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    > & {
      name?: string; // Allow the 'name' attribute
      'aria-hidden'?: string; // Allow 'aria-hidden' attribute
    };
  }

}

declare global {
  interface Window {
    recaptchaVerifier: any; // Replace `any` with the actual type if known
  }
}
