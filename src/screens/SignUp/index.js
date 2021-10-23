import React, { useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

import { UserContext } from '../../contexts/UserContext';

import {
    Container,
    InputArea,
    CustomButton,
    CustomButtonText,
    SignMessageButton,
    SignMessageButtonText,
    SignMessageButtonTextBold
} from './styles';

import Api from '../../Api';
import SignInput from '../../components/SignInput';
import CooperativaLogo from '../../assets/logo.svg';
import PersonIcon from '../../assets/person.svg';
import EmailIcon from '../../assets/email.svg';
import LockIcon from '../../assets/lock.svg';

export default () => {
    const { dispatch: userDispatch } = useContext(UserContext);
    const navigation = useNavigation();
    const [emailField, setEmailField] = useState('');
    const [passwordField, setPasswordField] = useState('');
    const [nameField, setNameField] = useState('');

    const handleSignClick = async () => {
        const convertedEmail = emailField.toLowerCase();
        if(nameField != '' && convertedEmail != '' && passwordField != '') {
            let res = await Api.signUp(nameField, convertedEmail, passwordField);

            if(res.token) {
                await AsyncStorage.setItem('token', res.token);

                userDispatch({
                    type: 'setAvatar',
                    payload:{
                        name: res.data.name,
                        avatar: res.data.avatar,
                        email: res.data.email
                    }
                });
                
                navigation.reset({
                    routes:[{name:'MainTab'}]
                });
            } else {
                alert('Houve um erro!');
            }
        } else {
            alert("Preencha os campos!");
        }
    }

    const handleMessageButtonClick = () => {
        navigation.reset({
            routes: [{name: 'SignIn'}]
        });
    }

    return (
        <Container>
            <CooperativaLogo width="100%" height="250" />     
            <InputArea>
            <SignInput
                    IconSvg={PersonIcon} 
                    placeholder="Digite seu nome"
                    value={nameField}
                    onChangeText={t=>setNameField(t)}
                />
                <SignInput
                    IconSvg={EmailIcon} 
                    placeholder="Digite seu e-mail"
                    value={emailField}
                    onChangeText={t=>setEmailField(t)}
                />
                <SignInput
                    IconSvg={LockIcon}
                    placeholder="Digite sua senha"
                    value={passwordField}
                    onChangeText={t=>setPasswordField(t)}
                    password={true}
                />
                <CustomButton onPress={handleSignClick}>
                    <CustomButtonText>CADASTRAR</CustomButtonText>
                </CustomButton>
            </InputArea>

            <SignMessageButton onPress={handleMessageButtonClick}>
                <SignMessageButtonText>Já possui uma conta?</SignMessageButtonText>
                <SignMessageButtonTextBold>Faça Login</SignMessageButtonTextBold>
            </SignMessageButton>

        </Container>
    );
}