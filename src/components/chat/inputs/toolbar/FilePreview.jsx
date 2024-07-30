import { Avatar, Box, Dialog, DialogContent } from '@mui/material';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { FilePresentIcon } from 'assets/humanIcons';
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
      setIsDrawing(true);
    }
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) {
      return;
    }
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
    <Box
      component="canvas"
      ref={canvasRef}
      sx={{
        cursor: 'crosshair',
        borderRadius: 1,
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

export const FilePreview = ({ type, item, isOpen, onOpenChange }) => {
  return (
    <Dialog open={isOpen} onClose={() => onOpenChange(false)} maxWidth="lg">
      <DialogContent
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          outline: 'none',
          border: 'none',
          backgroundColor: 'transparent',
        }}
      >
        {(() => {
          if (type === 'image') {
            const imageItem = item;
            return imageItem.file ? (
              <DrawingCanvas imageItem={imageItem} />
            ) : (
              <Avatar
                className="rounded"
                src={imageItem.base64 || imageItem.url}
                alt="File image"
                width={2000}
                height={2000}
                style={{
                  maxHeight: '67vh',
                  maxWidth: '67vw',
                }}
              />
            );
          } else if (type === 'file_item') {
            const fileItem = item;
            return (
              <div
                style={{
                  backgroundColor: '#1C1C1C',
                  color: '#FFFFFF',
                  height: '50vh',
                  minWidth: '700px',
                  overflow: 'auto',
                  whiteSpace: 'pre-wrap',
                  borderRadius: '8px',
                  padding: '16px',
                }}
              >
                <div>{fileItem.content}</div>
              </div>
            );
          } else if (type === 'file') {
            return (
              <div
                style={{
                  borderRadius: '8px',
                  backgroundColor: '#2196F3',
                  padding: '16px',
                }}
              >
                <FilePresentIcon />
              </div>
            );
          }
        })()}
      </DialogContent>
    </Dialog>
  );
};

export default FilePreview;
