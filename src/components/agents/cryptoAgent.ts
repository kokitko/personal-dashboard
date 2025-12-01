const cryptoApi: string = "https://api.coingecko.com/api/v3/simple/price"

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

export const fetchCrypto = async () => {
    const apiKey = process.env.REACT_APP_CRYPTO_API_KEY;
    try {
        const response = await fetch(`${cryptoApi}?x_cg_demo_api_key=${apiKey}&vs_currencies=usd&ids=bitcoin,ethereum,binancecoin,the-open-network,dogecoin`);
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