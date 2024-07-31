import React, { useContext, useEffect, useRef, useState } from 'react';
import { useChatStore } from 'contexts/ChatProvider';

const DrawingCanvas = ({ imageItem }) => {
  const { setNewMessageImages } = useChatStore();
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parentElement = canvas?.parentElement;
    if (canvas && parentElement) {
      const context = canvas.getContext('2d');
      const image = new Image();

      image.onload = () => {
        const aspectRatio = image.width / image.height;

        let newWidth = parentElement.clientWidth;
        let newHeight = newWidth / aspectRatio;

        if (newHeight > parentElement.clientHeight) {
          newHeight = parentElement.clientHeight;
          newWidth = newHeight * aspectRatio;
        }

        canvas.width = newWidth;
        canvas.height = newHeight;

        context?.drawImage(image, 0, 0, newWidth, newHeight);
      };

      image.src = imageItem.url;
    }
  }, [imageItem.url]);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    const context = canvasRef.current?.getContext('2d');
    if (context) {
      context.strokeStyle = 'red';
      context.lineWidth = 2;
      context.beginPath();
      context.moveTo(offsetX, offsetY);
    }
    setIsDrawing(true);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = nativeEvent;
    const context = canvasRef.current?.getContext('2d');
    context?.lineTo(offsetX, offsetY);
    context?.stroke();
  };

  const finishDrawing = () => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    context?.closePath();
    setIsDrawing(false);

    if (canvas) {
      const dataURL = canvas.toDataURL('image/png');
      fetch(dataURL)
        .then(res => res.blob())
        .then(blob => {
          const newImageFile = new File([blob], 'drawing.png', {
            type: 'image/png',
          });

          setNewMessageImages(prevImages => {
            return prevImages.map(img => {
              if (img.url === imageItem.url) {
                return { ...img, base64: dataURL, file: newImageFile };
              }
              return img;
            });
          });
        });
    }
  };

  return (
    <canvas
      ref={canvasRef}
      style={{
        cursor: 'crosshair',
        borderRadius: '8px',
        maxHeight: '67vh',
        maxWidth: '67vw',
      }}
      width={2000}
      height={2000}
      onMouseDown={startDrawing}
      onMouseUp={finishDrawing}
      onMouseMove={draw}
      onMouseLeave={finishDrawing}
    />
  );
};

export default DrawingCanvas;
