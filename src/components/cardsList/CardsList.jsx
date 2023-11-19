import { useParams } from "react-router-dom";

import { Helmet } from "react-helmet-async";

const sectionTitles = {
  burgers: "Бургеры",
  snacks: "Снеки",
  hotdogs: "Хот-доги",
  donuts: "Пончики",
};

export default function CardsList() {
  const { section } = useParams();

  return (
    <>
      <Helmet>
        <title>
          YourMeal |{" "}
          {sectionTitles?.[section] ||
            "YourMeal - сервис по доставке быстрого питания"}
        </title>
        <link rel="canonical" href="http://localhost:5173" />
      </Helmet>
    </>
  );
}
