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
        const response = await fetch(`${backendApi}/currency`);
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