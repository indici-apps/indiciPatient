import { AsyncStorage } from "react-native";
import { exp } from "react-native-reanimated";

const getUserId = async () => {
    let userId = '';
    try {
        userId = await AsyncStorage.getItem('secureToken') || 'none';
        
    } catch (error) {
        // Error retrieving data
        console.log(error.message);
    }
    //console.log(userId)
    return userId;
}

export default getUserId