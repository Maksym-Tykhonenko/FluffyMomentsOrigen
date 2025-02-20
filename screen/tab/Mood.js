import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MainLayout from '../../component/Loyout/MainLayout';
import {mood} from '../../data/mood';
import {MoodLoading} from '../stack';

const Mood = ({navigation}) => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const selectedAnimal = mood.find(animal => animal.id === selectedMood);

  const handleContinue = () => {
    navigation.replace('MoodLoading', {
      selectedMoodId: selectedMood,
    });
  };

  if (isLoading) {
    return <MoodLoading />;
  }

  return (
    <MainLayout>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Image
            source={require('../../assets/image/appName/appName.png')}
            style={styles.appName}
          />
        </View>
        <Text style={styles.title}>Choose Your Fluffy Friend</Text>
        <Text style={styles.subtitle}>
          Select a companion to guide your day's journey
        </Text>
        <View style={styles.grid}>
          {mood.map(animal => (
            <Pressable
              key={animal.id}
              onPress={() => setSelectedMood(animal.id)}
              style={({pressed}) => [
                styles.animalCard,
                selectedMood === animal.id
                  ? styles.selectedCard
                  : styles.normalCard,
                {transform: [{scale: pressed ? 0.95 : 1}]},
              ]}>
              <View style={styles.imageContainer}>
                <Image source={animal.image} style={styles.animalImage} />
              </View>
              <Text style={styles.animalName}>{animal.name}</Text>
              <Text style={styles.animalTrait}>{animal.trait}</Text>
            </Pressable>
          ))}
        </View>

        {selectedMood && (
          <Pressable
            onPress={handleContinue}
            style={({pressed}) => [
              styles.pressable,
              {transform: [{scale: pressed ? 0.95 : 1}]},
            ]}>
            <LinearGradient
              colors={['#FF64FF', '#D45579']}
              style={styles.buttonContainer}>
              <Text style={styles.buttonText}>
                Continue with {selectedAnimal?.name?.split(' ')[1]}
              </Text>
            </LinearGradient>
          </Pressable>
        )}
        <View style={{height: 110}} />
      </ScrollView>
    </MainLayout>
  );
};

export default Mood;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#80213C',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 20,
  },
  animalCard: {
    width: '47%',
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
  },
  normalCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#822E46',
  },
  selectedCard: {
    backgroundColor: '#FFC1FF',
    borderWidth: 3,
    borderColor: '#822E46',
  },
  imageContainer: {
    width: 120,
    height: 120,
    marginBottom: 10,
  },
  animalImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  animalName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#80213C',
    marginBottom: 5,
  },
  animalTrait: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  appName: {
    width: '100%',
    resizeMode: 'contain',
  },
  pressable: {
    width: '100%',
    marginTop: 30,
    marginBottom: 20,
  },
  buttonContainer: {
    borderRadius: 25,
    alignItems: 'center',
  },
  buttonText: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
