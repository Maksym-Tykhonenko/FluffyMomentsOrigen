import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  ScrollView,
  Vibration,Share
} from 'react-native';
import MainLayout from '../../component/Loyout/MainLayout';
import {mood} from '../../data/mood';
import LinearGradient from 'react-native-linear-gradient';
import {useAppContext} from '../../store/context';

const SelectedMoodTask = ({route, navigation}) => {
  const [timeLeft, setTimeLeft] = useState(6); // 10 minutes in seconds
  const [isActive, setIsActive] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const {saveFavoriteTask, saveFavoriteQuote, isFavorite} = useAppContext();
  const [isBookmarked, setIsBookmarked] = useState(false);

  const selectedMoodId = route.params?.selectedMoodId;
  const selectedAnimal = mood.find(animal => animal.id === selectedMoodId);

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsDone(true);
      setIsActive(false);
      Vibration.vibrate([0, 500, 200, 500]);
    }
    return () => {
      clearInterval(interval);
      Vibration.cancel();
    };
  }, [isActive, timeLeft]);

  useEffect(() => {
    // Check if task/quote is already favorited
    setIsBookmarked(isFavorite(selectedAnimal.id, isDone ? 'quote' : 'task'));
  }, [isDone, selectedAnimal.id]);

  const startTimer = () => {
    setIsActive(true);
  };

  const handleDone = () => {
    const taskData = {
      selectedAnimal: {
        id: selectedAnimal.id,
        name: selectedAnimal.name,
        power: selectedAnimal.power,
        dailyTask: selectedAnimal.dailyTask,
        dailyQuote: selectedAnimal.dailyQuote,
        author: selectedAnimal.author,
      },
      completedAt: new Date().toISOString(),
      taskCompleted: true,
      taskDuration: 300 - timeLeft, // Time spent on task in seconds
    };

    navigation.navigate('TrackMood', taskData);
  };

  const handleBookmark = async () => {
    if (isDone) {
      // Save quote
      const quoteData = {
        id: selectedAnimal.id,
        quote: selectedAnimal.dailyQuote,
        author: selectedAnimal.author,
        animalName: selectedAnimal.name,
        savedAt: new Date().toISOString(),
      };
      const result = await saveFavoriteQuote(quoteData);
      setIsBookmarked(result.action === 'added');
    } else {
      // Save task
      const taskData = {
        id: selectedAnimal.id,
        task: selectedAnimal.dailyTask,
        animalName: selectedAnimal.name,
        savedAt: new Date().toISOString(),
      };
      const result = await saveFavoriteTask(taskData);
      setIsBookmarked(result.action === 'added');
    }
  };

  const formatTime = seconds => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`;
  };

  const getButtonText = () => {
    if (isDone) return 'Done';
    if (isActive) return 'Wait for timer...';
    return 'Start task';
  };

  const handleShare = () => {
    const message = `Check out this quote from ${selectedAnimal?.name}: "${selectedAnimal?.dailyQuote}" - ${selectedAnimal?.author}`;
    Share.share({
      message,
    });
  };

  return (
    <MainLayout>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image source={selectedAnimal?.image} style={styles.animalImage} />
          </View>

          <Text style={styles.title}>
            {`Fluffy ${selectedAnimal?.name?.split(' ')[1]} (${
              selectedAnimal?.power
            })`}
          </Text>

          <View style={styles.progressBar}>
            <View
              style={[
                styles.progress,
                {width: isDone ? '100%' : `${(300 - timeLeft) / 3}%`},
              ]}
            />
          </View>

          <View style={styles.taskCard}>
            <View style={styles.timerContainer}>
              <Image
                source={require('../../assets/image/icons/timer.png')}
                style={styles.timerIcon}
              />
              <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
            </View>
            <Text style={styles.taskTitle}>
              {isDone ? 'Daily Quote:' : 'Daily Task for Self-Improvement:'}
            </Text>
            {isDone ? (
              <>
                <Text style={styles.taskDescription}>
                  " {selectedAnimal?.dailyQuote}
                </Text>
                <Text style={styles.author}>- {selectedAnimal?.author}</Text>
              </>
            ) : (
              <Text style={styles.taskDescription}>
                {selectedAnimal?.dailyTask}
              </Text>
            )}
          </View>

          <View style={styles.buttonGroup}>
            <Pressable
              onPress={isDone ? handleDone : startTimer}
              disabled={isActive}
              style={({pressed}) => [
                styles.startButton,
                {transform: [{scale: pressed ? 0.95 : 1}]},
              ]}>
              <LinearGradient
                colors={['#FF64FF', '#D45579']}
                style={[
                  styles.gradientButton,
                  isActive && styles.disabledButton,
                ]}>
                <Text style={styles.buttonText}>{getButtonText()}</Text>
              </LinearGradient>
            </Pressable>

            <View style={styles.iconButtons}>
              <Pressable
                style={[
                  styles.iconButton,
                  isBookmarked && styles.bookmarkedButton,
                ]}
                onPress={handleBookmark}>
                <Image
                  source={require('../../assets/image/icons/bookmark.png')}
                  style={[styles.icon, isBookmarked && styles.bookmarkedIcon]}
                />
              </Pressable>
              <Pressable style={styles.iconButton} onPress={handleShare}>
                <Image
                  source={require('../../assets/image/icons/share.png')}
                  style={styles.icon}
                />
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </MainLayout>
  );
};

export default SelectedMoodTask;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  imageContainer: {
    width: 200,
    height: 200,
    marginTop: 20,
  },
  animalImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    color: '#80213C',
    textAlign: 'center',
    marginVertical: 20,
  },
  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: '#FFF',
    borderRadius: 4,
    marginVertical: 10,
  },
  progress: {
    height: '100%',
    backgroundColor: '#FF64FF',
    borderRadius: 4,
    transition: 'width 0.3s ease',
  },
  timerContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFC1FF',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginVertical: 10,
    width: '30%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 110,
  },
  timerIcon: {
    width: 30,
    height: 30,
    marginRight: 8,
  },
  timerText: {
    color: '#80213C',
    fontSize: 16,
    fontWeight: 'bold',
  },
  taskCard: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 20,
    width: '100%',
    marginVertical: 20,
    borderWidth: 1,
    borderColor: '#822E46',
  },
  taskTitle: {
    fontSize: 18,
    color: '#80213C',
    marginBottom: 10,
    alignSelf: 'center',
  },
  taskDescription: {
    fontSize: 18,
    color: '#666',
    lineHeight: 24,
    textAlign: 'center',
  },
  buttonGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  startButton: {
    flex: 1,
    marginRight: 10,
  },
  gradientButton: {
    borderRadius: 25,
    alignItems: 'center',
    borderRadius: 32,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    padding: 24,
  },
  iconButtons: {
    flexDirection: 'row',
  },
  iconButton: {
    width: 65,
    height: 65,
    backgroundColor: '#FFF',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  icon: {
    width: 32,
    height: 32,
  },
  disabledButton: {
    opacity: 0.7,
  },
  author: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    textAlign: 'right',
    marginTop: 10,
  },
  bookmarkedButton: {
    backgroundColor: '#FFC1FF',
  },
  bookmarkedIcon: {
    tintColor: '#FF64FF',
  },
});
