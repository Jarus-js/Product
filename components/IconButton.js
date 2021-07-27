import React from 'react';
import {TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const IconButton = ({containerStyle, icon, onPress}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        ...containerStyle,
      }}>
      <Ionicons name={icon} size={30} color="#fff" />
    </TouchableOpacity>
  );
};

export default IconButton;
