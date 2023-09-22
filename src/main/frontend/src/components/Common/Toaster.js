import toastr from "toastr";
import "toastr/build/toastr.min.css";

toastr.options = {
  positionClass: "toast-top-right",
  timeOut: 5000,
  extendedTimeOut: 1000,
  closeButton: false,
  debug: false,
  progressBar: false,
  preventDuplicates: true,
  newestOnTop: false,
  showEasing: "swing",
  hideEasing: "linear",
  showMethod: "fadeIn",
  hideMethod: "fadeOut",
  showDuration: 300,
  hideDuration: 1000,
};

export const successMsg = (message, title) => {
  if (title === null || title === "") {
    title = "success";
  }
  toastr.success(message, title);
};

export const warningMsg = (message, title) => {
  if (title === null || title === "") {
    title = "warning";
  }
  toastr.warning(message, title);
};

export const errorMsg = (message, title) => {
  if (title === null || title === "") {
    title = "error";
  }
  toastr.error(message, title);
};
