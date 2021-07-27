import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import {connect} from 'react-redux';
import Svg, {Circle} from 'react-native-svg';
import dummyData from '../constants/dummy';

//Component
import IconButton from '../components/IconButton';
import TabButton from '../components/TabButton';
import VerticalMenuBar from '../components/VerticalMenuBar';

const OrderDetail = ({route, navigation, appTheme}) => {
  console.log('Route', route);

  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('SpecialTea');
  const [menu, setMenu] = useState(null);
  useEffect(() => {
    const {selected} = route.params;
    setSelectedItem(selected);
  }, []);

  useEffect(() => {
    const menuList = dummyData.menuList.filter(
      menuItem => menuItem.category == selectedCategory,
    );
    setMenu(menuList);
  }, [selectedCategory]);
  //console.log('useState', selectedItem);
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
            <Text style={{color: '#fff', fontSize: 24}}>
              {selectedItem?.title}
            </Text>
          </View>
        </View>
      </SafeAreaView>
    );
  };

  const renderTabBar = () => {
    return (
      <View style={{flexDirection: 'row', marginBottom: 5}}>
        {/*Menu*/}
        <TabButton
          label="Menu"
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

  const renderSideBar = () => {
    return (
      <View>
        <Svg height="65" width="65" viewBox="0 0 65 65">
          <Circle cx="5" cy="60" r="60" fill={'#37A372'} />
        </Svg>
        <View
          style={{
            backgroundColor: '#37A372',
            width: 65,
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1,
          }}>
          <VerticalMenuBar
            label="Snack"
            isSelected={selectedCategory == 'Snack'}
            onPress={() => setSelectedCategory('Snack')}
          />
          <VerticalMenuBar
            label="Coffee"
            containerStyle={{marginTop: 40}}
            isSelected={selectedCategory == 'Coffee'}
            onPress={() => setSelectedCategory('Coffee')}
          />
          <VerticalMenuBar
            label="Smoothie"
            containerStyle={{marginTop: 60, width: 100}}
            isSelected={selectedCategory == 'Smoothie'}
            onPress={() => setSelectedCategory('Smoothie')}
          />
          <VerticalMenuBar
            label="SpecialTea"
            containerStyle={{marginTop: 80, width: 100}}
            isSelected={selectedCategory == 'SpecialTea'}
            onPress={() => setSelectedCategory('SpecialTea')}
          />
        </View>
        <Svg height="65" width="65" viewBox="0 0 65 65">
          <Circle cx="5" cy="0" r="60" fill={'#37A372'} />
        </Svg>
      </View>
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
        {/*TabBar*/}
        {renderTabBar()}
        {/*SideBar*/}
        <View style={{flex: 1, flexDirection: 'row'}}>
          {renderSideBar()}
          {/*Listing*/}
          <FlatList
            data={menu}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) => {
              console.log('thumbnailItem', item);
              return (
                <TouchableOpacity>
                  <View
                    style={{
                      height: 150,
                      marginTop: 12,
                      alignItems: 'flex-end',
                      justifyContent: 'flex-end',
                    }}>
                    {/*Thumbnail*/}
                    <View
                      style={{
                        position: 'absolute',
                        left: 5,
                        top: 0,
                        backgroundColor: '#FFD88A',
                        height: 140,
                        width: 140,
                        borderRadius: 12,
                        zIndex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        margin: 5,
                      }}>
                      <Image
                        source={item.thumbnail}
                        resizeMode="contain"
                        style={{width: 100, height: 100}}
                      />
                    </View>
                    {/*Description*/}
                    <View
                      style={{
                        width: '70%',
                        height: '85%',
                        backgroundColor: '#37A372',
                        paddingLeft: '30%',
                        paddingRight: 8,
                        paddingVertical: 8,
                        justifyContent: 'space-between',
                        borderRadius: 12,
                      }}>
                      <Text style={{color: '#fff', fontSize: 18}}>
                        {item.name}
                      </Text>
                      <Text style={{color: '#FFD88A', fontSize: 16}}>
                        {item.price}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
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

export default connect(mapStateToProps)(OrderDetail);
