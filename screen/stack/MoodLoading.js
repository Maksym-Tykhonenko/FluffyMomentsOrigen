import React, {useEffect, useRef} from 'react';
import {StyleSheet, Text, View, Image, Animated} from 'react-native';
import MainLayout from '../../component/Loyout/MainLayout';
import {mood} from '../../data/mood';

const MoodLoading = ({route, navigation}) => {
  const progressAnim = useRef(new Animated.Value(0)).current;
  const selectedMoodId = route.params?.selectedMoodId;
  const selectedAnimal = mood.find(animal => animal.id === selectedMoodId);
  console.log(selectedAnimal);

  useEffect(() => {
    // Animate progress bar
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: 1500, // 1.5 seconds
      useNativeDriver: false,
    }).start();

    // Navigate after 1.5 seconds
    const timer = setTimeout(() => {
      navigation.replace('SelectedMoodTask', {
        selectedMoodId: selectedMoodId,
      });
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <MainLayout>
      <View style={styles.container}>
        <Image
          source={require('../../assets/image/appName/appName.png')}
          style={styles.appName}
        />
        <Text style={styles.waitText}>Please wait ...</Text>

        {selectedAnimal && (
          <View style={styles.imageContainer}>
            <Image source={selectedAnimal.image} style={styles.animalImage} />
          </View>
        )}

        <View style={styles.progressContainer}>
          <Animated.View
            style={[
              styles.progressBar,
              {
                width: progressAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0%', '100%'],
                }),
              },
            ]}
          />
        </View>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    </MainLayout>
  );
};

export default MoodLoading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 80,
  },
  appName: {
    width: '100%',
    height: 160,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  waitText: {
    fontSize: 20,
    color: '#80213C',
    marginBottom: 10,
  },
  imageContainer: {
    width: 250,
    height: 200,
    marginVertical: 20,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  animalImage: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
  progressContainer: {
    width: '70%',
    height: 12,
    backgroundColor: '#FFF',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 10,
    marginTop: 70,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#FFC1FF',
    borderRadius: 4,
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
});
