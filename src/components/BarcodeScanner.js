import React, { useEffect, useRef } from "react";
import Quagga from "quagga";

const BarcodeScanner = ({ onScan, onClose }) => {
  const isInitialized = useRef(false);

  useEffect(() => {
    if (!isInitialized.current) {
      Quagga.init(
        {
          inputStream: {
            name: "Live",
            type: "LiveStream",
            target: document.querySelector("#scanner"),
          },
          decoder: {
            readers: ["code_128_reader"],
          },
          locator: {
            halfSample: true,
            patchSize: "medium", // Увеличиваем размер области сканирования
          },
        },
        (err) => {
          if (err) {
            console.error("Ошибка инициализации Quagga:", err);
            return;
          }
          Quagga.start();
          isInitialized.current = true;
        }
      );

      Quagga.onDetected((data) => {
        onScan(data.codeResult.code);
        Quagga.stop();
        onClose(); // Закрываем окно после успешного сканирования
      });
    }

    // Очистка при размонтировании компонента
    return () => {
      if (isInitialized.current) {
        Quagga.stop();
        Quagga.offDetected(); // Отключаем обработчик
      }
    };
  }, [onScan, onClose]);

  return (
    <div style={{ position: "relative", width: "100%", height: "300px" }}>
      <div id="scanner" style={{ width: "100%", height: "100%" }}></div>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: 0,
          right: 0,
          height: "2px",
          backgroundColor: "red",
        }}
      ></div>
      <button
        onClick={onClose} // Вызываем onClose при нажатии на кнопку
        style={{ marginTop: "10px" }}
        className="btn btn-secondary"
      >
        Закрыть
      </button>
    </div>
  );
};

export default BarcodeScanner;
