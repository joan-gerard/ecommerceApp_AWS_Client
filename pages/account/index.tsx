import React, { useEffect, useState } from "react";
import Axios, { Method, AxiosRequestConfig } from "axios";
import { useStateContext } from "@/context/stateContext";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

const getData = async (cognitoUser: string, setCustomerOrdersCb: any) => {
  const requestConfig: AxiosRequestConfig = {
    // headers,
    method: "GET",
    url: `${baseUrl}/orders/${cognitoUser}`,
  };
  const data: any = await Axios.request(requestConfig).then((res) => res.data);

  console.log(data);
  setCustomerOrdersCb(data);
};

const Account = () => {
  const { cognitoUser } = useStateContext();
  const [customerOrders, setCustomerOrders] = useState([]);

  useEffect(() => {
    if (cognitoUser) {
      getData(cognitoUser, setCustomerOrders);
    }
  }, [cognitoUser]);

  return (
    <div>
      {customerOrders?.length > 0
        ? customerOrders.map((order: any) => (
            <div key={order.orderId}>
              <p>{order.orderId}</p>
              <p>{order.status}</p>
            </div>
          ))
        : null}
    </div>
  );
};

export default Account;
