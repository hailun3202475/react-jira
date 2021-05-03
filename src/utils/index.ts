import { useEffect, useState } from "react";

export const isFalsy = (value: unknown) => (value === 0 ? false : !value);

export const cleanObject = (object: object) => {
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    // @ts-ignore
    const value = result[key];
    if (isFalsy(value)) {
      // @ts-ignore
      delete result[key];
    }
  });
  return result;
};

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
  }, []);
};

// const debounde = (func,delay) => {
//   let timeout;
//   return (...param) => {
//     if(timeout) {
//       clearTimeout(timeout);
//     }
//     timeout = setTimeout(function (){
//       func(...param);
//     },delay);
//   }
// }

export const useDebounce = <V>(value: V, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    // 每次在value变化以后,设置一个定时器
    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    // 每次在上一个useEffect处理完以后再运行
    return () => clearTimeout(timeout);
  }, [value, delay]);
  return debouncedValue;
};

export const useArray = <A>(
  initialArray: A[]
): [A[], () => void, (index: number) => void, (pv: A) => void] => {
  const [value, setValue] = useState(initialArray);
  useEffect(() => {
    setValue(initialArray);
  }, []);
  const clear = () => {
    setValue([]);
  };
  const removeIndex = (index: number) => {
    let arr = [...value];
    arr.splice(index, 1);
    setValue(arr);
  };
  const add = (pv: A) => {
    setValue([...value, pv]);
  };
  return [value, clear, removeIndex, add];
};

// export const useArray = <T>(initialArray: T[]) => {
//   const [value, setValue] = useState(initialArray);
//   return {
//     value,
//     setValue,
//     add: (item: T) => setValue([...value, item]),
//     clear: () => setValue([]),
//     removeIndex: (index: number) => {
//       const copy = [...value];
//       copy.splice(index, 1);
//       setValue(copy);
//     },
//   };
// };
