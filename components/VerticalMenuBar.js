import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

const VerticalMenuBar = ({containerStyle, label, isSelected, onPress}) => {
  return (
    <TouchableOpacity
      style={{
        transform: [{rotate: '-90deg'}],
        alignItems: 'center',
        ...containerStyle,
      }}
      onPress={onPress}>
      <Text style={{color: isSelected ? '#fff' : '#7EBDA2', fontSize: 20}}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default VerticalMenuBar;
