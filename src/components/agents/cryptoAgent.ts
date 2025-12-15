import axiosInstance from './axiosInstance';

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
        const response = await axiosInstance.get<CryptoData>('/api/crypto');
        if (response.status !== 200 ) {
            throw new Error(`HTTP error. status ${response.status}`);
        }
        const data: CryptoData = response.data;
        return data
    } catch (error) {
        console.error('Error while fetching crypto:', error);
        throw error;
    }
};