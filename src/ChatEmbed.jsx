import React, { useEffect, useRef } from "react";

const URL_APP = "https://localhost:3001";

const EmbedWidget = () => {
  const iframeRef = useRef(null);
  
  useEffect(() => {
    setTimeout(() => {}, 500);

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
        },
      };
      iframeRef.current.contentWindow.postMessage(widgetConfig, URL_APP);
    };
    const handleWidgetMessage = (event) => {
      console.log("tin nhắn widget:", event.data);
      if (event.data.type === "show_popup" && event.data.value === false) {
        console.log("Widget đã đóng.");
      }
    };

    window.addEventListener("message", handleWidgetMessage);
    iframeRef.current.onload = sendWidgetConfig;
    // return () => {
    //     console.log("remoooooooooooo");
    //   window.removeEventListener("message", handleWidgetMessage);
    // };
  }, []);

  return (
    <div>
      <h1>Nhúng Widget Chat</h1>
      <iframe
        ref={iframeRef}
        src={URL_APP}
        style={{
          width: "400px",
          height: "600px",
          border: "none",
        }}
        title="Chat Widget"
      ></iframe>
    </div>
  );
};

export default EmbedWidget;
