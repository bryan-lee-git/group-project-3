import axios from "axios";

export default {
  //Get all User Lists items.
  getLists: function(userId) {
    return axios.post(`/api/list/findAll`, {
      userId
    });
  },
  // Get a specific User List.
  getList: function(listId) {
    return axios({
      method: `post`,
      url: `/api/list/${listId}`,
      data: {
        listId: listId
      }
    });
  },
  getYoso: function(userId) {
    return axios({
      method: `get`,
      url: `/api/list/${userId}`,
      data: {
        UserId: userId
      }
    });
  },
  // Create just a new User List.
  createList: function(userId, data) {
    return axios({
      method: `post`,
      url: `/api/list/`,
      data: {
        UserId: userId,
        name: data.name
      }
    });
  },
  // Edit a specific User List.
  updateList: function(userId, listId, data) {
    return axios({
      method: `put`,
      url: `/api/list/${listId}`,
      data: {
        userId: userId,
        data
      }
    });
  },
  // Delete a specific User List.
  deleteList: function(userId, listId) {
    return axios({
      method: `delete`,
      url: `/api/list/${listId}`,
      data: {
        userId: userId
      }
    });
  }
};
