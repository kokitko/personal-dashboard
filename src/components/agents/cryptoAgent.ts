export interface CryptoData {
    date: string;
    usd: {
        btc: number;
        bnb: number;
        doge: number;
        eth: number;
    };
}

const backendApi: string | undefined = process.env.REACT_APP_BACKEND_API_URL;

export const fetchCrypto = async () => {
    try {
        const response = await fetch(`${backendApi}/crypto`);
        if (!response.ok) {
            throw new Error(`HTTP error. status ${response.status}`);
        }
        const data: CryptoData = await response.json();
        return data
    } catch (error) {
        console.error('Error while fetching crypto:', error);
        throw error;
    }
};