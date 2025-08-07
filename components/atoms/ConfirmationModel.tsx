interface ModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  formAction?: () => void;
  title?: string;
  message?: string;
}

export default function ConfirmationModal({
  isOpen = false,
  onClose = () => {},
  formAction = () => {},
  title = "Confirmation",
  message = "Are you sure?",
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 p-4 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md transform transition-all duration-300">
        <h2 className="text-gray-800">{title}</h2>
        <div className="border-b border-gray-200 pb-2"></div>

        <p className="text-gray-500 text-sm py-2">{message}</p>

        <form className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="p-2 bg-gray-200 rounded-lg">
            Cancel
          </button>
          <button
            type="submit"
            formAction={formAction}
            className="p-2 bg-red-500 text-white rounded-lg">
            Confirm
          </button>
        </form>
      </div>
    </div>
  );
}
