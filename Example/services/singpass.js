import { useContext } from 'react';
import { Linking, LogBox,Alert } from 'react-native';
import { authorize, refresh, revoke, prefetchConfiguration } from 'react-native-app-auth';
import proxy from './proxy';



// const configs = {
//     identityserver: {
//         issuer: 'https://demo.identityserver.io',
//         clientId: 'interactive.public',
//         redirectUrl: 'io.identityserver.demo://app/oauthredirect',
//         additionalParameters: {},
//         scopes: ['openid', 'profile', 'email', 'offline_access'],

//         serviceConfiguration: {
//             authorizationEndpoint: 'https://demo.identityserver.io/connect/authorize',
//             tokenEndpoint: 'https://demo.identityserver.io/connect/token',
//             revocationEndpoint: 'https://demo.identityserver.io/connect/endsession'
//         }
//     }
// };

const configs = {
    identityserver: {
        issuer: 'https://test-mysurgery.singhealth.com.sg/identity',
        clientId: 'native.code',
        redirectUrl: 'io.identityserver.demo:/oauthredirect',
        additionalParameters: {},
        scopes: ['openid', 'profile', 'offline_access'],

        serviceConfiguration: {
            authorizationEndpoint: 'https://test-mysurgery.singhealth.com.sg/identity/connect/authorize',
            tokenEndpoint: 'https://test-mysurgery.singhealth.com.sg/identity/connect/token',
            revocationEndpoint: 'https://test-mysurgery.singhealth.com.sg/identity/connect/endsession'
        }
    }
};

export async function logInAsync() {
    const config = configs.identityserver;
    try {
        const newState = await authorize(config)
        return {
            type: 'success',
            user: {
                name: 'Nguyen Van Huan',
                email: 'nguyen.van.huan@ihis.com.sg',
                photoUrl: ''
            },
            authState: { ...newState }
        };
    } catch (error) {
        Alert.alert('Failed to log in', error.message);
    }
}


export async function refreshTokenAsync(rToken) {
    const config = configs.identityserver;

    try {
        const newState = await refresh(config, {
            refreshToken: rToken
        });
        console.log('old: ', rToken);
        console.log('new: ', newState.refreshToken);
        return {
            type: 'success',
            user: {
                name: 'Nguyen Van Huan',
                email: 'nguyen.van.huan@ihis.com.sg',
                photoUrl: ''
            },
            authState: {
                ...newState
            }
        };
    } catch (error) {
        Alert.alert('Failed to log in', error.message);
    }
}

export async function logoutAsync(accessToken) {
    const config = configs.identityserver;

    try {
        await revoke(config, {
            tokenToRevoke: accessToken,
            sendClientId: true
        });
        return {
            type: 'success',
        };
    } catch (error) {
        Alert.alert('Failed to log in', error.message);
    }
}

export async function loginSingpass() {
    const config = {
        redirectUrl: 'io.identityserver.demo://app/oauthredirect?isSingpass=true',
        ...configs.identityserver
    };
    // get url singpass
    const url = config.issuer + '/api/login';
    const response = await proxy.get(url);
    const singpassOrginalUrl = await response.data;
    // update url singpass (only demo)
    const singpassUrl = updateurl(singpassOrginalUrl);// redirect with this url
    if (Linking.canOpenURL(singpassUrl)) {
        Linking.addListener('url', (e) => {
            console.log('event call back url', e);
        });
        await Linking.openURL(singpassUrl);
        console.log('done singpass');
    }
}

export function updateurl(url) {
    var stateUrl = paramReplace('state', url, 'custom_state')
    var nonceUrl = paramReplace('nonce', stateUrl, 'custom_nonce')
    return nonceUrl;
}

// Update the appropriate href query string parameter
function paramReplace(name, string, value) {
    // Find the param with regex
    // Grab the first character in the returned string (should be ? or &)
    // Replace our href string with our new value, passing on the name and delimeter
    var re = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        delimeter = re.exec(string)[0].charAt(0),
        newString = string.replace(re, delimeter + name + "=" + value);

    return newString;
}