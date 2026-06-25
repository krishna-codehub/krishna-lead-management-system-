import API from "../api/axios";

export const loginUser = async (
  email: string,
  password: string
) => {
  const response = await API.post("/auth/login", {
    email,
    password,
  });

  return response.data;
};
