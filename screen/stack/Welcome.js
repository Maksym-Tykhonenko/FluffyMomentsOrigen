import {
  Image,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  AppState,
} from 'react-native';
import {useEffect, useState} from 'react';
import {
  pauseBackgroundMusic,
  playBackgroundMusic,
  setupPlayer,
} from '../../component/soundSetUp/SetSound';
import {useAppContext} from '../../store/context';

const Welcome = ({navigation}) => {
  const [isPlayMusic, setIsPlayMusic] = useState(false);
  const {isMusicEnable} = useAppContext();

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (nextAppState === 'active' && isPlayMusic && isMusicEnable) {
        playBackgroundMusic();
      } else if (nextAppState === 'inactive' || nextAppState === 'background') {
        pauseBackgroundMusic();
      }
    });

    const initMusic = async () => {
      await setupPlayer();
      if (isMusicEnable) {
        await playBackgroundMusic();
        setIsPlayMusic(true);
      }
    };
    initMusic();

    return () => {
      subscription.remove();
      pauseBackgroundMusic();
    };
  }, [isMusicEnable]);

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Introduction');
    }, 1500);
  }, []);

  return (
    <ImageBackground
      style={{width: '100%', height: '100%'}}
      source={require('../../assets/image/bg/bg.png')}>
      <Image
        source={require('../../assets/image/logo/logo.png')}
        style={{marginTop: '20%'}}
      />
    </ImageBackground>
  );
};

export default Welcome;

const styles = StyleSheet.create({});
