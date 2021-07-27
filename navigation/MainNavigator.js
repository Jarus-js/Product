import React from 'react';
import {
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Svg, {Path} from 'react-native-svg';
//import {createDrawerNavigator} from '@react-navigation/drawer';
//import {createStackNavigator} from '@react-navigation/stack';

//Screens
import Home from '../screens/Home';
import Rewards from '../screens/Rewards';
import Order from '../screens/Order';
import Location from '../screens/Location';
import OrderDetail from '../screens/OrderDetail';

const Tab = createBottomTabNavigator();

const TabBarCustomButton = ({children, onPress, isFloat, containerStyle}) => {
  if (isFloat) {
    return (
      <View style={{flex: 1, alignItems: 'center'}}>
        <Svg width={90} height={61} viewBox="0 0 90 61">
          <Path
            d="M0 0a38.742 38.742 0 0113 7c5.313 4.4 6.7 8.593 12 13 5.993 4.98 12.987 8 20 8s14.007-3.02 20-8c5.3-4.408 6.687-8.6 12-13a38.742 38.742 0 0113-7v61H0V0z"
            fill="#4d4d4d"
            fillRule="evenodd"
          />
        </Svg>
        <TouchableOpacity
          style={{
            position: 'absolute',
            top: -20,
            justifyContent: 'center',
            alignItems: 'center',
            width: 45,
            height: 40,
            borderRadius: 20,
            backgroundColor: '#4d4d4d',
          }}
          onPress={onPress}>
          {children}
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <TouchableWithoutFeedback onPress={onPress}>
        <View
          style={{
            flex: 1,
            height: 60,
            backgroundColor: '#4D4D4D',
            ...containerStyle,
          }}>
          {children}
        </View>
      </TouchableWithoutFeedback>
    );
  }
};

const MainNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Rewards') {
            iconName = focused ? 'star' : 'star-outline';
          } else if (route.name === 'Order') {
            iconName = focused ? 'add' : 'add-outline';
          } else if (route.name === 'Location') {
            iconName = focused ? 'heart' : 'heart-outline';
          } else {
            iconName = focused
              ? 'information-circle'
              : 'information-circle-outline';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={28} color="#fff" />;
        },
      })}
      tabBarOptions={{
        showLabel: false,
        style: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 0,
          backgroundColor: 'transparent',
          borderTopColor: 'transparent',
          height: Platform.OS == 'android' ? 60 : 80,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarButton: props => (
            <TabBarCustomButton
              containerStyle={{borderTopLeftRadius: 20}}
              {...props}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Rewards"
        component={Rewards}
        options={{
          tabBarButton: props => (
            <TabBarCustomButton containerStyle={{marginRight: 8}} {...props} />
          ),
        }}
      />
      <Tab.Screen
        name="Order"
        component={Order}
        options={{
          tabBarButton: props => (
            <TabBarCustomButton isFloat={true} {...props} />
          ),
        }}
      />
      <Tab.Screen
        name="Location"
        component={Location}
        options={{
          tabBarButton: props => (
            <TabBarCustomButton containerStyle={{marginLeft: 8}} {...props} />
          ),
        }}
      />
      <Tab.Screen
        name="OrderDetail"
        component={OrderDetail}
        options={{
          tabBarButton: props => (
            <TabBarCustomButton
              containerStyle={{borderTopRightRadius: 20}}
              {...props}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainNavigator;
