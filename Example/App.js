// import React, { useState, useCallback, useMemo } from 'react';
// import { UIManager, Alert } from 'react-native';
// import { authorize, refresh, revoke, prefetchConfiguration } from 'react-native-app-auth';
// import { Page, Button, ButtonContainer, Form, FormLabel, FormValue, Heading } from './components';



// const App = () => {
//   const [authState, setAuthState] = useState(defaultAuthState);
//   React.useEffect(() => {
//     prefetchConfiguration({
//       warmAndPrefetchChrome: true,
//       ...configs.identityserver
//     });
//   }, []);

//   const handleAuthorize = useCallback(
//     async provider => {
//       try {
//         const config = configs[provider];
//         const newAuthState = await authorize(config);

//         setAuthState({
//           hasLoggedInOnce: true,
//           provider: provider,
//           ...newAuthState
//         });
//       } catch (error) {
//         Alert.alert('Failed to log in', error.message);
//       }
//     },
//     [authState]
//   );

//   const handleRefresh = useCallback(async () => {
//     try {
//       const config = configs[authState.provider];
//       const newAuthState = await refresh(config, {
//         refreshToken: authState.refreshToken
//       });

//       setAuthState(current => ({
//         ...current,
//         ...newAuthState,
//         refreshToken: newAuthState.refreshToken || current.refreshToken
//       }))

//     } catch (error) {
//       Alert.alert('Failed to refresh token', error.message);
//     }
//   }, [authState]);

//   const handleRevoke = useCallback(async () => {
//     try {
//       const config = configs[authState.provider];
//       await revoke(config, {
//         tokenToRevoke: authState.accessToken,
//         sendClientId: true
//       });

//       setAuthState({
//         provider: '',
//         accessToken: '',
//         accessTokenExpirationDate: '',
//         refreshToken: ''
//       });
//     } catch (error) {
//       Alert.alert('Failed to revoke token', error.message);
//     }
//   }, [authState]);

//   const showRevoke = useMemo(() => {
//     if (authState.accessToken) {
//       const config = configs[authState.provider];
//       if (config.issuer || config.serviceConfiguration.revocationEndpoint) {
//         return true;
//       }
//     }
//     return false;
//   }, [authState]);

//   return (
//     <Page>
//       {!!authState.accessToken ? (
//         <Form>
//           <FormLabel>accessToken</FormLabel>
//           <FormValue>{authState.accessToken}</FormValue>
//           <FormLabel>accessTokenExpirationDate</FormLabel>
//           <FormValue>{authState.accessTokenExpirationDate}</FormValue>
//           <FormLabel>refreshToken</FormLabel>
//           <FormValue>{authState.refreshToken}</FormValue>
//           <FormLabel>scopes</FormLabel>
//           <FormValue>{authState.scopes.join(', ')}</FormValue>
//         </Form>
//       ) : (
//         <Heading>{authState.hasLoggedInOnce ? 'Goodbye.' : 'Hello, stranger.'}</Heading>
//       )}

//       <ButtonContainer>
//         {!authState.accessToken ? (
//           <>
//             <Button
//               onPress={() => handleAuthorize('identityserver')}
//               text="Authorize IdentityServer"
//               color="#DA2536"
//             />
//             <Button
//               onPress={() => handleAuthorize('auth0')}
//               text="Authorize Auth0"
//               color="#DA2536"
//             />
//           </>
//         ) : null}
//         {!!authState.refreshToken ? (
//           <Button onPress={handleRefresh} text="Refresh" color="#24C2CB" />
//         ) : null}
//         {showRevoke ? (
//           <Button onPress={handleRevoke} text="Revoke" color="#EF525B" />
//         ) : null}
//       </ButtonContainer>
//     </Page>
//   );
// }

// export default App;

import React, { useState } from 'react';

// React navigation stack
import RootStack from './navigators/RootStack';

// apploading
// import AppLoading from 'expo-app-loading';

// async-storage
import AsyncStorage from '@react-native-async-storage/async-storage';

// credentials context
import { CredentialsContext } from './components/CredentialsContext';
import { Linking } from 'react-native';
import { STORAGE_KEY } from './services/constant';

const App = () => {

  React.useEffect(() => {
    Linking.addListener('url', (e) => {
      console.log('event call back url', e);
    });
  }, []);

  const [appReady, setAppReady] = useState(false);
  const [storedCredentials, setStoredCredentials] = useState("");


  const checkLoginCredentials = () => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((result) => {
        if (result !== null) {
          setStoredCredentials(JSON.parse(result));
        } else {
          setStoredCredentials(null);
        }
      })
      .catch((error) => console.log(error));
  };

  if (!appReady) {
    checkLoginCredentials();
    setAppReady(true);

    // return <AppLoading startAsync={checkLoginCredentials} onFinish={() => setAppReady(true)} onError={console.warn} />;
  }

  return (
    <CredentialsContext.Provider value={{ storedCredentials, setStoredCredentials }}>
      <RootStack />
    </CredentialsContext.Provider>
  );
}

export default App;