import React, { useContext, useCallback } from 'react';
import { Text, View, Alert } from 'react-native';
import * as Singpass from '../services/singpass';

// credentials context
// import { CredentialsContext } from './../components/CredentialsContext';
// import { AsyncStorage } from '@react-native-async-storage/async-storage';
// const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);

async function getToken() {
    Singpass.logInAsync()
        .then((result) => {
            const { type, user, authState } = result;
            if (type == 'success') {
                const { email, name, photoUrl } = user;
                persistLogin({ email, name, photoUrl, authState }, 'IS4 signin successful', 'SUCCESS');
                navigation.navigate('welcome');
            } else {
                handleMessage('IS4 Signin was cancelled');
            }
        })
        .catch((error) => {
            handleMessage('An error occurred. Check your network and try again');
            console.log(error);
            return false;
        });
};

// const handleMessage = (message,status) => {
//     console.error(message)
// };
// Persisting login
// const persistLogin = (credentials, message, status) => {
//     AsyncStorage.setItem('flowerCribCredentials', JSON.stringify(credentials))
//         .then(() => {
//             handleMessage(message, status);
//             setStoredCredentials(credentials);
//         })
//         .catch((error) => {
//             handleMessage('Persisting login failed');
//             console.error(error);
//         });
// };

const Oauthredirect = ({ route, navigation }) => {
    const {
        params: { issingpass },
    } = route;
    console.log('is singpass', JSON.stringify(issingpass));
    if (issingpass) {
        getToken();
    }

    return (
        <>
            <View>
                <Text>oathredirect</Text>
            </View>
        </>
    )
};

export default Oauthredirect;
