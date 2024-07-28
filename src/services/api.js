const API_KEY = '92bc8018626f4fd191c81389c2f29de2';
const BASE_URL = 'https://newsapi.org/v2/top-headlines';

export const fetchHeadlines = async () => {
    try {
        const response = await fetch(`${BASE_URL}?country=in&pageSize=100&apiKey=${API_KEY}`);
        const data = await response.json();
        return data.articles;
    } catch (error) {
        console.error('Error fetching headlines:', error);
        return [];
    }
};
