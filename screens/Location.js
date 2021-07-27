import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';

//Dummy data
import dummyData from '../constants/dummy';
//Component
import IconButton from '../components/IconButton';
import TabButton from '../components/TabButton';

const Location = ({appTheme, navigation}) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const renderHeader = () => {
    return (
      <SafeAreaView
        style={{
          backgroundColor: '#4BEE70',
          height: 120,
          width: '100%',
          paddingVertical: 15,
        }}>
        <View style={{flexDirection: 'row'}}>
          {/*Back button*/}
          <IconButton icon="chevron-back" onPress={() => navigation.goBack()} />
          {/*title*/}
          <View style={{flex: 1, alignItems: 'center'}}>
            <Text style={{color: '#fff', fontSize: 24}}>Locations</Text>
          </View>
        </View>
      </SafeAreaView>
    );
  };

  const renderTabBar = () => {
    return (
      <View style={{flexDirection: 'row'}}>
        {/*Nearby*/}
        <TabButton
          label="Nearby"
          containerStyle={{width: 100}}
          selected={selectedTab == 0}
          onPress={() => setSelectedTab(0)}
        />
        {/*Previous*/}
        <TabButton
          label="Previous"
          containerStyle={{width: 100}}
          selected={selectedTab == 1}
          onPress={() => setSelectedTab(1)}
        />
        {/*Favourate*/}
        <TabButton
          label="Favourate"
          containerStyle={{width: 100}}
          selected={selectedTab == 2}
          onPress={() => setSelectedTab(2)}
        />
      </View>
    );
  };

  const renderSearchBar = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: '#BED2BB',
          height: 50,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 25,
          paddingHorizontal: 20,
          margin: 10,
        }}>
        <TextInput
          placeholder="Enter your city,state"
          placeholderTextColor="#707070"
          style={{flex: 1, height: 50, color: '#000000'}}
        />
        <Ionicons name="search" size={30} color="black" />
      </View>
    );
  };

  const renderDetailList = () => {
    return (
      <FlatList
        data={dummyData.locations}
        keyExtractor={item => item.id}
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => {
          console.log('Item', item);
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('OrderDetail', {selected: item})
              }
              style={{
                backgroundColor: appTheme.cardBackgroundColor,
                marginBottom: 12,
                paddingVertical: 12,
                paddingHorizontal: 24,
                borderRadius: 24,
              }}>
              {/*Name & Bookmark*/}
              <View style={{flexDirection: 'row'}}>
                <Text style={{flex: 1, color: appTheme.textColor}}>
                  {item.title}
                </Text>
                <Ionicons
                  name={item.bookmarked ? 'bookmark' : 'bookmark-outline'}
                  size={20}
                  color={item.bookmarked ? '#FF7363' : '#fff'}
                />
              </View>
              {/*Address*/}
              <View style={{marginTop: 8, width: '80%'}}>
                <Text style={{color: appTheme.textColor, lineHeight: 21}}>
                  {item.address}
                </Text>
              </View>
              {/*Services*/}
              <View style={{flexDirection: 'row', marginTop: 10}}>
                {/*Pickup*/}
                <View
                  style={{
                    borderColor: appTheme.textColor,
                    borderWidth: 1,
                    borderRadius: 20,
                    paddingHorizontal: 12,
                    paddingVertical: 5,
                  }}>
                  <Text style={{color: appTheme.textColor, fontWeight: 'bold'}}>
                    Pick Up
                  </Text>
                </View>
                {/*Drop*/}
                <View
                  style={{
                    borderColor: appTheme.textColor,
                    borderWidth: 1,
                    borderRadius: 20,
                    paddingHorizontal: 12,
                    paddingVertical: 5,
                    marginLeft: 10,
                  }}>
                  <Text style={{color: appTheme.textColor, fontWeight: 'bold'}}>
                    Drop
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    );
  };

  return (
    <View style={{flex: 1}}>
      {/*Header*/}
      {renderHeader()}
      {/*Detail*/}
      <View
        style={{
          flex: 1,
          backgroundColor: appTheme.backgroundColor,
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          marginTop: -25,
          padding: 20,
        }}>
        {renderTabBar()}
        {renderSearchBar()}
        {renderDetailList()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

const mapStateToProps = state => {
  //console.log('State', state);
  return {
    appTheme: state.theme.appTheme,
    error: state.theme.error,
  };
};

export default connect(mapStateToProps)(Location);
