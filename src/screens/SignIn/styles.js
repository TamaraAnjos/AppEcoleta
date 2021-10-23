import React from 'react';
import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
    background-color: #56ad00;
    flex: 1;
    justify-content: center;
    align-items: center;
`;
export const InputArea = styled.View`
    width: 100%;
    padding: 40px;
    margin-top: -60px;
    background-color: #56ad00;
`;

export const CustomButton = styled.TouchableOpacity`
    height: 60px;
    background-color: #006400;
    border-radius: 30px;
    justify-content: center;
    align-items: center;
`;
export const CustomButtonText = styled.Text`
    font-size: 18px;
    color: #FFF;
`;

export const SignMessageButton = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: center;
    margin-top: 50px;
    margin-bottom: 20px;
`;
export const SignMessageButtonText = styled.Text`
    font-size: 16px;
    color: #006400;
`;
export const SignMessageButtonTextBold = styled.Text`
    font-size: 16px;
    color: #006400;
    font-weight: bold;
    margin-left: 5px;
`;