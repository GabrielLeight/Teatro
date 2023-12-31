import React from "react";
import { View, TextInput, StyleSheet } from 'react-native'

const CustomInput = ({value, setValue, placeholder, secureTextEntry, bgColor, ml = 0, mr = 0, multiline = false }) => {
    return (
    
        <View style={[styles.container, {backgroundColor: bgColor}, {marginLeft: ml}, {marginRight: mr}]}>
            <TextInput
                placeholder={placeholder}
                style={[styles.input, { height: multiline ? Math.max(40, value.toString().split('\n').length * 20) : undefined }]}
                value = {value.toString()}
                onChangeText = {setValue}
                secureTextEntry = {secureTextEntry}
                multiline={multiline} 
                />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        width: '100%',

        borderColor: '#efefef',
        borderWidth: 1,
        borderRadius: 10,
       
        paddingHorizontal: 10,
        marginVertical: 5,
    },
    input:{
        color: 'black',
        textAlign: 'center',
    },

});
export {styles}
export default CustomInput;