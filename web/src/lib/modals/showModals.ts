import Swal from "sweetalert2";
type iconType = "success" | "error" | "info" | "question" | "warning";
export function showSweetAlertModal(title: string, text = "", type: iconType) {
  return Swal.fire({
    icon: `${type}`,
    title: `${title}`,
    text: `${text}`,
    showConfirmButton: false,
  });
}
