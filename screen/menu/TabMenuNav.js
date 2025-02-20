import {StyleSheet, Text, View, Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Mood, Saves, Statistics, Sound} from '../tab';

const Tab = createBottomTabNavigator();

const TabMenuNav = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: 'white',
          borderRadius: 30,
          position: 'absolute',
          bottom: 20,
          left: 20,
          right: 20,
          height: 70,
          paddingBottom: 10,
          paddingTop: 10,
          marginHorizontal: 40,
        },
        tabBarShowLabel: false,
        headerShown: false,
      }}>
      <Tab.Screen
        name="Mood"
        component={Mood}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../../assets/image/tabBar/mood.png')}
              style={[
                styles.tabIcon,
                {tintColor: focused ? '#FF64FF' : '#666'},
              ]}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Statistics"
        component={Statistics}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../../assets/image/tabBar/statistics.png')}
              style={[
                styles.tabIcon,
                {tintColor: focused ? '#FF64FF' : '#666'},
              ]}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Saves"
        component={Saves}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../../assets/image/tabBar/saves.png')}
              style={[
                styles.tabIcon,
                {tintColor: focused ? '#FF64FF' : '#666'},
              ]}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Sound"
        component={Sound}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../../assets/image/tabBar/sound.png')}
              style={[
                styles.tabIcon,
                {tintColor: focused ? '#FF64FF' : '#666'},
              ]}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default TabMenuNav;

const styles = StyleSheet.create({
  tabIcon: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
    marginTop: 10,
  },
});
