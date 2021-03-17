import React, { useState, useEffect } from "react";
import { Button, Modal } from "antd";

const HelloModal = () => {
  const [visible, setVisible] = useState(false);

  const dispatchUIEvent = () => {
    const $a = document.createElement("a");
    $a.onclick = () => {
      console.log("log from UIEvent");
    };

    const evt = new MouseEvent("click", {
      view: window,
      bubbles: true,
      cancelable: false,
    });
    $a.dispatchEvent(evt);
  };

  useEffect(() => {
    if (visible) {
      dispatchUIEvent();
    }
  }, [visible]);

  return (
    <>
      <Button onClick={() => setVisible(true)}>CLICK ME</Button>
      <Modal
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        title="qiankun"
      >
        Probably the most complete micro-frontends solution you ever met
      </Modal>
    </>
  );
};

export default HelloModal;
