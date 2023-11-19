import "../sectionBar/sectionBar.scss";

import combo from "../../resources/icons/sections/combo.svg";
import burgers from "../../resources/icons/sections/burgers.svg";
import snacks from "../../resources/icons/sections/snacks.svg";
import hotdogs from "../../resources/icons/sections/hotdogs.svg";
import donuts from "../../resources/icons/sections/donuts.svg";

import { ReactSVG } from "react-svg";
import { NavLink } from "react-router-dom";

export default function SectionBar() {
  const sections = [
    { url: "", title: "Все", icon: combo },
    { url: "/burgers", title: "Бургеры", icon: burgers },
    { url: "/snacks", title: "Закуски", icon: snacks },
    { url: "/hotdogs", title: "Хот-доги", icon: hotdogs },
    { url: "/donuts", title: "Пончики", icon: donuts },
  ];
  return (
    <div className="section_bar_container">
      <div className="section_bar">
        {sections.map((el, i) => (
          <NavLink
            key={i}
            className={({ isActive }) =>
              isActive ? "section_bar_el sbe_active" : "section_bar_el "
            }
            to={el.url}
            preventScrollReset={true}
          >
            <div className="section_bar_el_icon">
              <ReactSVG src={el.icon} />
            </div>
            <div className="section_bar_el_content ">{el.title}</div>
          </NavLink>
        ))}
      </div>
    </div>
  );
}
