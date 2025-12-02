import { toast } from "sonner";

// This function is to show a confirmation before performing an action!
// @param {Function} onConfirm => callback function to run if the user clicks confirm
// @param {message} => the confirmation message 


export const confirmAction = (onConfirm, message = "Are you sure?") => {
  const toastId = toast(
    <div className="flex flex-col gap-2">
      <p className="text-sm ">{message}</p>
      <div className="flex gap-2 justify-end">
        <button
          onClick={() => {
            toast.dismiss(toastId);
            onConfirm();
          }}
          className="px-3 py-1 bg-amethyst-600 text-white rounded hover:bg-amethyst-700"
        >
          Confirm
        </button>
        <button
          onClick={() => toast.dismiss(toastId)}
          className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
        >
          Cancel
        </button>
      </div>
    </div>,
    { duration: Infinity }
  );
};
