import "../footer/footer.scss";

import tgIcon from "../../resources/icons/footer/tgIcon.svg";
import vkIcon from "../../resources/icons/footer/vkIcon.svg";

import mealLogo from "../../resources/icons/mealLogo.svg";
import phoneLogo from "../../resources/icons/footer/phone.svg";
import { Link } from "react-router-dom";
import { ReactSVG } from "react-svg";

export default function Footer() {
  return (
    <footer>
      <div className="footer_sections">
        <div className="footer_sections_main">
          <img src={mealLogo} alt="footer meal logo" />
        </div>
        <div className="footer_sections_contacts">
          <span className="number_title">Номер для заказа</span>
          <div className="phone_number">
            <img className="phone_number_icon" src={phoneLogo} />
            <Link to="tel:+7(930)833-38-11">+7(930)833-38-11</Link>
          </div>
        </div>
        <div className="footer_sections_networks">
          <span className="number_title">Мы в соцсетях</span>
          <div className="networks_list">
            <button className="project_button">
              <Link to="https://t.me/beforedisappear">
                <ReactSVG src={tgIcon} />
              </Link>
            </button>
            <button className="project_button">
              <Link to="https://vk.com">
                <ReactSVG src={vkIcon} />
              </Link>
            </button>
          </div>
        </div>
      </div>
      {/* <div className="footer_about_site"></div> */}
    </footer>
  );
}
