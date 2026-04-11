import toast from "react-hot-toast";

// ✅ Success
export const successToast = (msg) => {
  toast.success(msg, {
    duration: 3000,
    style: {
      background: "#1e293b",
      color: "#fff",
      border: "1px solid #22c55e"
    }
  });
};

// ❌ Error
export const errorToast = (msg) => {
  toast.error(msg, {
    duration: 3000,
    style: {
      background: "#1e293b",
      color: "#fff",
      border: "1px solid #ef4444"
    }
  });
};

// ⚠️ Info
export const infoToast = (msg) => {
  toast(msg, {
    duration: 3000,
    icon: "ℹ️",
    style: {
      background: "#1e293b",
      color: "#fff",
    }
  });
};