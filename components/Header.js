import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';

//Action
import {toggleTheme} from '../store/themeAction';

const Header = ({appTheme, toggleTheme}) => {
  const toggleThemeHandler = () => {
    if (appTheme.name == 'light') {
      toggleTheme('dark');
    } else {
      toggleTheme('light');
    }
  };
  return (
    <SafeAreaView
      style={{
        flexDirection: 'row',
        backgroundColor: '#4D4D4D',
        width: '100%',
        height: 125,
      }}>
      {/*Greetings*/}
      <View style={{flex: 1, paddingLeft: 20}}>
        <Text style={{fontSize: 22, fontWeight: 'bold', color: '#fff'}}>
          Jarus
        </Text>
        <Text style={{fontSize: 16, color: '#fff'}}>Welcome</Text>
      </View>
      {/*Buttons*/}
      <TouchableOpacity
        onPress={() => toggleThemeHandler()}
        style={{
          backgroundColor: '#000000',
          borderRadius: 10,
          height: 30,
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: 20,
          paddingHorizontal: 10,
        }}>
        {/*On*/}
        <View
          style={{
            marginRight: 15,
            ...(appTheme.name == 'light' ? styles.selectedLightMode : {}),
          }}>
          <Ionicons name="sunny" size={20} color="#fff" />
        </View>
        {/*Off*/}
        <View
          style={{...(appTheme.name == 'dark' ? styles.selectedDarkMode : {})}}>
          <Ionicons name="moon" size={20} color="#fff" />
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  //colors for switch button only not body i.e home
  selectedDarkMode: {
    borderRadius: 20,
    backgroundColor: '#D84035',
    padding: 5,
  },
  selectedLightMode: {
    borderRadius: 20,
    backgroundColor: '#4BEE70',
    padding: 5,
  },
});

const mapStateToProps = state => {
  //console.log('State', state);
  return {
    appTheme: state.theme.appTheme,
    error: state.theme.error,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleTheme: themeType => {
      return dispatch(toggleTheme(themeType));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
