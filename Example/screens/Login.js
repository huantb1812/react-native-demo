import React, { useState, useContext } from 'react';
import { StatusBar } from 'react-native';

// formik
import { Formik } from 'formik';

import {
  StyledContainer,
  PageLogo,
  PageTitle,
  SubTitle,
  StyledInputLabel,
  StyledFormArea,
  StyledButton,
  StyledTextInput,
  LeftIcon,
  RightIcon,
  InnerContainer,
  ButtonText,
  MsgBox,
  Line,
  ExtraView,
  ExtraText,
  TextLink,
  TextLinkContent,
  Colors,
} from './../components/styles';
import { View, ActivityIndicator } from 'react-native';

//colors
const { darkLight, brand, primary } = Colors;

// icon
// import { Octicons, Fontisto, Ionicons } from '@expo/vector-icons';

// keyboard avoiding view
import KeyboardAvoidingWrapper from './../components/KeyboardAvoidingWrapper';

// api client
import axios from 'axios';

// Singpass Signin
import * as Singpass from '../services/singpass';
// Async storage
import AsyncStorage from '@react-native-async-storage/async-storage';

// credentials context
import { CredentialsContext } from './../components/CredentialsContext';

const Login = ({ navigation }) => {
  const [hidePassword, setHidePassword] = useState(true);
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();
  const [singpassSubmitting, setSingpassSubmitting] = useState(false);
  const [is4Submitting, setIs4Submitting] = useState(false);

  // credentials context
  const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);

  const handleLogin = (credentials, setSubmitting) => {
    handleMessage(null);
    const url = 'https://whispering-headland-00232.herokuapp.com/user/signin';
    axios
      .post(url, credentials)
      .then((response) => {
        const result = response.data;
        const { status, message, data } = result;

        if (status !== 'SUCCESS') {
          handleMessage(message, status);
        } else {
          persistLogin({ ...data[0] }, message, status);
        }
        setSubmitting(false);
      })
      .catch((error) => {
        setSubmitting(false);
        handleMessage('An error occurred. Check your network and try again');
        console.log(error.toJSON());
      });
  };

  const handleMessage = (message, type = '') => {
    setMessage(message);
    setMessageType(type);
  };

  const handleSingpassSignin = () => {
    setSingpassSubmitting(true);

    const defaultAuthState = {
      hasLoggedInOnce: false,
      provider: '',
      accessToken: '',
      accessTokenExpirationDate: '',
      refreshToken: ''
    };

    Singpass.loginSingpass()
      .then((result) => {
        const { type, user, authState } = result;
        if (type == 'success') {
          const { email, name, photoUrl } = user;
          persistLogin({ email, name, photoUrl, authState }, 'Singpass signin successful', 'SUCCESS');
        } else {
          handleMessage('Singpass Signin was cancelled');
        }
        setSingpassSubmitting(false);
      })
      .catch((error) => {
        handleMessage('An error occurred. Check your network and try again');
        console.log(error);
        setSingpassSubmitting(false);
      });
  };

  
  const handleIs4Signin = () => {
    setIs4Submitting(true);

    const defaultAuthState = {
      hasLoggedInOnce: false,
      provider: '',
      accessToken: '',
      accessTokenExpirationDate: '',
      refreshToken: ''
    };

    Singpass.logInAsync()
      .then((result) => {
        const { type, user, authState } = result;
        if (type == 'success') {
          const { email, name, photoUrl } = user;
          persistLogin({ email, name, photoUrl, authState }, 'IS4 signin successful', 'SUCCESS');
        } else {
          handleMessage('IS4 Signin was cancelled');
        }
        setIs4Submitting(false);
      })
      .catch((error) => {
        handleMessage('An error occurred. Check your network and try again');
        console.log(error);
        setIs4Submitting(false);
      });
  };
  // Persisting login
  const persistLogin = (credentials, message, status) => {
    AsyncStorage.setItem('flowerCribCredentials', JSON.stringify(credentials))
      .then(() => {
        handleMessage(message, status);
        setStoredCredentials(credentials);
      })
      .catch((error) => {
        handleMessage('Persisting login failed');
        console.log(error);
      });
  };

  return (
    <KeyboardAvoidingWrapper>
      <StyledContainer>
        <StatusBar style="dark" />
        <InnerContainer>
          <PageLogo resizeMode="cover" source={require('./../assets/img/expo-bg1.png')} />
          <PageTitle>Flower Crib</PageTitle>
          <SubTitle>Account Login</SubTitle>

          <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={(values, { setSubmitting }) => {
              if (values.email == '' || values.password == '') {
                handleMessage('Please fill in all fields');
                setSubmitting(false);
              } else {
                handleLogin(values, setSubmitting);
              }
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) => (
              <StyledFormArea>
                {/* <MyTextInput
                  label="Email Address"
                  placeholder="andyj@gmail.com"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  keyboardType="email-address"
                  icon="mail"
                />
                <MyTextInput
                  label="Password"
                  placeholder="* * * * * * * *"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  secureTextEntry={hidePassword}
                  icon="lock"
                  isPassword={true}
                  hidePassword={hidePassword}
                  setHidePassword={setHidePassword}
                /> */}
                <MsgBox type={messageType}>{message}</MsgBox>

                {/* {!isSubmitting && (
                  <StyledButton onPress={handleSubmit}>
                    <ButtonText>Login</ButtonText>
                  </StyledButton>
                )}
                {isSubmitting && (
                  <StyledButton disabled={true}>
                    <ActivityIndicator size="large" color={primary} />
                  </StyledButton>
                )}  <Line /> */}
                {!is4Submitting && (
                  <StyledButton onPress={handleIs4Signin} is4={true}>
                    {/* <Fontisto name="google" size={25} color={primary} /> */}
                    <ButtonText is4={true}>Sign in with TestID</ButtonText>
                  </StyledButton>
                )}
                {is4Submitting && (
                  <StyledButton disabled={true} is4={true}>
                    <ActivityIndicator size="large" color={primary} />
                  </StyledButton>
                )}
                <Line />
                {!singpassSubmitting && (
                  <StyledButton onPress={handleSingpassSignin} singpass={true}>
                    {/* <Fontisto name="google" size={25} color={primary} /> */}
                    <ButtonText singpass={true}>Sign in with Singpass</ButtonText>
                  </StyledButton>
                )}
                {singpassSubmitting && (
                  <StyledButton disabled={true} singpass={true}>
                    <ActivityIndicator size="large" color={primary} />
                  </StyledButton>
                )}
                <ExtraView>
                  <ExtraText>Don't have an account already? </ExtraText>
                  <TextLink onPress={() => navigation.navigate('Signup')}>
                    <TextLinkContent>Signup</TextLinkContent>
                  </TextLink>
                </ExtraView>
              </StyledFormArea>
            )}
          </Formik>
        </InnerContainer>
      </StyledContainer>
    </KeyboardAvoidingWrapper>
  );
};

const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, ...props }) => {
  return (
    <View>
      <LeftIcon>
        {/* <Octicons name={icon} size={30} color={brand} /> */}
      </LeftIcon>
      <StyledInputLabel>{label}</StyledInputLabel>
      <StyledTextInput {...props} />
      {isPassword && (
        <RightIcon
          onPress={() => {
            setHidePassword(!hidePassword);
          }}
        >
          {/* <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={darkLight} /> */}
        </RightIcon>
      )}
    </View>
  );
};

export default Login;
