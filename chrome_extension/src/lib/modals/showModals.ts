import Swal, { type SweetAlertIcon } from "sweetalert2";

export function showSweetAlertModal(
  title: string,
  text = "",
  type: SweetAlertIcon
) {
  return Swal.fire({
    icon: type,
    title,
    text,
    showConfirmButton: false,
    customClass: { popup: "swal-wide" },
  });
}
