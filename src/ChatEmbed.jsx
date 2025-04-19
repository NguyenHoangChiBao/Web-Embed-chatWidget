import React, { useEffect, useRef, useState } from "react";

const URL_APP = "https://zvq42vqz-3001.asse.devtunnels.ms";
// const URL_APP = "https://alternate-replace-giants-fact.trycloudflare.com";

const EmbedWidget = () => {
  const iframeRef = useRef(null);
  const [isWidgetClosed, setIsWidgetClosed] = useState(false);

  useEffect(() => {
    const sendWidgetConfig = () => {
      const widgetConfig = {
        type: "show_popup",
        value: true,
        widget: {
          dialog: {
            width: 400,
            height: 600,
            color: "#007bff",
            title: "Chat với chúng tôi",
          },
          form: {
            isRequireInformation: true,
          },
          companyId: "6728390d883e0383efc8cd4c",
          mode: "desktop",
        },
      };
      iframeRef.current.contentWindow.postMessage(widgetConfig, URL_APP);
    };

    const handleWidgetMessage = (event) => {
      console.log("tin nhắn widget:", event.data);
      if (event.data.type === "show_popup" && event.data.value === false) {
        setIsWidgetClosed(true); // Đóng widget
      }
    };

    window.addEventListener("message", handleWidgetMessage);
    iframeRef.current.onload = sendWidgetConfig;

    return () => {
      window.removeEventListener("message", handleWidgetMessage);
    };
  }, []);

  const reconnectWidget = () => {
    window.location.reload(); // Mở lại widget
  };

  return (
    <div>
      <h1>Nhúng Widget Chat</h1>
      {isWidgetClosed ? (
        <div>
          <p>Widget đã đóng</p>
          <button onClick={reconnectWidget}>Kết nối lại</button>
        </div>
      ) : (
        <iframe
          ref={iframeRef}
          src={URL_APP}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            border: "none",
            zIndex: 9999,
            pointerEvents: isWidgetClosed ? "none" : "auto", // Nếu muốn ẩn tương tác khi đóng
          }}
          title="Chat Widget"
        ></iframe>
      )}
    </div>
  );
};

export default EmbedWidget;