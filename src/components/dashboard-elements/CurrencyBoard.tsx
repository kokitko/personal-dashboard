import React, { useState } from 'react';
import './elements.css'

import { CurrencyData, fetchCurrency } from '../agents/currencyAgent';

const CurrencyBoard = () => {
    const [currencyData, setCurrencyData] = useState<CurrencyData | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>();

    React.useEffect(() => {
        const getCurrencyData = async () => {
            setLoading(true);
            setError("");
            try {
                const data: CurrencyData = await fetchCurrency();
                setCurrencyData(data);
            } catch (err) {
                setError("Failed to fetch currency data");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        getCurrencyData();
    }, []);

    return(<div className="currency-board"> {loading ? (
        <p>Loading...</p>
    ) : error ? (
        <p className="currency-error">{error}</p>) : (
        currencyData && (
            <div className="currency-data">
                <h3 className="currency-data-header">Currency Rates for 100 USD ({currencyData.date})</h3>
                <ul className="currency-data-list">
                    <li className="currency-item">EUR: {(currencyData.usd.eur * 100).toFixed(2)}</li>
                    <li className="currency-item">PLN: {(currencyData.usd.pln * 100).toFixed(2)}</li>
                    <li className="currency-item">CAD: {(currencyData.usd.cad * 100).toFixed(2)}</li>
                    <li className="currency-item">CZK: {(currencyData.usd.czk * 100).toFixed(2)}</li>
                    <li className="currency-item">UAH: {(currencyData.usd.uah * 100).toFixed(2)}</li>
                    <li className="currency-item">RUB: {(currencyData.usd.rub * 100).toFixed(2)}</li>
                </ul>
            </div>
        )
    )}
    </div>);
}

export default CurrencyBoard;