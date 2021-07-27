import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';

const TabButton = ({containerStyle, label, selected, onPress}) => {
  return (
    <TouchableOpacity
      style={{alignItems: 'center', ...containerStyle}}
      onPress={onPress}>
      {/*Text*/}
      <Text style={{color: selected ? '#4BEE70' : '#fff', fontSize: 18}}>
        {label}
      </Text>
      {/* Line */}
      <View
        style={{
          marginTop: selected ? 3 : 4,
          height: selected ? 4 : 2,
          width: '100%',
          backgroundColor: selected ? '#4BEE70' : '#2C2C2C',
        }}></View>
    </TouchableOpacity>
  );
};

export default TabButton;
