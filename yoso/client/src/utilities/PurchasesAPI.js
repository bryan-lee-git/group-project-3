import axios from "axios";

export default {
  //Get all Purchases for a User.
  getPurchases: function(id) {
    return axios.post(`/api/purchases/all`, { PantryId: id });
  },
  // Get a specific User purchase.
  getPurchase: function(id) {
    return axios.get(`/api/purchases/${id}`);
  },
  // Create a new purchase.
  createPurchase: function(data) {
    return axios.post(`/api/purchases`, data);
  },
  // Edit a specific purchase.
  updatePurchase: function(id) {
    return axios.put(`/api/purchases/${id}`);
  },
  // Delete a specific purchase.
  deletePurchase: function(id) {
    return axios.delete(`/api/purchases/${id}`);
  }
};
