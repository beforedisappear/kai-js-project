import { store } from "../store";
import { toast } from "react-toastify";

//display method of app popup
export function onShowPopup(e, state, actionCreator, status = "global") {
  //checker for dark area
  if (!state && e?.currentTarget != e?.target) return;
  if (status === "global") store.dispatch(actionCreator(state));
  else if (status === "local") actionCreator(state);
  scrollBarController(state);
}

//method to hide and display ScrollBar w/o window shaking
function scrollBarController(state) {
  const scrollBarWidth =
    window.innerWidth - document.documentElement.clientWidth;
  const body = document.body;

  if (state) {
    body.style.cssText += `padding-right: ${scrollBarWidth}px; overflow-y: hidden;`;
  }
  if (!state) {
    const popup = document.querySelector(".popup-container");
    const styles_applied = window.getComputedStyle(popup);
    popup.style.left = styles_applied.left;
    body.style.cssText = "";
  }
}

export function toastSuccess(promise, mess) {
  toast.update(promise, {
    render: mess,
    type: "success",
    isLoading: false,
    autoClose: 3000,
  });
}

export function toastError(promise, error) {
  const err = error?.data?.exceptionName || "Непредвиденная ошибка";
  console.error(error);

  toast.update(promise, {
    render: err,
    type: "error",
    isLoading: false,
    autoClose: 3000,
  });
}

//error div creator for register form
export const errorDiv = (prop, shift) => {
  if (prop)
    return (
      <div className="form-error" style={{ top: shift }}>
        {prop?.message}
      </div>
    );
  else return null;
};
