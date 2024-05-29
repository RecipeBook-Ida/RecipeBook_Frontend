import React, { useState, useEffect } from "react";
import ModalContent from "./ModalContent";
import { FaTimes } from "react-icons/fa";
import { FaExclamationTriangle } from "react-icons/fa";

interface ModalProps {
  isOpen: boolean;
  modalContent: string | null;
  closeModal: () => void;
  onSave?: () => void;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  closeModal,
  modalContent,
  onSave,
}) => {
  const [isWarning, setIsWarning] = useState<boolean>(false);

  useEffect(() => {
    if (modalContent?.toLowerCase().includes("delete")) setIsWarning(true);
    else setIsWarning(false);
  }, [modalContent]);

  return (
    isOpen && (
      <div className="absolute inset-0 h-full overflow-y-auto pb-20">
        <div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity"></div>
        <div className="bg-white relative max-w-xl my-12 mx-auto p-4 rounded-xl ">
          <ModalContent filter={modalContent} onSave={onSave} />
          <FaTimes
            className="h-6 w-6 hover:bg-gray-300 hover:bg-opacity-50 rounded-full cursor-pointer absolute right-3 top-3"
            onClick={closeModal}
          />
        </div>
      </div>
    )
  );
};

export default Modal;

/* 
        <div
          className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity"></div>

          <div className="relative overflow-hidden rounded-lg bg-white text-center shadow-xl transition-all sm:my-8 sm:max-w-4xl max-h-screen">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 text-black">
              <FaTimes
                className="h-6 w-6 text-black hover:bg-gray-300 hover:bg-opacity-50 rounded-full cursor-pointer absolute right-5 top-3"
                onClick={closeModal}
              />

              {isWarning && (
                <div className="mx-auto flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-8 sm:w-8 absolute -mb-5 top-3">
                  <FaExclamationTriangle className="h-5 w-5 text-red-400" />
                </div>
              )}

              <div className="mt-5">
                <div className="overflow-y-auto">
                  <ModalContent filter={modalContent} onSave={onSave} />
                </div>
                {isWarning && (
                  <button
                    className="mt-3 inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 w-auto"
                    onClick={closeModal}
                  >
                    Avbryt
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
       */
