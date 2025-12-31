const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

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

export const getAll = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/find_all`);
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
    console.log('test');
    try {
        const response = await fetch(`${API_BASE_URL}/beerdle`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching all:', error);
        throw error;
    }
}

export default API_BASE_URL;