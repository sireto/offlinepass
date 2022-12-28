import Swal from "sweetalert2";

interface SuccessModalViewProps {
  text?: string;
}

export default function SuccessModalView({ text = "" }: SuccessModalViewProps) {
  return Swal.fire({
    position: "top-end",
    icon: "success",
    title: "Your work has been saved",
    text: `${text}`,
    showConfirmButton: false,
  });
}
