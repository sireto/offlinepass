import Swal from "sweetalert2";

export function showSuccessModal(text = "") {
  return Swal.fire({
    icon: "success",
    title: "Your work has been saved",
    text: `${text}`,
    showConfirmButton: false,
  });
}
