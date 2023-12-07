import Slider from "../components/slider/Slider";
import SectionBar from "../components/sectionBar/SectionBar";
import CardsList from "../components/cardsList/CardsList";
import CardPopup from "../components/cardPopup/CardPopup";

export default function MainPage() {
  return (
    <>
      <Slider />
      <SectionBar />
      <CardsList />
      <CardPopup />
    </>
  );
}
