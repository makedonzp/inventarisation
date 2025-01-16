import React, { useEffect, useRef } from "react";
import Quagga from "quagga";

const BarcodeScanner = ({ onScan, onClose }) => {
  const isInitialized = useRef(false);

  useEffect(() => {
    if (!isInitialized.current) {
      console.log("Инициализация Quagga...");

      Quagga.init(
        {
          inputStream: {
            name: "Live",
            type: "LiveStream",
            target: document.querySelector("#scanner"),
            constraints: {
              width: { min: 640 },
              height: { min: 480 },
              aspectRatio: { ideal: 1.777 },
              facingMode: "environment",
            },
          },
          decoder: {
            readers: ["ean_reader"], // Используем EAN-ридер
          },
          locator: {
            halfSample: true,
            patchSize: "medium",
          },
        },
        (err) => {
          if (err) {
            console.error("Ошибка инициализации Quagga:", err);
            return;
          }
          console.log("Quagga успешно инициализирован.");
          Quagga.start();
          isInitialized.current = true;
        }
      );

      Quagga.onDetected((data) => {
        const rawCode = data.codeResult.code;
        const cleanedCode = rawCode.replace(/\s/g, ""); // Удаляем пробелы
        console.log("Штрихкод обнаружен:", cleanedCode);
        console.log("Формат штрихкода:", data.codeResult.format);
        console.log("Данные штрихкода:", data.codeResult);

        onScan(cleanedCode);
        Quagga.stop();
        onClose();
      });

      Quagga.onProcessed((result) => {
        if (result) {
          console.log("Обработка кадра...");
        }
      });
    }

    // Очистка при размонтировании компонента
    return () => {
      if (isInitialized.current) {
        console.log("Остановка Quagga...");
        Quagga.stop();
        Quagga.offDetected();
      }
    };
  }, [onScan, onClose]);

  return (
    <div style={{ position: "relative", width: "100%", height: "100vh" }}>
      <div
        id="scanner"
        style={{
          width: "100%",
          height: "100%",
          overflow: "hidden",
          position: "relative",
        }}
      ></div>
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
        onClick={onClose}
        style={{
          position: "absolute",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1000,
        }}
        className="btn btn-secondary"
      >
        Закрыть
      </button>
    </div>
  );
};

export default BarcodeScanner;
