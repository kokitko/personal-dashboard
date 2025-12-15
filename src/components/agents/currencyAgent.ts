import axiosInstance from './axiosInstance'

export interface CurrencyData {
    date: string;
    usd: {
        eur: number;
        pln: number;
        cad: number;
        czk: number;
        uah: number;
        rub: number;
    }
}

const backendApi: string | undefined = process.env.REACT_APP_BACKEND_API_URL;

export const fetchCurrency = async () => {
    try {
        const response = await axiosInstance.get<CurrencyData>('/api/currency');
        if (response.status !== 200) {
            throw new Error(`HTTP error. status ${response.status}`);
        }
        const data: CurrencyData = response.data;
        return data;
    } catch (error) {
        console.error('Error while fetching currencies:', error);
        throw error;
    }
};