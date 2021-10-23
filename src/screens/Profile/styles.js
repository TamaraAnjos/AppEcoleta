import React from 'react';
import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
    background-color: #56ad00;
    flex: 1;
    justify-content: center;
    align-items: center;
`;

export const Scroller = styled.ScrollView`
    flex: 1;
    padding: 0 20px;
`;

export const InputArea = styled.View`
    width: 100%;
    padding: 40px;
    margin-bottom: -24px;
`;

export const CustomButton = styled.TouchableOpacity`
    height: 60px;
    background-color: #006400;
    border-radius: 30px;
    justify-content: center;
    align-items: center;
`;
export const CustomButtonL = styled.TouchableOpacity`
    height: 60px;
    background-color: #006400;
    border-radius: 30px;
    justify-content: center;
    align-items: center;
    margin-top: 9px;
`;

export const CustomButtonText = styled.Text`
    font-size: 18px;
    color: #FFF;
`;

export const LoadingIcon = styled.ActivityIndicator`
    margin-top: 50px;
`;

export const Text = styled.Text`
    font-size: 18px;
    color: #FFF;
`;

export const UserAvatar = styled.Image`
    
    flex-direction: row;
    margin-top: 20px;
    width: 112px;
    height: 110px;
    border-radius: 20px;
    margin-left: 30px;
    margin-right: 20px;
    border-width: 4px;
    border-color: #FFFFFF;
`;

export const ProfileItem = styled.TouchableOpacity`
    
    justify-content: center;
    align-items: center;
`;