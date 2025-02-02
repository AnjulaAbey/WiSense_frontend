import apiClient from "./client";

export const getRespirationRate = async () => {
    try {
    const response = await apiClient.get("/respiration-rate");
    return response.data;
    } catch (error) {
    console.error("Error getting RR", error);
    throw error;
    }
};