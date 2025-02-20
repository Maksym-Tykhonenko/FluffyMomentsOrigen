import React, {useState} from 'react';
import {StyleSheet, Text, View, Pressable, Animated} from 'react-native';
import MainLayout from '../../component/Loyout/MainLayout';
import LinearGradient from 'react-native-linear-gradient';
import {useAppContext} from '../../store/context';
import { pauseBackgroundMusic, playBackgroundMusic } from '../../component/soundSetUp/SetSound';

const CustomSwitch = ({isEnabled, onToggle}) => {
  const translateX = useState(new Animated.Value(isEnabled ? 36 : 0))[0];

  const toggleSwitch = () => {
    Animated.spring(translateX, {
      toValue: isEnabled ? 0 : 36,
      useNativeDriver: true,
      bounciness: 12,
    }).start();
    onToggle(!isEnabled);
  };

  return (
    <Pressable onPress={toggleSwitch}>
      <LinearGradient
        colors={isEnabled ? ['#FF64FF', '#D45579'] : ['#E0E0E0', '#CCCCCC']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={styles.switchTrack}>
        <Animated.View
          style={[
            styles.switchThumb,
            {transform: [{translateX}]},
            isEnabled && styles.switchThumbActive,
          ]}
        />
      </LinearGradient>
    </Pressable>
  );
};

const Sound = () => {


  const {isMusicEnabled, setIsMusicEnabled} = useAppContext();
  const handleMusicToggle = async value => {
    // console.log('value', value);
    setIsMusicEnabled(value);
    if (value) {
      await playBackgroundMusic();
    } else {
      pauseBackgroundMusic();

    }
   
  };

  return (
    <MainLayout>
      <View style={styles.container}>
        <Text style={styles.title}>Sound Settings</Text>

        <View style={styles.settingCard}>
          <View style={styles.settingRow}>
            <Text style={styles.settingText}>Background Music</Text>
            <CustomSwitch

              isEnabled={isMusicEnabled}
              onToggle={handleMusicToggle}
            />
          </View>
          <Text style={styles.settingDescription}>
            Toggle background music for a more immersive experience
          </Text>
        </View>
      </View>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: '20%',
  },
  title: {
    fontSize: 24,
    color: '#80213C',
    marginBottom: 30,
  },
  settingCard: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  settingText: {
    fontSize: 20,
    color: '#80213C',
    fontWeight: '500',
  },
  settingDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  switchTrack: {
    width: 72,
    height: 36,
    borderRadius: 18,
    padding: 2,
  },
  switchThumb: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  switchThumbActive: {
    backgroundColor: '#FFF',
  },
});

export default Sound;
