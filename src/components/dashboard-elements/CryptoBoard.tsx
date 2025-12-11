import React, { useEffect, useState } from 'react';
import './elements.css'

import { fetchCrypto, CryptoData } from '../agents/cryptoAgent';

const CryptoBoard = () => {
    const [cryptoData, setCryptoData] = useState<CryptoData | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getCryptoData = async () => {
            setLoading(true);
            setError(null);
            try {
                const data: CryptoData = await fetchCrypto();
                setCryptoData(data);
            } catch (err) {
                setError("Failed to fetch crypto data");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        
        getCryptoData();
    }, []);

    return(<div className="crypto-board">{loading ? (
        <div className="crypto-loading">Loading...</div>
    ) : error ? (
        <div className="crypto-error">{error}</div>
    ) : (cryptoData && (
        <>
            <h3>Crypto cost for {cryptoData.date}</h3>
            <div className="crypto-board-content">
                <div className="crypto-item">
                    <span>Bitcoin (BTC): </span>
                    <span>${(1 / cryptoData.usd.btc).toFixed(2)}</span>
                </div>
                <div className="crypto-item">
                    <span>Ethereum (ETH): </span>
                    <span>${(1 / cryptoData.usd.eth).toFixed(2)}</span>
                </div>
                <div className="crypto-item">
                    <span>Binance Coin (BNB): </span>
                    <span>${(1 / cryptoData.usd.bnb).toFixed(2)}</span>
                </div>
                <div className="crypto-item">
                    <span>Dogecoin (DOGE): </span>
                    <span>${(1 / cryptoData.usd.doge).toFixed(4)}</span>
                </div>
            </div>
        </>
        ))}
    </div>);
}

export default CryptoBoard;
