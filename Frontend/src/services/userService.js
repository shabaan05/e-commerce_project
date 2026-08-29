import api from "./api";

export const getProfile = async () => {
  const response = await api.get("/users/profile");
  return response.data;
};

export const addAddress = async (address) => {
  const response = await api.post("/users/address", address);
  return response.data;
};

export const updateAddress = async (addressId, address) => {
  const response = await api.put(`/users/address/${addressId}`, address);
  return response.data;
};

export const deleteAddress = async (addressId) => {
  const response = await api.delete(`/users/address/${addressId}`);
  return response.data;
};
