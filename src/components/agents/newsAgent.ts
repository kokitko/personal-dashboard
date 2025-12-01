const newsApi: string = "https://newsapi.org/v2/everything"

export interface Article {
    source: {
        id: string;
        name: string;
    }
    author: string;
    title: string;
    description: string;
    url: string;
}

export interface NewsData {
    status: string;
    totalResults: number;
    articles: Array<Article>;
}

export const fetchNews = async (keywords: string) => {
    const apiKey = process.env.REACT_APP_NEWS_API_KEY;
    try {
        const response = await fetch(`${newsApi}?q=${keywords}&apiKey=${apiKey}`);
        if (!response.ok) {
            throw new Error(`HTTP error. status ${response.status}`);
        }
        const data: NewsData = await response.json();
        return data;
    } catch (error) {
        console.error('Error while fetching news:', error);
        throw error;
    }

}