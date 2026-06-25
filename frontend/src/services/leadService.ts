import API from "../api/axios";

export const getLeads = async () => {
  const response = await API.get("/leads");
  return response.data;
};

export const createLead = async (leadData: any) => {
  const response = await API.post("/leads", leadData);
  return response.data;
};

export const getLeadById = async (
  id: string
) => {
  const response = await API.get(
    `/leads/${id}`
  );

  return response.data;
};

export const updateLead = async (
  id: string,
  leadData: any
) => {
  const response = await API.put(
    `/leads/${id}`,
    leadData
  );

  return response.data;
};

export const deleteLead = async (
  id: string
) => {
  const response = await API.delete(
    `/leads/${id}`
  );

  return response.data;
};

