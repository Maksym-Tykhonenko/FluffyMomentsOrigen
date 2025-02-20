
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import MainLayout from '../../component/Loyout/MainLayout';
import {useAppContext} from '../../store/context';
import {Image} from 'react-native';


const Statistics = () => {
  const {moodHistory} = useAppContext();

  const calculateMoodPercentages = () => {
    if (!moodHistory || moodHistory.length === 0) return { negative: 0, neutral: 0, positive: 0 };

    const moodCounts = moodHistory.reduce((acc, entry) => {
      if (entry.mood) {
        acc[entry.mood] = (acc[entry.mood] || 0) + 1;
      }
      return acc;
    }, {});

    const total = Object.values(moodCounts).reduce((sum, count) => sum + count, 0);

    return {
      negative: Math.round((moodCounts.negative || 0) / total * 100),
      neutral: Math.round((moodCounts.neutral || 0) / total * 100),
      positive: Math.round((moodCounts.positive || 0) / total * 100),
    };
  };

  const moodPercentages = calculateMoodPercentages();

  return (
    <MainLayout>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Mood tracker</Text>

        <View style={styles.moodStats}>
          <View style={styles.moodRow}>
            <View style={styles.moodRowContent}>
              <Image 
                source={require('../../assets/image/icons/thumbsDown.png')} 
                style={styles.moodIcon} 
              />
              <Text style={styles.dot}>•</Text>
              <Text style={styles.percentage}>{moodPercentages.negative}%</Text>
            </View>
          </View>

          <View style={styles.moodRow}>
            <View style={styles.moodRowContent}>
              <Image 
                source={require('../../assets/image/icons/neutral.png')} 
                style={styles.moodIcon} 
              />
              <Text style={styles.dot}>•</Text>
              <Text style={styles.percentage}>{moodPercentages.neutral}%</Text>
            </View>
          </View>

          <View style={styles.moodRow}>
            <View style={styles.moodRowContent}>
              <Image 
                source={require('../../assets/image/icons/thumbsUp.png')} 
                style={[styles.moodIcon, styles.positiveIcon]} 
              />
              <Text style={styles.dot}>•</Text>
              <Text style={styles.percentage}>{moodPercentages.positive}%</Text>
            </View>
          </View>
        </View>

        <Text style={styles.journalTitle}>Journal:</Text>

        <View style={styles.journalEntries}>
          {moodHistory.map((entry, index) => (
            <View key={index} style={styles.journalCard}>
              <View style={styles.journalHeader}>
                <Image 
                  source={
                    entry.mood === 'positive'
                      ? require('../../assets/image/icons/thumbsUp.png')
                      : entry.mood === 'negative'
                      ? require('../../assets/image/icons/thumbsDown.png')
                      : require('../../assets/image/icons/neutral.png')
                  }
                  style={[
                    styles.journalMoodIcon,
                    entry.mood === 'positive' && styles.positiveIcon
                  ]} 
                />
                <Text style={styles.journalDate}>
                  {new Date(entry.completedAt).toLocaleDateString()}
                </Text>
              </View>
              <Text style={styles.journalComment}>{entry.description}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
        <View style={{height: 100}} />
      
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 24,
    color: '#80213C',
    marginBottom: 20,
    textAlign: 'center',
  },
  moodStats: {
    gap: 10,
    marginBottom: 30,
  },
  moodRow: {
    backgroundColor: '#FFF',
    borderRadius: 30,
    padding: 15,
    borderWidth: 1,
    borderColor: '#822E46',
  },
  moodRowContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  moodIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  positiveIcon: {
    tintColor: '#FF64FF',
  },
  dot: {
    fontSize: 20,
    color: '#80213C',
    marginHorizontal: 10,
  },
  percentage: {
    fontSize: 16,
    color: '#80213C',
  },
  journalTitle: {
    fontSize: 24,
    color: '#80213C',
    marginBottom: 20,
    textAlign: 'center',
  },
  journalCard: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#822E46',
    minHeight: 120,
  },
  journalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  journalMoodIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginRight: 10,
  },
  journalDate: {
    fontSize: 14,
    color: '#80213C',
  },
  journalComment: {
    fontSize: 16,
    color: '#666',
  },
});

export default Statistics;
