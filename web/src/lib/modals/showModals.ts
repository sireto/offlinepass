import Swal from "sweetalert2";

export function showSuccessModal(title: string, text = "") {
  return Swal.fire({
    icon: "success",
    title: `${title}`,
    text: `${text}`,
    showConfirmButton: false,
  });
}
