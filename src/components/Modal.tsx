import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { IoMdClose } from "react-icons/io";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function Modal({ isOpen, onClose, children }: Props) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "visible";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <section
      className="fixed inset-0 z-40 flex justify-center items-center"
      style={{ background: "rgba(7,11,16,0.85)", backdropFilter: "blur(8px)" }}
      onClick={onClose}
    >
      <div
        className="w-11/12 md:w-3/4 lg:w-2/4 aspect-video relative rounded-2xl overflow-hidden"
        style={{
          border: "1px solid rgba(245,158,11,0.3)",
          boxShadow: "0 0 60px rgba(245,158,11,0.15), 0 20px 60px rgba(0,0,0,0.6)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full flex justify-center items-center 
                     transition-all duration-300 hover:scale-110"
          style={{ background: "rgba(245,158,11,0.9)", color: "#0f1117" }}
          onClick={onClose}
          aria-label="Close modal"
        >
          <IoMdClose size="1.2rem" />
        </button>
        {children}
      </div>
    </section>,
    document.getElementById("modal") as HTMLDivElement
  );
}
