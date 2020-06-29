# pin


``` javascritp

import React, { useEffect, useState } from "react";
import { CreateStore } from "./pin";
import "./styles.css";

let store = CreateStore({ app: 13, bpp: 12 });

export default function App() {
  return (
    <>
      <Toolbar />
      <Ohter />
      <ThemedButton />
    </>
  );
}

function Toolbar() {
  let app = store.getState("bpp");
  console.log(app, 111);
  useEffect(() => {
    store.update(s => {
      return {
        app: s.app + 1,
        bpp: s.bpp - 1
      };
    });
  }, []);
  return <div>1div-{app}</div>;
}

function ThemedButton() {
  let app = store.getState("app");
  console.log(app, 333);
  return <button>3div -{app}</button>;
}

function Ohter() {
  console.log("no");
  // useEffect(() => {
  //   setTimeout(() => {
  //     store.update("app", () => {
  //       return 333;
  //     });
  //   }, 7000);
  // }, []);
  return <div>nothing</div>;
}

```

todo:

* 异步接口流程
* store 里 map 数据的安全操作限制