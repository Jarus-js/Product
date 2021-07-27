import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

const CustomButton = ({
  label,
  labelStyle,
  onPress,
  containerStyle,
  primaryButton,
  secondaryButton,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: primaryButton ? '#37A372' : 'transparent',
        borderColor: secondaryButton ? '#37A372' : 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        ...containerStyle,
      }}>
      <Text style={{color: primaryButton ? '#fff' : '#37A372', ...labelStyle}}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
