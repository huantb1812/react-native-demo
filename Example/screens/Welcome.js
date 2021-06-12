import React, { useContext } from 'react';
import { StatusBar, Text, Alert } from 'react-native';

import {
  Avatar,
  WelcomeImage,
  PageTitle,
  SubTitle,
  StyledFormArea,
  StyledButton,
  InnerContainer,
  WelcomeContainer,
  ButtonText,
  Line,
} from './../components/styles';

// Async storage
import AsyncStorage from '@react-native-async-storage/async-storage';

// credentials context
import { CredentialsContext } from './../components/CredentialsContext';

import * as Singpass from '../services/singpass';
import { STORAGE_KEY } from './../services/constant';

const Welcome = () => {
  // credentials context
  const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);

  const { name, email, photoUrl, authState } = storedCredentials;

  const AvatarImg = photoUrl
    ? {
      uri: photoUrl,
    }
    : require('./../assets/img/expo-bg1.png');

  const clearLogin = () => {
    Singpass.logoutAsync(authState.accessToken)
      .then(result => {
        const { type } = result;
        if (type == 'success') {
          AsyncStorage.removeItem(STORAGE_KEY)
            .then(() => {
              setStoredCredentials("");
            })
            .catch((error) => console.log(error));
        }

      })
      .catch((error) => {
        Alert.alert('Error', 'An error occurred. Check your network and try again');
        console.log(error);
      });

  };
  const refreshToken = () => {
    console.log('call refresh token:', authState?.refreshToken);
    // Singpass.refreshTokenAsync(authState.refreshToken)
    //   .then(result => {
    //     console.log('refresh token', result);
    //     //     const { type, user, authState } = result;
    //     //     if (type == 'success') {
    //     //       const { email, name, photoUrl } = user;
    //     //       AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(credentials))
    //     //       .then(() => {
    //     //         // handleMessage(message, status);
    //     //         setStoredCredentials(credentials);
    //     //       })
    //     //       .catch((error) => {
    //     //         // handleMessage('Persisting login failed');
    //     //         console.log(error);
    //     //       });
    //     //     } else {
    //     //       // handleMessage('Singpass Signin was cancelled');
    //     //     }
    //   });
  };

  return (
    <>
      <StatusBar style="light" />
      <InnerContainer>
        <WelcomeImage resizeMode="cover" source={require('./../assets/img/expo-bg2.png')} />

        <WelcomeContainer>
          <PageTitle welcome={true}>Welcome to MySurgery</PageTitle>
          <SubTitle welcome={true}>{name || 'Olga Simpson'}</SubTitle>
          <SubTitle welcome={true}>{email || 'olgasimp@gmail.com'}</SubTitle>
          <Text refreshToken={true}>{authState?.refreshToken || ''}</Text>

          <StyledFormArea>
            <Avatar resizeMode="cover" source={AvatarImg} />

            <Line />
            <StyledButton onPress={clearLogin}>
              <ButtonText>Logout</ButtonText>
            </StyledButton>
            {/* <StyledButton onPress={refreshToken}>
              <ButtonText>refresh token</ButtonText>
            </StyledButton> */}
          </StyledFormArea>
        </WelcomeContainer>
      </InnerContainer>
    </>
  );
};

export default Welcome;
