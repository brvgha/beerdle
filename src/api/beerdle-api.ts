const API_BASE_URL = import.meta.env.VITE_API_KEY || 'https://beerdle-api-final-713774466210.europe-west1.run.app';
const API_KEY = import.meta.env.VITE_API_KEY;

const getHeaders = () => {
    const sessionToken = localStorage.getItem('beerdle_session');
    return {
        'Content-Type': 'application/json',
        'X-API-Key': API_KEY || '',
        'X-Session-Token': sessionToken || '',
    };
};


export const healthCheck = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/health`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching health check:', error);
        throw error;
    }
}

export const getSession = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/session`, {
            headers: getHeaders(),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching session:', error);
        throw error;
    }
}

export const getAll = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/find_all`, {
            headers: getHeaders(),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching all:', error);
        throw error;
    }
}

export const getBeerdle = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/beerdle`, {
            headers: getHeaders(),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json()
        console.log('Beerdle fetched successfully')
        return data;
    } catch (error) {
        console.error('Error fetching beerdle:', error);
        throw error;
    }
}

export const sendRecommendation = async (beer: any) => {
    try {
        const response = await fetch(`${API_BASE_URL}/recommendation`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(beer),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error sending recommendation:', error);
        throw error;
    }
}

export default API_BASE_URL;