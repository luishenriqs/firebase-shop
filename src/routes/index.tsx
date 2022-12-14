import React, { useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import { NavigationContainer } from '@react-navigation/native';
import { AppRoutes } from './app.routes';
import { SignIn } from '../screens/SignIn';

type User = {
  uid: string;
}

export function Routes() {

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const subscribe = auth().onAuthStateChanged(userInfo => {
      console.log('USER AUTH ', userInfo);
      setUser(userInfo);
    });

    return subscribe;
  }, [])
  return (
    <NavigationContainer>
      {user ? <AppRoutes /> : <SignIn />}
    </NavigationContainer>
  )
}