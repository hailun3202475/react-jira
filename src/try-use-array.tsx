import { useArray, useMount } from "./utils";
import React from "react";

export const TsReactTest = () => {
  const persons: { name: string; age: number }[] = [
    { name: "jack", age: 25 },
    { name: "ma", age: 21 },
  ];
  const [value, clear, removeIndex, add] = useArray(persons);
  // const { value, clear, removeIndex, add } = useArray(persons);
  useMount(() => {
    //报错
    // console.log(value.notExist);
    // 报错
    // add({ name: "dda" });
    // 报错
    // removeIndex("1232");
  });

  return (
    <div>
      <button onClick={() => add({ name: "john", age: 22 })}>add john</button>

      <button onClick={() => removeIndex(0)}>remove 0</button>

      <button style={{ marginBottom: "50px" }} onClick={() => clear()}>
        clear
      </button>
      {value.map((person, index) => (
        <div key={index} style={{ marginBottom: "30px" }}>
          <span style={{ color: "red" }}>{index}</span>
          <span>{person.name}</span>
          <span>{person.age}</span>
        </div>
      ))}
    </div>
  );
};
