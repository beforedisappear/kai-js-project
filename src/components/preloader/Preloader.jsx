import "./preloader.scss";

export default function Preloader({
  isAbsolute,
  width = 64,
  height = 64,
  borderWidth = 6,
}) {
  // if isAbsolute we use css class with position fixed
  // else "margin: 0 auto"
  return (
    <div className={isAbsolute ? "preloader2" : "preloader2_center"}>
      <div className="lds-ring">
        <div style={{ width, height, borderWidth }}></div>
        <div style={{ width, height, borderWidth }}></div>
        <div style={{ width, height, borderWidth }}></div>
        <div style={{ width, height, borderWidth }}></div>
      </div>
    </div>
  );
}
