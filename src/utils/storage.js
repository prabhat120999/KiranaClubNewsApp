import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'news_headlines';

export const storeHeadlines = async (headlines) => {
    try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(headlines));
    } catch (error) {
        console.error('Error storing headlines:', error);
    }
};

export const getStoredHeadlines = async () => {
    try {
        const headlines = await AsyncStorage.getItem(STORAGE_KEY);
        return headlines ? JSON.parse(headlines) : [];
    } catch (error) {
        console.error('Error retrieving headlines:', error);
        return [];
    }
};
