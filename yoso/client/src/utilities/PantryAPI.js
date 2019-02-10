import axios from "axios";

export default {
  //Get all Pantry items.
  getPantry: function(UserId, sort) {
    return axios.post(`/api/pantry/all`, {
      UserId: UserId,
      sort: sort
    });
  },
  // Get a specific Pantry item.
  getPantryItembyId: function(id) {
    return axios.get(`/api/pantry/${id}`);
  },

  getPantryItem: function(UserId, name) {
    const data = { UserId: UserId, name: name };
    console.log(
      `inside pantryapi, get pantryitem, here's UserId: ${UserId} and name: ${name}`
    );
    return axios.post({
      url: `/api/pantry/name`,
      data: data
    });
  },

  // Create a new Pantry Item.
  findOrCreatePantryItem: function(data) {
    return axios({
      method: "post",
      url: `/api/pantry`,
      data: data
    });
  },
  // Edit a specific Pantry item.
  updatePantryItem: function(id, data) {
    console.log(
      `inside update pantry item, here's the incoming data: id: ${id} and data: `,
      data
    );
    return axios({
      method: "put",
      url: `/api/pantry/${id}`,
      data: data
    });
  },
  // Delete a specific Pantry item.
  deletePantryItem: function(id) {
    return axios.delete(`/api/pantry/${id}`);
  }
};
