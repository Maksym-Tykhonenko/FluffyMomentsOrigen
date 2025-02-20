import {StyleSheet, Text, View, ImageBackground} from 'react-native';
import React from 'react';

const MainLayout = ({children}) => {
  return (
    <ImageBackground
      source={require('../../assets/image/bg/bg.png')}
      style={{flex: 1}}>
      {children}
    </ImageBackground>
  );
};

export default MainLayout;

const styles = StyleSheet.create({});
