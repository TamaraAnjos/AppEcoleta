import React, { useState, useEffect, useContext } from 'react';
import { RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import ImagePicker from 'react-native-image-crop-picker';

import { UserContext } from '../../contexts/UserContext';

import {
    Container,
    Scroller,
    LoadingIcon,
    InputArea,
    CustomButton,
    CustomButtonL,
    CustomButtonText,
    UserAvatar,
    ProfileItem
} from './styles';

import SignInput from '../../components/SignInput';
import PersonIcon from  '../../assets/person.svg';
import EmailIcon from '../../assets/email.svg';
import LockIcon from '../../assets/lock.svg';
import Api from '../../Api';

import Avatar from '../../components/Avatar';

export default ({state}) => {
    const { state:user } = useContext(UserContext);
    const [avatar, setAvatar] = useState('');
    const [userInfo, setUserInfo] = useState({
    });
    const [loading, setLoading] = useState(false);
    const { dispatch: userDispatch } = useContext(UserContext);
    const navigation = useNavigation();
    const [nameField, setNameField] = useState('');
    const [emailField, setEmailField] = useState('');
    const [passwordField, setPasswordField] = useState('');
    const [passwordconfirmField, setPasswordConfirmField] = useState('');
    const [refreshing, setRefreshing] = useState(false);

    useEffect(()=>{
        const getUser = async () =>{

            setLoading(true);
            let res = await Api.getUser(userInfo);
            if(res.error == '') {
                setUserInfo(res.data);
            }else{
                alert("Erro: "+res.error);
            }
            setLoading(false);
        }
        getUser();
    }, []);

    const handleSignClick = async () => {
        setLoading(true);
        const convertEmail = emailField.toLowerCase();
        if(nameField.length < 2){
            alert('O campo nome, precisa de pelo menos 2 caracteres');
        }
        if(passwordField != passwordconfirmField){
            alert('As senhas não são iguais, verifique novamente');
        }
        if(nameField != '' && convertEmail != '' && passwordField != '' && passwordconfirmField != '') {
            let res = await Api.updateUser({
                name: nameField,
                email: convertEmail,
                password: passwordField,
                password_confirm: passwordconfirmField
            });
            
            if(res.token) {
                await AsyncStorage.setItem('token', res.token);
                userDispatch({
                    type: 'setAvatar',
                    payload:{
                        avatar: res.data.avatar
                    }
                });

            } else {
                alert('Houve um erro!');
            }
        } else {
            alert("Preencha os campos!");
        }

        setLoading(false);
    }

    const handleUpdateImage = async() => {
        let res = await Api.updateAvatar({
            avatar: avatar            
        })
        if(res.error == '') {
            ImagePicker.openPicker({
                with:300,
                height:300,
                cropping: true
            }).then(avatar => {
                
                setAvatar(avatar.path);
            });
        }else{
            alert("Erro: "+res.error);
        }

        
    }

    const handleLogoutClick = async () => {
        await Api.logout();
        navigation.reset({
            routes:[{name:'SignIn'}]
        });
    }
    
    const onRefresh = () => {
        setRefreshing(false);
        
    }
    return (
        <Container>
            <ProfileItem onPress={handleUpdateImage}>
            
            <UserAvatar
            
            source={{uri:userInfo.avatar}}
            
            />
            </ProfileItem>
            <InputArea>
                <SignInput
                    IconSvg={PersonIcon} 
                    placeholder={userInfo.name}
                    value={nameField}
                    onChangeText={t=>setNameField(t)}
                />
                <SignInput
                    IconSvg={EmailIcon} 
                    placeholder={userInfo.email}
                    value={emailField}
                    onChangeText={t=>setEmailField(t)}
                />
                <SignInput
                    IconSvg={LockIcon}
                    placeholder="Digite sua nova senha"
                    value={passwordField}
                    onChangeText={t=>setPasswordField(t)}
                    password={true}
                />
                <SignInput
                    IconSvg={LockIcon}
                    placeholder="Confirme sua nova senha"
                    value={passwordconfirmField}
                    onChangeText={t=>setPasswordConfirmField(t)}
                    password={true}
                />
                <CustomButton onPress={handleSignClick}>
                    <CustomButtonText>ALTERAR</CustomButtonText>
                </CustomButton>
                <CustomButtonL onPress={handleLogoutClick}>
                    <CustomButtonText>SAIR</CustomButtonText>
                </CustomButtonL>                    
            </InputArea>
            <Scroller refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            </Scroller>
        </Container>
    );
}
