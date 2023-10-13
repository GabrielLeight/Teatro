import React,  { useState,useEffect,useRef } from 'react';
import axios from 'axios';
import {
    View,
    Text,
    StyleSheet,
    Image
} from 'react-native';

import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
const Logo = '../../../assets/images/Claps.png';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client  = axios.create({
    baseURL: "http://127.0.0.1:8000"
})
// Agregar onpress submitForm

function SignInScreen() {
    const divRef = useRef();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [SignInMessage, setSignInMessage] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const submitForm = (event: React.FormEvent) => {
      if (SignInMessage){
        divRef.current.value = 'SignIn'
      }
      //event.preventDefault();
      // Add your form submission logic here
    };

    //const SignInMessage = () => {
    //  console.warn('Iniciando sesión');
    //};
    
    return (
      <View style ={styles.root}>
        <Image style = {styles.tinyLogo} source = {require(Logo)}/>
        {/* <Text style={styles.title}>Inicio de Sesion</Text> */}
        <CustomInput
            placeholder="Ingresa tu correo electrónico"
            setValue = {setEmail}
            value={email}
            secureTextEntry={false}
            bgColor = '#ffffff'
        />
        <CustomInput
            placeholder="Ingresa tu contraseña"
            secureTextEntry={true}
            setValue = {setPassword}
            value={password}
            bgColor = '#ffffff'
        />
        <CustomButton
          text="Iniciar Sesion" 
          onPress={SignInMessage}
          bgColor = '#8c1a28'
          fgColor = 'white'
        />
        <CustomButton
          text="Registrarse" 
          onPress={SignInMessage}
          bgColor='#c12537'
          // bgColor = '#9f2626'
          fgColor ='white'
        />
    </View>
    );
  }

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
     color: '#eb3838',
     fontSize: 20,
     fontWeight: 'bold',

  },
  tinyLogo: {
    width: 120,
    height: 55,
  },
})

export default SignInScreen;
    