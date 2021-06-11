import React, { useEffect} from 'react';
import { Text, View, Alert } from 'react-native';
import * as Singpass from '../services/singpass';



const Oauthredirect = ({ route, navigation }) => {
    // const {  } =  route.params;
    // credentials context
    // if (isSingpass) {
    //     navigation.navigate('Root');
    // }
    // return (
    //     <>
    //         <View>
    //             <Text>isSingpass:{route?.params?.isSingpass}</Text>
    //         </View>
    //     </>
    // );
    Alert.alert('is singpass');
    if (route && route.params && route.params.isSingpass) {
        Alert.alert('is singpass', route?.params?.isSingpass);
    } else {
        console.log('is not singpass')
    }
    // Singpass.logoutAsync();
    // Singpass.logInAsync().then(c=>{
    //     // navigation.navigate('Welcome');
    // });
    return (

        <>

        </>
    )
};

export default Oauthredirect;
