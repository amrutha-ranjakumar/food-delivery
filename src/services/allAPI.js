import { commonAPI } from "./commonAPI";
import { BASE_URL } from "./baseURL";

// 1) Register user
export const registerAPI = async(user) => {
    return await commonAPI("post", `${BASE_URL}/user/register`, user, "");
};

// 2) Login user
export const loginAPI = async(reqBody) => {
    return await commonAPI("post", `${BASE_URL}/user/login`, reqBody, "");
};

// 3) Get all dishes
export const alldishesmenus = async (reqHeader) => {
    return await commonAPI('GET', `${BASE_URL}/dishesmenu/all-dishesmenu`, '', reqHeader);
};


// 1) deliveryinformation user
export const deliveryInformationAPI = async(user) => {
    return await commonAPI("post", `${BASE_URL}/addDeliveryInformation`, user, "");
};







