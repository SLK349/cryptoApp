import WalletCard from "../../components/metamask/WalletCard";
import Navbar from "../../components/navbar/Navbar";
import "./MetaMask.css";

const Metamask = () => {
  return (
    <div className="container-metamask">
      <Navbar />
      <div className="container-wallet">
        <WalletCard />
      </div>
    </div>
  );
};

export default Metamask;
