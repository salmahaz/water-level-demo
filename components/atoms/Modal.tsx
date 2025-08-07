import Button from "./Button";

interface ModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  onSave?: () => void;
  title?: string;
  children?: React.ReactNode;
  saveText?: string;
}

export default function Modal({
  isOpen = false,
  onClose = () => {},
  onSave = () => {},
  title = "Edit",
  children,
  saveText = "Save",
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 p-4 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl p-4 w-full max-w-md transform transition-all duration-300">
        <h2 className="text-gray-800 py-2">{title}</h2>
        <div className="border-b border-gray-200 pb-2"></div>
        <div className="py-2">{children}</div>
        <div className="w-full flex flex-wrap justify-end gap-2 pt-4">
          <Button text="Cancel" onClick={onClose} className="mx-0" />
          <Button
            text={saveText}
            type="button"
            isPrimary
            onClick={onSave}
            className="mx-0"
          />
        </div>
      </div>
    </div>
  );
}
