import React, { useEffect, useState } from 'react';
import './elements.css'

import { NewsData, Article, fetchNews } from '../agents/newsAgent';

const NewsBoard = () => {
    const [newsData, setNewsData] = useState<NewsData | null>(null);
    const [newsKeywords, setNewsKeywords] = useState<string>("Technology");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>();

    const getNewsData = async (keywords: string) => {
        setLoading(true);
        setError("");
        try {
            const data: NewsData = await fetchNews(keywords);
            setNewsData(data);
        } catch (err) {
            setError("Failed to fetch news data");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        getNewsData(newsKeywords);
    }

    useEffect(() => {
        getNewsData("Technology");
    }, []);

    return(<div className="news-board">
        <form className="news-form" onSubmit={handleSearch}>
            <input 
                type="text" 
                placeholder="Search news..." 
                className="news-input" 
                value={newsKeywords} 
                onChange={(e) => setNewsKeywords(e.target.value)} />
            <button type="submit" className="news-search-btn">Search</button>
        </form>
        {loading ? (
            <p>Loading...</p>
        ) : error ? (
            <p className="news-error">{error}</p>) : (
                newsData && (
                    <div className="news-articles">
                    {newsData.articles.map((article: Article, index: number) => (
                        <div key={index} className="news-article">
                            <h4 className="news-article-title">{article.title}</h4>
                            <p className="news-article-description">{article.description}</p>
                            <a href={article.url} target="_blank" rel="noopener noreferrer" className="news-article-link">Read more</a> 
                        </div>
                    ))}
                </div>
            )
        )}
    </div>)
}

export default NewsBoard;