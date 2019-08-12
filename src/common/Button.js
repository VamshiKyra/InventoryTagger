import React from 'react';
import { View, Text, ActivityIndicator,TouchableOpacity } from 'react-native';
import {Styles} from "./Styles";
const Button = (props) =>{
    return(
        <TouchableOpacity activeOpacity={0.5} onPress={() => props.onClick()}>
        <View style={Styles.button}>
            <Text style={Styles.buttonText}>{props.label}</Text>
        </View>
        </TouchableOpacity>
    )
};
export default Button;