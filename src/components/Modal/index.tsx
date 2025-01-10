import React from "react";
import ReactDOM from "react-dom";
import { IoMdClose } from "react-icons/io";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white shadow-lg relative max-w-md w-[90%] sm:w-full">
                {/* Botão de fechar */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-[#4F372F]  bg-white rounded-full w-8 h-8 flex justify-center items-center"
                >
                    <IoMdClose size={20} />
                </button>
                {children}
            </div>
        </div>,
        document.getElementById("modal-root") as HTMLElement
    );
};

export default Modal;
