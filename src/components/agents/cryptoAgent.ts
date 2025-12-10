export interface CryptoData {
    bitcoin: {
        usd: number;
    }
    ethereum: {
        usd: number;
    }
    binancecoin: {
        usd: number;
    }
    "the-open-network": {
        usd: number;
    }
    dogecoin: {
        usd: number;
    }
}

const backendApi: string | undefined = process.env.REACT_APP_BACKEND_API_URL;

export const fetchCrypto = async () => {
    try {
        const response = await fetch(`${backendApi}/crypto`);
        if (!response.ok) {
            throw new Error(`HTTP error. status ${response.status}`);
        }
        const data: CryptoData = await response.json();
        console.log(data);
        return data
    } catch (error) {
        console.error('Error while fetching crypto:', error);
        throw error;
    }
};