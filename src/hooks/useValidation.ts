export const useValidation = () => {
  const isKeyValid = (key: string) => {
    if (typeof key != "string") return false;
    if (!/^[a-zA-Z]+$/.exec(key)) return false;
    return true;
  };

  // const wordValidity = ref<WordValidity>({
  //   inDict: true,
  //   fullLength: false,
  // });

  return {
    isKeyValid,
  };
};
