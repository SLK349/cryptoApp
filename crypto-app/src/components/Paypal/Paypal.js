import React, {useState, useEffect} from "react";
import {PayPalScriptProvider, PayPalButtons} from "@paypal/react-paypal-js";
import {REACT_APP_PAYPAL_CLIENT_ID} from "../../Config/config";
import {toast} from "sonner";
import axios from "axios";
import {API_ENDPOINTS} from "../../utils/constants";
import {userContext} from "../../utils/Context";

const PaypalCheckout = (props) => {
    const [success, setSuccess] = useState(false);
    const [orderID, setOrderID] = useState(false);
    const {product} = props;
    const createOrder = (data, actions) => {
        return actions.order
            .create({
                purchase_units: [
                    {
                        description: product.description,
                        amount: {
                            currency_code: "USD",
                            value: product.price,
                        },
                    },
                ],
            })
            .then((orderID) => {
                setOrderID(orderID);
                return orderID;
            });
    };

    // check Approval
    const onApprove = (data, actions) => {
        return actions.order.capture().then(function (details) {
            const {payer} = details;
            setSuccess(true);
        });
    };

    useEffect(() => {
        if (success) {
            toast("Payment successful, check your email for the order details");
            console.log("Order successful . Your order id is--", orderID);
            const token = localStorage.getItem("token");
            console.log(orderID, product);

            let data = {
                subscription_status: true,
                subscription_type: product.description,
                start_date: new Date(),
                end_date: new Date(),
                renewal_status: false,
            };

            // Calculer la date de fin
            if (data.subscription_type === "mensuel") {
                data.end_date.setMonth(data.start_date.getMonth() + 1);
            } else if (data.subscription_type === "annuel") {
                // Ajouter un an à la date de début
                data.end_date.setFullYear(data.start_date.getFullYear() + 1);
            }

            data.start_date = data.start_date.toISOString().slice(0, 19).replace("T", " ");
            data.end_date = data.end_date.toISOString().slice(0, 19).replace("T", " ");

            axios
                .post(
                    API_ENDPOINTS.CREATE_ABO,
                    {data},
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-type": "application/json",
                        },
                    }
                )
                .then((response) => {
                    console.log("Subscription created");

                })
                .catch((error) => {
                    console.error("Error creating subscription:", error);
                });
        } else {
            toast("Someting went wrong. Please try again");
        }
    }, [success]);

    return (
        <PayPalScriptProvider options={{"client-id": REACT_APP_PAYPAL_CLIENT_ID}}>
            <PayPalButtons key={product.price} style={{layout: "vertical"}} createOrder={createOrder}
                           onApprove={onApprove}/>
        </PayPalScriptProvider>
    );
};
export default PaypalCheckout;
