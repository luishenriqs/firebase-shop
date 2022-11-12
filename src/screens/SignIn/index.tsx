import React, { useState } from 'react';
import { Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import { Container, Account, Title, Subtitle } from './styles';
import { ButtonText } from '../../components/ButtonText';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';

export function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  /* Autenticação anônima */
  /* Requer ativação no Firebase Authenticate Sign in Method */
  // async function handleSigInAnonymously() {
  //   const { user } = await auth().signInAnonymously();
  //   console.log('USUÁRIO ANONIMO ---->', user);
  // }

  function handleCreateUserAccount() {
    if (!email || !email) {
      Alert.alert('Inform your email address and password!')
    } else {
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => { Alert.alert('User created successfully!') })
        .catch(erro => {
          console.error(erro.code)
          if (erro.code === 'auth/email-already-in-use') {
            return Alert.alert('This email alredy exists!');
          };
  
          if (erro.code === 'auth/invalid-email') {
            return Alert.alert('Invalid email!');
          };
  
          if (erro.code === 'auth/weak-password') {
            return Alert.alert('Password requires at least 6 digits');
          };
        });
    }
  };

  function handleSignInWithEmailAndPassword() {
    if (!email || !email) {
      Alert.alert('Inform your email address and password!')
    } else {
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(({ user }) => console.log(user))
        .catch((error) => {
          console.error(error)
          if (error.code === 'auth/user-not-found') {
            return Alert.alert('This user does not exists!');
          };
  
          if (error.code === 'auth/invalid-email' || error.code === 'auth/wrong-password') {
            return Alert.alert('User or password invalid!');
          };
  
          if (error.code === 'auth/too-many-requests') {
            return Alert.alert('Too many attempts, password locked. Reset password or try later!');
          };
        });
    };
  };

  function handleForgotPassword() {
    if (!email) {
      Alert.alert('Inform your email address!')
    } else {
      auth()
        .sendPasswordResetEmail(email)
        .then(() => Alert.alert('We have sent a link to your email to reset your password.'));
    };
  };

  return (
    <Container>
      <Title>MyShopping</Title>
      <Subtitle>Gerencie sua lista de compras</Subtitle>

      <Input
        placeholder="e-mail"
        keyboardType="email-address"
        onChangeText={setEmail}
      />

      <Input
        placeholder="senha"
        secureTextEntry
        onChangeText={setPassword}
      />

      <Button title="Entrar" onPress={handleSignInWithEmailAndPassword} />

      <Account>
        <ButtonText title="Recuperar senha" onPress={handleForgotPassword} />
        <ButtonText title="Criar minha conta" onPress={handleCreateUserAccount} />
      </Account>
    </Container>
  );
}