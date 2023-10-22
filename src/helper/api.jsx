import axios from "axios";

export default class Api {
  constructor() {
    this.api_token = null;
    this.client = null;
    // this.api_url = process.env.REACT_APP_API_ENDPOINT;
    this.api_url = "http://localhost:8080/";
  }

  init = () => {
    // this.api_token = getCookie("ACCESS_TOKEN");

    let headers = {
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS, PUT",
      "Access-Control-Allow-Headers":
        "Content-Type, Authorization, X-Requested-With",
    };

    // if (this.api_token) {
    //   headers.Authorization = `Bearer ${this.api_token}`;
    // }

    this.client = axios.create({
      baseURL: this.api_url,
      timeout: 31000,
      headers: headers,
    });

    return this.client;
  };

  getAccounts = (params) => {
    return this.init().get("/api/v1/accounts", { params: params });
  };

  getAccountsWithTotal = (params) => {
    return this.init().get("/api/v1/accounts/total", { params: params });
  };

  addNewAccount = (data) => {
    return this.init().post("/api/v1/accounts", data);
  };

  getCategories = (params) => {
    return this.init().get("/api/v1/categories", { params: params });
  };

  getTransactions = (params) => {
    return this.init().get("/api/v1/transactions", { params: params });
  };

  getCategoriesWithTotal = (params) => {
    return this.init().get("/api/v1/categories/total", { params: params });
  };

  updateAccount = (id, payload) => {
    return this.init().put(`/api/v1/accounts/${id}/update`, payload);
  };

  updateTransactionDate = (id, payload) => {
    return this.init().put(`/api/v1/transactions/${id}/update-date`, payload);
  };
}
