import axios from "axios";
import { CartModel } from "../../model/CartOrder/CartModel";

const STRAPI_URL = import.meta.env.VITE_APP_STRAPI_URL;
export const serverUrl= import.meta.env.VITE_APP_MY_SERVER_URL;
export function CreateOrder(data: CartModel) {
    

    return axios.post(`${serverUrl}/add-order`, data)
        .then(response => {
           
            return response;
        })
        .catch(err => {
            console.error("Error creating order:", err);
            throw err;
        });
}
export function UpdateOrder(data: CartModel) {
    

    return axios.post(`${serverUrl}/update-order`, data)
        .then(response => {
           
            return response;
        })
        .catch(err => {
            console.error("Error creating order:", err);
            throw err;
        });
}
export function ApproveOrder(data: CartModel) {
    

    return axios.post(`${serverUrl}/approve-order`, data)
        .then(response => {
           
            return response;
        })
        .catch(err => {
            console.error("Error on Approving order:", err);
            
            throw err;
        });
}
export function DeleteOrderDB(orderId:number) {
    const data={
        orderId:orderId
    }

    return axios.post(`${serverUrl}/delete-order`, data)
        .then(response => {
           
            return response;
        })
        .catch(err => {
            console.error("Error on Delete order:", err);
            
            throw err;
        });
}

