import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  SafeAreaView,
  ScrollView,
  Pressable,
} from 'react-native';
import {useState} from 'react';
import MainLayout from '../../component/Loyout/MainLayout';
import LinearGradient from 'react-native-linear-gradient';

const pages = [
  {
    title: 'Welcome to Fluffy Moments!',
    header: '',
    description:
      'Discover daily inspiration, tasks, and uplifting quotes with your fluffy companions. Let every moment feel magical!',
    btnText: 'Let’s Begin',
  },
  {
    title: 'Meet Your Fluffy Friends',
    header: 'Each fluffy brings a unique vibe:',
    description:
      '🦁 Lion: Strength & Confidence\n🐘 Elephant: Wisdom & Tranquility\n🐒 Monkey: Joy & Fun\n🐉 Dragon: Imagination & Adventure',
    btnText: 'Meet Them',
  },
  {
    title: 'What Awaits You',
    header: 'Every day, Fluffy Moments offers:',
    description:
      '✨ A task to boost your self-growth\n🖋️ A quote to inspire your soul\n🌈 Gentle vibes for a positive day',
    btnText: 'Show Me How',
  },
  {
    title: 'Your First Moment Awaits!',
    description:
      'Select a fluffy friend to start your day with strength, wisdom, joy, or imagination.',
    btnText: 'Choose My Fluffy',
  },
];

const Introduction = ({navigation}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const goToNextSlide = () => {
    if (currentSlideIndex < pages.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  return (
    <MainLayout>
      {/* <SafeAreaView style={styles.container}> */}
      <ScrollView
        // style={styles.container}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{flex: 1, paddingTop: 20}}>
        <Image
          source={require('../../assets/image/logo/logo.png')}
          style={styles.logo}
        />
        <View style={styles.content}>
          <Text style={styles.title}>{pages[currentSlideIndex].title}</Text>
          <Text style={styles.description}>
            {pages[currentSlideIndex].description}
          </Text>
          <View style={styles.pagination}>
            {pages.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.paginationDot,
                  currentSlideIndex === index && styles.paginationDotActive,
                ]}
              />
            ))}
          </View>
          {currentSlideIndex < pages.length - 1 ? (
            <Pressable
              onPress={goToNextSlide}
              style={({pressed}) => [
                styles.pressable,
                {transform: [{scale: pressed ? 0.95 : 1}]},
              ]}>
              <LinearGradient
                colors={['#FF64FF', '#D45579']}
                style={styles.buttonContainer}>
                <Text style={styles.buttonText}>
                  {pages[currentSlideIndex].btnText}
                </Text>
              </LinearGradient>
            </Pressable>
          ) : (
            <Pressable
              onPress={() => navigation.navigate('TabMenuNav')}
              style={({pressed}) => [
                styles.pressable,
                {transform: [{scale: pressed ? 0.95 : 1}]},
              ]}>
              <LinearGradient
                colors={['#FF64FF', '#D45579']}
                style={styles.buttonContainer}>
                <Text style={styles.buttonText}>
                  {pages[currentSlideIndex].btnText}
                </Text>
              </LinearGradient>
            </Pressable>
          )}
      <View style={{height: 30}} />
        </View>
      </ScrollView>
      {/* </SafeAreaView> */}
    </MainLayout>
  );
};

export default Introduction;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFC1FF',
    borderRadius: 20,
    borderTopWidth: 3,
    borderTopColor: '#822E46',
  },
  logo: {
    width: 300,
    height: 350,
    alignSelf: 'center',
    marginBottom: 30,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 15,
    color: '#80213C',
  },
  description: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ccc',
    marginHorizontal: 5,
  },
  paginationDotActive: {
    backgroundColor: '#FF69B4',
  },
  pressable: {
    width: 'auto',
    height: 'auto',
  },
  buttonContainer: {
    borderRadius: 25,
    opacity: 1,
  },
  buttonText: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    opacity: 1,
  },
});
