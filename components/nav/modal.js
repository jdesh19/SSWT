import { IoClose } from "react-icons/io5";

export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center transition-opacity ">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative border-2 border-gray-600">
        <button
          onClick={onClose}
          className="absolute text-2xl top-2 right-2 text-grey-500 hover:text-gray-800"
        >
          <IoClose/>
        </button>
        {children}
      </div>
    </div>
  );
}
