import React, {useRef, useState, useEffect, useCallback} from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Text,
  Animated,
  Image,
  Dimensions,
} from 'react-native';
import {connect} from 'react-redux';

//Constants
import {promoTabs} from '../constants/promoTab';
import dummyData from '../constants/dummy';
import CustomButton from '../components/CustomButton';

//Components
import Header from '../components/Header';

const {width, height} = Dimensions.get('window');

const PromoTab = promoTabs.map(promoTab => ({
  //just addig ref to promoTabs Array
  ...promoTab,
  ref: React.createRef(),
}));

const ActiveTabIndicator = ({measureLayout, scrollX}) => {
  const tabIndicatorWidth = scrollX.interpolate({
    inputRange: PromoTab.map((_, i) => i * width), //index i.e position only required
    outputRange: measureLayout.map(measure => measure.width),
  });
  const xPositionOfTab = scrollX.interpolate({
    inputRange: PromoTab.map((_, i) => i * width),
    outputRange: measureLayout.map(measure => measure.x),
  });
  return (
    <Animated.View
      style={{
        position: 'absolute',
        left: 0,
        backgroundColor: '#37A372',
        width: tabIndicatorWidth, //width of tab and width of after ref;
        height: 40,
        borderRadius: 12,
        transform: [{translateX: xPositionOfTab}],
      }}
    />
  );
};
const Tabs = ({appTheme, scrollX, activeTabPress}) => {
  const containerRef = React.useRef(); //specifying container ref i,e 2 step
  const [measureLayout, setMeasureLayout] = useState([]); //x,y,width,height of 3 tabs
  const tabPosition = Animated.divide(scrollX, width);
  {
    // console.log('measureLayoutState', measureLayout);
    /* [
    {"height": 21.66666603088379, "width": 91.33333587646484, "x": 19, "y": 10}, 
  {"height": 21.66666603088379, "width": 116.33333587646484, "x": 148.6666717529297, "y": 10},
   {"height": 21.66666603088379, "width": 37.66666793823242, "x": 303.3333435058594, "y": 10}
] */
  }
  useEffect(() => {
    let ml = [];

    PromoTab.forEach(promo => {
      //loop through all tabs & get access to ref & measure layout
      promo.ref.current.measureLayout(
        containerRef.current, //1st argument
        (x, y, width, height) => {
          //console.log(`x = ${x}, y = ${y},width = ${width}, height= ${height}`);
          ml.push({x, y, width, height});
          // console.log('measureLayoutArray', ml); //[{"height": 21.666, "width": 91.33, "x": 19, "y": 10}]
          if (ml.length === PromoTab.length) {
            setMeasureLayout(ml);
          }
        },
      );
    });
  }, [containerRef.current]);
  return (
    <View
      ref={containerRef} //1 step
      style={{
        flexDirection: 'row',
        backgroundColor: appTheme.tabBackgroundColor,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'space-around',
        borderRadius: 12,
        paddingVertical: 10,
      }}>
      {/*Active tab indicator*/}
      {measureLayout.length > 0 && (
        <ActiveTabIndicator measureLayout={measureLayout} scrollX={scrollX} />
      )}

      {/*Tabs*/}
      {PromoTab.map((item, index) => {
        //console.log('promoTabafteraddingRef', item); //"ref": {"current": null}
        const animatedTextColor = tabPosition.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: ['#000000', '#fff', '#000000'],
          extrapolate: 'clamp',
        });
        return (
          <TouchableOpacity key={index} onPress={() => activeTabPress(index)}>
            <View ref={item.ref}>
              {/*access to ref properties of each of tabs which allows us to measure layout*/}
              <Animated.Text style={{color: animatedTextColor, fontSize: 16}}>
                {item.title}
              </Animated.Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const Home = ({appTheme, navigation}) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const detailScrollViewRef = useRef();
  const activeTabPress = useCallback(index => {
    return detailScrollViewRef?.current?.scrollToOffset({
      offset: index * width, //click item position * window width
    });
  });
  const renderAvailabeRewards = () => {
    return (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          height: 100,
          marginTop: 24,
          marginHorizontal: 24,
        }}
        onPress={() => {}}>
        {/*Reward Cup*/}
        <View
          style={{
            backgroundColor: '#D993B4',
            height: '100%',
            width: 100,
            alignItems: 'center',
            justifyContent: 'center',
            borderTopLeftRadius: 15,
            borderBottomLeftRadius: 15,
          }}>
          <ImageBackground
            source={require('../assests/images/reward.png')}
            resizeMode="contain"
            style={{
              width: 85,
              height: 85,
              justifyContent: 'space-around',
              alignItems: 'center',
            }}>
            <View
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                height: 30,
                width: 30,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 15,
              }}>
              <Text style={{color: '#fff', fontSize: 22}}>100</Text>
            </View>
          </ImageBackground>
        </View>
        {/*Reward Details*/}
        <View
          style={{
            backgroundColor: '#F3DEE8',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            marginLeft: -10,
            borderRadius: 15,
          }}>
          <Text>Available Rewards</Text>
          <View
            style={{
              backgroundColor: '#37A372',
              padding: 8,
              borderRadius: 24,
              marginTop: 5,
            }}>
            <Text>150 points</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderMainSection = () => {
    return (
      <View>
        {/*Header - Tabs*/}
        <Tabs
          appTheme={appTheme}
          scrollX={scrollX}
          activeTabPress={activeTabPress}
        />
        {/*Details*/}
        <Animated.FlatList
          ref={detailScrollViewRef}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          pagingEnabled={true}
          scrollEventThrottle={16}
          snapToAlignment="center"
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {useNativeDriver: false},
          )}
          data={dummyData.promos}
          keyExtractor={item => `${item.id}`}
          renderItem={({item, index}) => {
            //console.log('Item', item);
            return (
              <View
                style={{alignItems: 'center', paddingTop: 24, width: width}}>
                <Image
                  source={item.image}
                  resizeMode="contain"
                  style={{width: '100%', height: 100}}
                />
                {/*Name*/}
                <Text style={{color: '#fff', fontSize: 20}}>{item.name}</Text>
                {/*Description*/}
                <Text style={{marginTop: 3, color: appTheme.textColor}}>
                  {item.description}
                </Text>
                {/*Calories*/}
                <Text
                  style={{
                    marginTop: 3,
                    color: appTheme.textColor,
                  }}>{`Calories: ${item.calories}`}</Text>
                {/*Button*/}
                <CustomButton
                  label="Order"
                  labelStyle={{fontSize: 18}}
                  primaryButton={true}
                  containerStyle={{
                    marginTop: 10,
                    paddingHorizontal: 20,
                    paddingVertical: 20,
                    borderRadius: 24,
                  }}
                  onPress={() => navigation.navigate('Location')}
                />
              </View>
            );
          }}
        />
      </View>
    );
  };
  return (
    <View style={{flex: 1}}>
      <Header />
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: appTheme.backgroundColor,
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          marginTop: -28,
        }}
        contentContainerStyle={{
          paddingBottom: 150,
        }}>
        {/* Rewards */}
        {renderAvailabeRewards()}
        {/* Promo */}
        {renderMainSection()}
      </ScrollView>
    </View>
  );
};

const mapStateToProps = state => {
  return {
    appTheme: state.theme.appTheme,
    error: state.theme.error,
  };
};

export default connect(mapStateToProps)(Home);
