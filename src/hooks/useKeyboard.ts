import { onMounted, onUnmounted, ref } from "vue";

export const useKeyboard = (submit: Function, backspace: Function) => {
  const currentInput = ref<KeyboardEvent | null>(null);
  const repeat = ref(false);

  const handleFunctionalKeys = (key: string) => {
    switch (key) {
      case "Backspace": {
        backspace();
        break;
      }
      case "Enter": {
        submit();
        break;
      }
      default: {
        break;
      }
    }
  };

  const ignoredKey = (e: KeyboardEvent) => {
    if (e.key.length > 1) return true;
    return false;
  };

  const list = (e: KeyboardEvent) => {
    // console.log(e);
    handleFunctionalKeys(e.code);
    if (ignoredKey(e)) return;

    currentInput.value = e;
  };

  onMounted(() => {
    window.addEventListener("keyup", list);
  });
  onUnmounted(() => {
    window.removeEventListener("keyup", list);
  });

  return {
    repeat,
    currentInput,
  };
};
