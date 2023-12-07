import { Link } from "react-router-dom";
import MetaData from "../components/metaData/MetaData";

export default function Page404() {
  return (
    <>
      <MetaData title={"Страница не найдена"} />
      <h1 style={{ color: "red" }}> Page Not Found | 404</h1>
      <br></br>
      <Link to="/" style={{ textDecoration: "none", color: "red" }}>
        вернуться на главную
      </Link>
    </>
  );
}
