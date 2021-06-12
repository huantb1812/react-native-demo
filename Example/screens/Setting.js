import React, { useCallback } from 'react';
import { StatusBar } from 'react-native';

import {
  StyledButton,
  InnerContainer,
  ButtonText,
} from '../components/styles';

// Async storage

// credentials context

import * as Singpass from '../services/singpass';

const Setting = ({ route, navigation }) => {
  
  const redirectlogin = useCallback(async () => {
    // navigation.navigate('Login');
    await Singpass.logoutAsync();
    navigation.navigate('Root');
  });
  return (
    <>
      <StatusBar style="light" />
      <InnerContainer>
      <StyledButton onPress={redirectlogin}>
              <ButtonText>authorize true</ButtonText>
            </StyledButton>
      </InnerContainer>
    </>
  );
};

export default Setting;
