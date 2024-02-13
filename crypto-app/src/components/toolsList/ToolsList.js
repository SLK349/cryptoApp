import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalculator, faWallet } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "./ToolsList.css";

const ToolsList = () => {
  const navigate = useNavigate();

  return (
    <div className="container-toolsList">
      <ul onClick={(e) => navigate("/tools")}>
        <FontAwesomeIcon icon={faCalculator} />
        <li>Position Size</li>
      </ul>
      <ul onClick={(e) => navigate("/metamask")}>
        <FontAwesomeIcon icon={faWallet} />
        <li> MetaMask</li>
      </ul>
    </div>
  );
};

export default ToolsList;
