import React, { useState, useContext } from 'react'
import image from '../../assets/logo.png'
import { Component, LoginContainer, Image, Wrapper, LoginButton, SignupButton, Text } from './LoginStyle.js'
import { TextField } from '@mui/material';
import { API } from '../../services/api';
import { DataContext } from '../../context/DataProvider';
import { useNavigate } from 'react-router-dom';


// INITIAL STATES
const initialLoginValue = {
	userName: '',
	password: ''
}
const initialSignUpValue = {
	name: '',
	userName: '',
	password: ''
}


const Login = (props) => {

	//***  STATES ***//
	const [haveAccount, setHaveAccount] = useState(true);
	const [signUpInput, setSignUpInput] = useState(initialSignUpValue);
	const [loginInput, setLoginInput] = useState(initialLoginValue);
	const [isError, setIsError] = useState(false);
	const [isNewAccountCreated, setIsNewAccountCreated] = useState(false)
	const { setUserAccount } = useContext(DataContext); // setting user detail state by context.

	const navigate = useNavigate();



	//***  EVENT HANDLER ***//
	const signUpInputHandler = (e) => {
		// const inputName = e.target.name;
		// const inputValue = e.target.value;
		// const obj = {inputName: inputValue} ----> "inputName" itself becone a key name here rether then taking value if "inputName" given above.
		// const obj = {[inputName]: inputValue} ----> to do so, we have to keep inputName in [] square bracket.. then it will make the key name as the value if inputName.
		// console.log(obj);
		setSignUpInput({ ...signUpInput, [e.target.name]: e.target.value }); //this square bracket is not to making it array..hehehe.. 
		//in js object to make the property name as variable.. it should be covered with []. 
	}
	const loginInputHandler = (e) => {
		setLoginInput({ ...loginInput, [e.target.name]: e.target.value });
	}
	// console.log(loginInput);




	//***  API CALLS ***//
	const signupUser = async () => {
		try {
			let responce = await API.userSignup(signUpInput);
			console.log("responce <-------- ", responce,)
			setSignUpInput(initialSignUpValue)
			setHaveAccount(true);
			setIsError(false);
			setIsNewAccountCreated(true);
		} catch (error) {
			// console.log("error ----> ", error);
			setIsError(true);
		}

	}

	const loginUser = async () => {
		try {

			let responce = await API.userLogin(loginInput);
			// console.log("responce <-------- ", responce)
			// console.log(responce.data, "======")
			setLoginInput(initialLoginValue);
			setIsError(false);
			sessionStorage.setItem('accessToken', `Bearer ${responce.data.accessTokan}`) //SESSION STORAGE
			sessionStorage.setItem('refreshToken', `Bearer ${responce.data.refreshToken}`)
			setUserAccount({
				userName: responce.data.userName,
				name: responce.data.name
			})
			props.setUserAuthanticated(true);
			navigate('/home')
		} catch (error) {

			console.log("error ----> ", error);
			setIsError(true);

		}

	}


	return (
		<Component>
			<LoginContainer>
				<Image src={image} alt="blog" />
				{haveAccount ?
					<Wrapper>
						{isError && <Text style={{ color: 'red' }}>Oops.. Something went wrong, Please try again.</Text>}
						{isNewAccountCreated && <Text style={{ color: 'green' }}>Congratulations! Your account has been cteated successfully. Please Login.</Text>}
						<TextField variant="standard" onChange={(e) => loginInputHandler(e)} name='userName' label='Enter Username' value={loginInput.userName} />
						<TextField variant="standard" onChange={(e) => loginInputHandler(e)} name='password' label='Enter Password' value={loginInput.password} />
						<LoginButton variant="contained" onClick={loginUser}>Login</LoginButton>
						<Text style={{ textAlign: 'center' }}>OR</Text>
						<SignupButton style={{ marginBottom: 50 }} onClick={() => { setHaveAccount(false) }}>Create an account</SignupButton>
					</Wrapper>
					:
					<Wrapper>
						{isError && <Text style={{ color: 'red' }}>Oops.. Something went wrong, Please try again.</Text>}
						<TextField variant="standard" onChange={(e) => signUpInputHandler(e)} name='name' label='Enter Name' required value={signUpInput.name} />
						<TextField variant="standard" onChange={(e) => signUpInputHandler(e)} name='userName' label='Enter Username' required value={signUpInput.userName} />
						<TextField variant="standard" onChange={(e) => signUpInputHandler(e)} name='password' label='Enter Password' required value={signUpInput.password} />
						<SignupButton onClick={signupUser} >Signup</SignupButton>
						<Text style={{ textAlign: 'center' }}>OR</Text>
						<LoginButton variant="contained" onClick={() => { setHaveAccount(true) }}>Already have an account</LoginButton>
					</Wrapper>
				}
			</LoginContainer>
		</Component>
	)
}

export default Login
