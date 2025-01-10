import { Toaster as ToasterProvider, ToastOptions } from "react-hot-toast";

const toastOptions: ToastOptions = {
    style: {
        backgroundColor: "#C14E0A",
        color: "#fff",
    },
    position: "top-right",
};

export default function Toaster() {
    return <ToasterProvider toastOptions={toastOptions} />;
}
