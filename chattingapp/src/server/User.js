import AsyncStorage from "@react-native-async-storage/async-storage";
import { Api } from "../utils/Api";

export async function getAllUsers() {
    let authToken = await AsyncStorage.getItem("auth-token");
    return Api.get("/api/user/all", {
        headers: {
            "production-auth-token": authToken
        }
    });
}