import { AsyncStorage } from 'react-native';
import { apiBackEnd } from '../Variables';

export const onSignIn = async (user, pass) => {

    var data = {
        user: user,
        password: pass
    }
    return await fetch(apiBackEnd+`loginConstruction`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(response => {
        if(response.token){
            AsyncStorage.setItem("token", response.token);
            AsyncStorage.setItem("id", response.id + "");
            AsyncStorage.setItem("user", response.user);
            return "ok";
        }
        return "fail";
    })
    .catch(error => {
        return "fail";
    });
}

export const onSignOut = async () => {
    try{
        AsyncStorage.removeItem("token");
        AsyncStorage.removeItem("id");
        AsyncStorage.removeItem("user");
        return "ok";
    }
    catch{
        return "fail";
    }
}

export const isSignedIn = async () => {
  const token = await AsyncStorage.getItem("token");

  return (token !== null) ? true : false;
};