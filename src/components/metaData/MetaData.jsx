import { Helmet } from "react-helmet-async";

export default function MetaData({ title }) {
  return (
    <Helmet>
      <title>
        YourMeal | {title || "YourMeal - сервис по доставке быстрого питания"}
      </title>
      <link rel="canonical" href="http://localhost:5173" />
    </Helmet>
  );
}
