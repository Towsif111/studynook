"use client";

import { Toaster } from "react-hot-toast";

const ToasterProvider = () => {
    return (
        <Toaster
            position="top-right"
            toastOptions={{
                style: {
                    background: "#0b0b0c",
                    color: "#e5e7eb",
                    border: "1px solid rgba(82, 82, 82, 0.6)",
                },
            }}
        />
    );
};

export default ToasterProvider;
