import apiClient from "./client";

export const getRespirationRate = async () => {
    try {
    const response = await apiClient.get("csidata/predict_respiration_rate");
    return response.data;
    } catch (error) {
    console.error("Error getting RR", error);
    throw error;
    }
};

export const getHeartRate = async () => {
    try {
        const response = await apiClient.get("/heart-rate");
        return response.data;
    } catch (error) {
        console.error("Error getting HR", error);
        throw error;
    }
}

export const getPresence = async () => {
    try {
        const response = await apiClient.get("/presence");
        return response.data;
    } catch (error) {
        console.error("Error getting presence", error);
        throw error;
    }
}

export const getBodyPosture = async () => {
    try {
        const response = await apiClient.get("/body-posture");
        return response.data;
    } catch (error) {
        console.error("Error getting body posture", error);
        throw error;
    }
}