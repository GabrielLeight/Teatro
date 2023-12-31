import React,  { useState,useEffect,useRef } from 'react';
import axios from 'axios';
import {
    View,
    Text,
    StyleSheet,
    Image,
	Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import client from '../../components/client';
import { useNavigation } from '@react-navigation/native';

const Logo = '../../../assets/images/Claps.png';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const SignInScreen = () => {
    const divRef = useRef<HTMLInputElement>();
    const [CurrentUser, setCurrentUser] = useState(false); // Se debe agregar un currentUser
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [SignInMessage, setSignInMessage] = useState(false);
	const [error, setError] = useState('');

	const navigation = useNavigation();
	function update_form_btn(){
		if (SignInMessage){
			divRef.current = 'SignIn'
			setSignInMessage(true)
		}
		else{
			divRef.current = 'Login'
			setSignInMessage(false)
		}
	}   
    const onSignInPressed = async (event: React.FormEvent) => {
		event.preventDefault();  
		await client.post(
			"login",     
			{
			username: username,
			password: password 
			}
		).then((response) =>{
			const token = response.data.access;
			AsyncStorage.setItem('authToken', token);
			
			AsyncStorage.setItem('username',username);
			setCurrentUser(true);
			navigation.navigate('HomeScreen' as never);
		})
		.catch((Error)=>{setError("Error de Registro, por favor inserte otro Usuario o Contraseña");} )
		
    }
	
	const onSignUpPressed = () => {
		navigation.navigate('SignUp' as never);
	}

    return (
		<View style ={styles.root}>
			<View style = {styles.container}>
				<Image style = {styles.tinyLogo} source = {require(Logo)}/>
				<CustomInput
					placeholder="Ingresa tu nombre de usuario"
					setValue = {setUsername}
					value={username}
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
					onPress={onSignInPressed}
					bgColor = '#446c69'
					fgColor = '#ffffff'
				/>
				<View style = {{flexDirection: 'row', marginTop: 2}}>
					<Text>¿No tienes una cuenta? </Text>
					<CustomButton
						text="Regístrate" 
						onPress={onSignUpPressed}
						bgColor = 'transparent'
						fgColor = '#25978e'
					/>
				</View>						
				{error && <Text style={{ color: 'red' }}>{error}</Text>}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
		backgroundColor: '#d0e2e9', // #5fcbc3 // #75b9b4
		justifyContent: 'center',
	},
	container: {
		alignItems: 'center',
		justifyContent: 'center',
		padding: 20,
		margin: 15,
		borderRadius: 20,
		backgroundColor: '#d0e2e9',
	},
	tinyLogo: {
		width: Dimensions.get('window').width * 0.60, // Ajusta el factor según tus necesidades
		height: Dimensions.get('window').height * 0.15, // Ajusta el factor según tus necesidades
	},
})

export default SignInScreen;
    