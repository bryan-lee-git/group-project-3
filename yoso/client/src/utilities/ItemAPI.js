import axios from "axios";

export default {
  //Get all items for a specific list.
  getItems: function(listId) {
    return axios.post(`/api/listitem/findAll`, {
      listId
    });
  },
  // Get a specific item on a list.
  getItem: function(listId, id) {
    return axios({
      method: `get`,
      url: `/api/listitem/${id}`,
      data: {
        listId: listId
      }
    });
  },
  // Create a new item for a list.
  createItem: function(data) {
    console.log(`from inside itemapi, here's the data being sent: `, data);

    return axios({
      method: `post`,
      url: `/api/listitem`,
      data: {
        data
      }
    });
  },
  // Edit a specific item on a list.
  updateItem: function(listId, id, data) {
    return axios({
      method: `put`,
      url: `/api/listitem/${id}`,
      data: {
        listId: listId,
        data
      }
    });
  },
  // Delete a specific item on a list.
  deleteItem: function(listId, id) {
    console.log(
      `inside deleteitem method of listitem, here's the incoming arguments: listId: ${listId}; id: ${id}`
    );
    return axios({
      method: `delete`,
      url: `/api/listitem/${id}`,
      data: {
        listId: listId
      }
    });
  }
};
