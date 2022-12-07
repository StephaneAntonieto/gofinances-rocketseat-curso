import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Button = styled.TouchableOpacity`
    align-items: center;
    background-color: ${({theme}) => theme.colors.shape};
    border-radius: 5px;
    flex-direction: row;
    height: ${RFValue(56)}px;
    margin-bottom: 16px;
`;

export const ImageContainer = styled.View`
    height: 100%;
    justify-content: center;
    align-items: center;
    padding: ${RFValue(16)}px;
    border-color: ${({theme}) => theme.colors.background};
    border-right-width: 1px;
`;

export const Text = styled.Text`
    font-family: ${({theme}) => theme.fonts.medium};
    font-size: ${RFValue(14)}px;
    flex: 1;
    text-align: center;

`;
