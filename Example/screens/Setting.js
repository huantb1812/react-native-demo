import React, { useContext, useCallback } from 'react';
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
} from '../components/styles';

// Async storage
import AsyncStorage from '@react-native-async-storage/async-storage';

// credentials context
import { CredentialsContext } from '../components/CredentialsContext';

import * as Singpass from '../services/singpass';
import RootStack from '../navigators/RootStack';

const Setting = ({ route, navigation }) => {
  const { xxx } = route.params;
  // credentials context
  const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);

  const { name, email, photoUrl, authState } = storedCredentials;

  const AvatarImg = photoUrl
    ? {
      uri: photoUrl,
    }
    : require('./../assets/img/expo-bg2.png');

  const redirectlogin = useCallback(async () => {
    // navigation.navigate('Login');
    await Singpass.logoutAsync();
    navigation.navigate('Root');
  });
  return (
    <>
      <StatusBar style="light" />
      <InnerContainer>
        <WelcomeImage resizeMode="cover" source={require('./../assets/img/expo-bg2.png')} />

        <WelcomeContainer>
          <PageTitle welcome={true}>Setting screen</PageTitle>
          <SubTitle welcome={true}>{name || 'Olga Simpson'}</SubTitle>
          <SubTitle welcome={true}>{email || 'olgasimp@gmail.com'}</SubTitle>
          {/* <Text refreshToken={true}>{authState?.refreshToken || ''}</Text> */}
          <Text refreshToken={true}>{xxx || ''}</Text>

          <StyledFormArea>
            <Avatar resizeMode="cover" source={AvatarImg} />

            <Line />
            <StyledButton onPress={redirectlogin}>
              <ButtonText>authorize true</ButtonText>
            </StyledButton>
          </StyledFormArea>
        </WelcomeContainer>
      </InnerContainer>
    </>
  );
};

export default Setting;
