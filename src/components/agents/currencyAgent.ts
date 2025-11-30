const currencyApi: string = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json";

export interface CurrencyData {
    date: string;
    usd: {
        eur: number;
        pln: number;
        cad: number;
        czk: number;
    }
}

export const fetchCurrency = async () => {
    try {
        const response = await fetch(`${currencyApi}`);
        if (!response.ok) {
            throw new Error(`HTTP error. status ${response.status}`);
        }
        const data: CurrencyData = await response.json();
        return data;
    } catch (error) {
        console.error('Error while fetching currencies:', error);
        throw error;
    }
};