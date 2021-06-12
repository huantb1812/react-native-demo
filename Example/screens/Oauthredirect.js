import React, { useContext } from 'react';
import { ActivityIndicator } from 'react-native';
import * as Singpass from '../services/singpass';
// async-storage
import AsyncStorage from '@react-native-async-storage/async-storage';
// credentials context
import { CredentialsContext } from './../components/CredentialsContext';
import { STORAGE_KEY } from '../services/constant';

const Oauthredirect = ({ route, navigation }) => { 
    const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);
    const {
        params: { issingpass },
    } = route;
    AsyncStorage.getItem(STORAGE_KEY).then((value) => {
        if (value) {
            console.log('AsyncStorage useEffect', value);
        }
        else if (issingpass) {

            Singpass.logInAsync()
                .then((result) => {
                    const { type, user, authState } = result;
                    if (type == 'success') {
                        const { email, name, photoUrl } = user;
                        persistLogin({ email, name, photoUrl, authState }, 'IS4 signin successful', 'SUCCESS');
                    } else {
                        handleMessage('IS4 Signin was cancelled');
                    }
                })
                .catch((error) => {
                    handleMessage('An error occurred. Check your network and try again');
                    console.log(error);
                    return false;
                });
        }

    })

    const handleMessage = (message, status) => {
        console.error(message)
    };

    // Persisting login
    const persistLogin = (credentials, message, status) => {
        AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(credentials))
            .then(() => {
                // handleMessage(message, status);
                setStoredCredentials(credentials);
            })
            .catch((error) => {
                // handleMessage('Persisting login failed');
                console.error(error);
            });
    };
    return (
        <ActivityIndicator size="large" />
    )
};

export default Oauthredirect;
