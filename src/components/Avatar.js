import React, { useContext, useState, useEffect} from 'react';
import styled from 'styled-components/native';
import ImagePicker from 'react-native-image-crop-picker';
import { UserContext } from '../contexts/UserContext';
import Api from '../Api';
const ProfileArea = styled.View`
    
    
    flex-direction: row;
`;

const ProfileItem = styled.TouchableOpacity`
    
    justify-content: center;
    align-items: center;
`;

const AvatarIcon = styled.Image`
    width: 134px;
    height: 134px;
    border-radius: 48px;
`;


export default ({ state }) => {
    const { state:user } = useContext(UserContext);
    const [avatar, setAvatar] = useState('');


    const handleUpdateImage = async() => {
        let res = await Api.updateAvatar({
            avatar: avatar
        })
        if(res.error == '') {
           
        }else{
            alert("Erro: "+res.error);
        }
        
        ImagePicker.openPicker({
                with:300,
                height:300,
                cropping: true
            }).then(avatar => {
                
                setAvatar(avatar.path);
            });
    }

    return (
            <ProfileArea>
                <ProfileItem onPress={handleUpdateImage}>
                    
                    { user.avatar != '' ?
                        <AvatarIcon source={{uri: avatar}} />
                        :
                        <AccountIcon style={{opacity: state.index===4? 1 : 0.5}} width="24" height="24" fill="#FFFFFF" />
                    }
                </ProfileItem>
            </ProfileArea>
    );
}