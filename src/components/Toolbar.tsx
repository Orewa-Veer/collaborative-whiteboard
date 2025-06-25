"use client";

import { jsPDF } from "jspdf";
import { useRef } from "react";
import {
  BsCircle,
  BsEraserFill,
  BsMouse,
  BsPencilFill,
  BsPenFill,
  BsSquare,
  BsTextCenter,
  BsTrashFill,
} from "react-icons/bs";
import {
  PiArrowsClockwiseBold,
  PiArrowsCounterClockwiseBold,
} from "react-icons/pi";
import { WhiteboardHandle } from "./WhiteboardCanvas";

type Props = {
  whiteboardRef: React.RefObject<WhiteboardHandle | null>;
};

const handleDownloadImage = () => {
  const canvasEl = document.querySelector("canvas") as HTMLCanvasElement;
  if (!canvasEl) return;

  const image = canvasEl.toDataURL("image/png");
  const link = document.createElement("a");
  link.download = "whiteboard.png";
  link.href = image;
  link.click();
};

const handleDownloadPDF = () => {
  const canvasEl = document.querySelector("canvas") as HTMLCanvasElement;
  if (!canvasEl) return;

  const image = canvasEl.toDataURL("image/png");

  const pdf = new jsPDF({
    orientation: "landscape",
    unit: "px",
    format: [canvasEl.width, canvasEl.height],
  });

  pdf.addImage(image, "PNG", 0, 0, canvasEl.width, canvasEl.height);
  pdf.save("whiteboard.pdf");
};

const Toolbar = ({ whiteboardRef }: Props) => {
  const colorInputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div
      style={{
        position: "fixed",
        top: 10,
        left: 10,
        background: "#f0f0f0",
        padding: "10px",
        borderRadius: "8px",
        zIndex: 1000,
      }}
      className="bg-white/10 border-white/20 rounded-lg backdrop-blur-2xl shadow-xl flex items-center"
    >
      <input
        style={{
          padding: "1px 1px",
          border: "1px solid #ccc",
          cursor: "pointer",
        }}
        className="rounded-md p-3 "
        ref={colorInputRef}
        type="color"
        defaultValue="#000000"
        onChange={(e) => whiteboardRef.current?.setColor(e.target.value)}
      />
      <button
        className=" rounded-md backdrop-blur-sm px-3 py-1 border-black border text-center text-black m-2 font-bold font-sans bg-gray-200 toolbar flex gap-2 items-center "
        onClick={() => whiteboardRef.current?.setPen()}
      >
        <BsPenFill /> <span>Pen</span>
      </button>
      <button
        className="rounded-md backdrop-blur-sm px-3 py-1 border-black border text-center text-black m-2 font-bold font-sans bg-gray-200 toolbar flex gap-2 item-center"
        onClick={() => whiteboardRef.current?.setEraser()}
      >
        <BsEraserFill /> <span>Eraser</span>
      </button>
      <button
        className="rounded-md backdrop-blur-sm px-3 py-1 border-black border text-center text-black m-2 font-bold font-sans bg-gray-200 toolbar flex gap-2 item-center"
        onClick={() => whiteboardRef.current?.undo()}
      >
        <PiArrowsClockwiseBold /> <span>Undo</span>
      </button>
      <button
        className="rounded-md backdrop-blur-sm px-3 py-1 border-black border text-center text-black m-2 font-bold font-sans bg-gray-200 toolbar flex gap-2 item-center"
        onClick={() => whiteboardRef.current?.redo()}
      >
        <PiArrowsCounterClockwiseBold /> <span>Redo</span>
      </button>
      <button
        className="rounded-md backdrop-blur-sm px-3 py-1 border-black border text-center text-black m-2 font-bold font-sans bg-gray-200 toolbar flex gap-2 item-center"
        onClick={() => whiteboardRef.current?.clear()}
      >
        <BsTrashFill /> <span>Clear</span>
      </button>
      <button
        className="rounded-md backdrop-blur-sm px-3 py-1 border-black border text-center text-black m-2 font-bold font-sans bg-gray-200 toolbar flex gap-2 item-center"
        onClick={() => whiteboardRef.current?.addRect()}
      >
        <BsSquare />
        <span>Square</span>
      </button>
      <button
        className="rounded-md backdrop-blur-sm px-3 py-1 border-black border text-center text-black m-2 font-bold font-sans bg-gray-200 toolbar flex gap-2 item-center"
        onClick={() => whiteboardRef.current?.addCircle()}
      >
        <BsCircle /> <span>Circle</span>
      </button>
      <button
        className="rounded-md backdrop-blur-sm px-3 py-1 border-black border text-center text-black m-2 font-bold font-sans bg-gray-200 toolbar flex gap-2 item-center"
        onClick={() => whiteboardRef.current?.addText()}
      >
        <BsTextCenter /> <span>Text</span>
      </button>
      <button
        className="rounded-md backdrop-blur-sm px-3 py-1 border-black border text-center text-black m-2 font-bold font-sans bg-gray-200 toolbar flex gap-2 item-center"
        onClick={() => whiteboardRef.current?.toggleSelectMode(true)}
      >
        <BsMouse /> <span>Select</span>
      </button>
      <button
        className="rounded-md backdrop-blur-sm px-3 py-1 border-black border text-center text-black m-2 font-bold font-sans bg-gray-200 toolbar flex gap-2 item-center"
        onClick={() => whiteboardRef.current?.toggleSelectMode(false)}
      >
        <BsPencilFill /> <span>Draw</span>
      </button>
      <button
        className="rounded-md backdrop-blur-sm px-3 py-1 border-black border text-center text-black m-2 font-bold font-sans bg-gray-200 toolbar flex gap-2 item-center"
        onClick={handleDownloadImage}
      >
        Export as Image
      </button>
      <button
        className="rounded-md backdrop-blur-sm px-3 py-1 border-black border text-center text-black m-2 font-bold font-sans bg-gray-200 toolbar flex gap-2 item-center"
        onClick={handleDownloadPDF}
      >
        Export as PDF
      </button>
    </div>
  );
};

export default Toolbar;
