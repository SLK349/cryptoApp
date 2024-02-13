import {BrowserRouter} from "react-router-dom";
import {Router, PrivateRouter} from "./Router";
import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {userContext} from "./utils/Context";
import {socket} from "./socket";
import AxiosInterceptorSetup from "./utils/authService";
import ReconnectModal from "./components/ReconnectModal/ReconnectModal";
import {PayPalScriptProvider} from "@paypal/react-paypal-js";
import {REACT_APP_PAYPAL_CLIENT_ID} from "./Config/config";
import {Toaster} from "sonner";
import axios from "axios";

function App() {
    const [userInfo, setUserInfo] = useState({
        isConnected: false,
    });
    const [isSubscriber, setIsSubscriber] = useState(false);

    const checkSubscription = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get("http://localhost:3001/user/isSubscriber", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-type": "application/json",
                },
            });
            const subscriptionStatus = response.data[0].abonne;
            console.log(subscriptionStatus);
            setIsSubscriber(subscriptionStatus === 1);
        } catch (error) {
            console.error('Erreur lors de la récupération du statut d\'abonné:', error);

        }
    }

    useEffect(() => {
        const token = localStorage.getItem("token");
        console.log(token);
        if (token) {
            let content = {...userInfo};
            content.isConnected = true;
            setUserInfo(content);
            checkSubscription();
            socket.connect();
            console.log("socket connected");
        } else {
            socket.disconnect();
            console.log("socket disconnected");
        }


    }, [userInfo.isConnected]);

    const [notifData, setNotifData] = useState([]);
    const [showReco, setShowReco] = useState(false);

    socket.on("notif", (data) => {
        const parsedData = JSON.parse(data);
        setNotifData(parsedData);
    });

    return (
        <PayPalScriptProvider options={{"client-id": REACT_APP_PAYPAL_CLIENT_ID}}>
            <BrowserRouter>
                {isSubscriber ? (
                    // <userContext.Provider value={{...userInfo, setUserInfo, notifData, setShowReco}}>
                    <userContext.Provider
                        value={{...userInfo, setUserInfo, notifData, setShowReco, ...isSubscriber, setIsSubscriber}}>
                        <AxiosInterceptorSetup setUserInfo={setUserInfo} setShowReco={setShowReco}/>
                        <PrivateRouter/>
                        <Toaster/>
                    </userContext.Provider>
                ) : (
                    <userContext.Provider value={{...userInfo, setUserInfo, ...isSubscriber, setIsSubscriber}}>
                        <Router/>
                        <Toaster/>
                        <ReconnectModal show={showReco} message="Votre session a expirée. Veuillez vous reconnectez."
                                        onClose={() => setShowReco(false)}/>
                    </userContext.Provider>
                )}
            </BrowserRouter>
        </PayPalScriptProvider>
    );
}

export default App;
