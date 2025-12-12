
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

const backendApi: string | undefined = process.env.REACT_APP_BACKEND_API_URL;

export const fetchNews = async (keywords: string) => {
    try {
        const response = await fetch(`${backendApi}/api/news?keywords=${keywords}`);
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