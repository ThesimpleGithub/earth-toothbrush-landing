const Debounce = () => {
  var debounceCheck;
  return {
    debounce(callback, milliseconds) {
      // clearTimeout을 settimeout전에 걸어줘서 아무리 많이 버튼을 눌러도
      //그 전 setTimeout들은 전부 삭제되고 마지막 setTimeout만 실행된다.
      clearTimeout(debounceCheck);
      debounceCheck = setTimeout(() => {
        callback(...arguments);
      }, milliseconds);
    },
  };
};
export default Debounce;
