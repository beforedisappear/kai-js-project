import { Link } from "react-router-dom";

export default function Page404() {
  return (
    <>
      <h1 style={{ color: "red" }}> Page Not Found | 404</h1>
      <br></br>
      <Link to="/" style={{ textDecoration: "none", color: "red" }}>
        вернуться на главную
      </Link>
    </>
  );
}
