import { createContext,useState,useContext,useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
const StoreContext = createContext({isMusicEnable: () => {},
setIsMusicEnable: () => {},});

export default StoreContext;

export const StoreProvider = ({ children }) => {
    const [moodHistory, setMoodHistory] = useState([]);
    const [favoriteTasks, setFavoriteTasks] = useState([]);
    const [favoriteQuotes, setFavoriteQuotes] = useState([]);
    const [isMusicEnabled, setIsMusicEnabled] = useState(false);
    console.log(favoriteQuotes)
    console.log(favoriteTasks)

    // Load all saved data when app starts
    useEffect(() => {
        loadMoodHistory();
        loadFavorites();
    }, []);

    // Load mood history from AsyncStorage
    const loadMoodHistory = async () => {
        try {
            const savedMoods = await AsyncStorage.getItem('moodHistory');
            if (savedMoods) {
                setMoodHistory(JSON.parse(savedMoods));
            }
        } catch (error) {
            console.error('Error loading mood history:', error);
        }
    };

    // Load favorites from AsyncStorage
    const loadFavorites = async () => {
        try {
            const savedTasks = await AsyncStorage.getItem('favoriteTasks');
            const savedQuotes = await AsyncStorage.getItem('favoriteQuotes');
            
            if (savedTasks) setFavoriteTasks(JSON.parse(savedTasks));
            if (savedQuotes) setFavoriteQuotes(JSON.parse(savedQuotes));
        } catch (error) {
            console.error('Error loading favorites:', error);
        }
    };

    // Save new mood data
    const saveMoodData = async (moodData) => {
        try {
            const newMoodHistory = [...moodHistory, moodData];
            await AsyncStorage.setItem('moodHistory', JSON.stringify(newMoodHistory));
            setMoodHistory(newMoodHistory);
            return true; // Return success
        } catch (error) {
            console.error('Error saving mood data:', error);
            return false; // Return failure
        }
    };

    // Get all saved moods
    const getMoodHistory = () => {
        return moodHistory;
    };

    // Save favorite task
    const saveFavoriteTask = async (task) => {
        try {
            // Check if task already exists
            const taskExists = favoriteTasks.some(t => t.id === task.id);
            if (taskExists) {
                // Remove task if it exists
                const updatedTasks = favoriteTasks.filter(t => t.id !== task.id);
                await AsyncStorage.setItem('favoriteTasks', JSON.stringify(updatedTasks));
                setFavoriteTasks(updatedTasks);
                return { success: true, action: 'removed' };
            } else {
                // Add new task
                const updatedTasks = [...favoriteTasks, task];
                await AsyncStorage.setItem('favoriteTasks', JSON.stringify(updatedTasks));
                setFavoriteTasks(updatedTasks);
                return { success: true, action: 'added' };
            }
        } catch (error) {
            console.error('Error saving favorite task:', error);
            return { success: false, error };
        }
    };

    // Save favorite quote
    const saveFavoriteQuote = async (quote) => {
        try {
            // Check if quote already exists
            const quoteExists = favoriteQuotes.some(q => q.id === quote.id);
            if (quoteExists) {
                // Remove quote if it exists
                const updatedQuotes = favoriteQuotes.filter(q => q.id !== quote.id);
                await AsyncStorage.setItem('favoriteQuotes', JSON.stringify(updatedQuotes));
                setFavoriteQuotes(updatedQuotes);
                return { success: true, action: 'removed' };
            } else {
                // Add new quote
                const updatedQuotes = [...favoriteQuotes, quote];
                await AsyncStorage.setItem('favoriteQuotes', JSON.stringify(updatedQuotes));
                setFavoriteQuotes(updatedQuotes);
                return { success: true, action: 'added' };
            }
        } catch (error) {
            console.error('Error saving favorite quote:', error);
            return { success: false, error };
        }
    };

    // Check if item is favorited
    const isFavorite = (id, type) => {
        if (type === 'task') {
            return favoriteTasks.some(task => task.id === id);
        }
        return favoriteQuotes.some(quote => quote.id === id);
    };

    const value = {
        moodHistory,
        saveMoodData,
        getMoodHistory,
        favoriteTasks,
        favoriteQuotes,
        saveFavoriteTask,
        saveFavoriteQuote,
        isFavorite,
        isMusicEnabled,
        setIsMusicEnabled,
    };
    
    return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
};

export const useAppContext = () => {
    const context = useContext(StoreContext);
    if (!context) {
        throw new Error("useAppContext must be used within a StoreProvider");
    }
    return context;
};

