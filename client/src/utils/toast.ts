import { toast } from "react-toastify";

export const toastError = (message?: string) => {
  toast.error(message || "Something went wrong");
};
