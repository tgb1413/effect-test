declare module 'effect-test' {
  function Effect(
    container?: HTMLElement,
    config?: any,
  ): { start: Function; stop: Function };

  export { Effect };
}
