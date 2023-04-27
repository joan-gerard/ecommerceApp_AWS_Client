import React, { useEffect, useState } from "react";
import Axios, { AxiosRequestConfig } from "axios";
import { useStateContext } from "@/context/stateContext";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

const getOrderHistory = async (cognitoUser: string, setCustomerOrdersCb: any) => {
  const requestConfig: AxiosRequestConfig = {
    // headers,
    method: "GET",
    url: `${baseUrl}/orders/${cognitoUser}`,
  };
  const data: any = await Axios.request(requestConfig).then((res) => res.data);

  setCustomerOrdersCb(data);
};

const Account = () => {
  const { cognitoUser } = useStateContext();
  const [customerOrders, setCustomerOrders] = useState([]);

  useEffect(() => {
    if (cognitoUser) {
      getOrderHistory(cognitoUser, setCustomerOrders);
    }
  }, [cognitoUser]);

  console.log(customerOrders)

  return (
    <div className="account-wrapper">
      {customerOrders?.length > 0
        ? customerOrders.map((order: any) => (
            <div key={order.orderId} className="order">
              <p>{order.orderId}</p>
              <p>{order.status}</p>
            </div>
          ))
        : null}
    </div>
  );
};

export default Account;
