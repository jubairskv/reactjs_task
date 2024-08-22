const API_URL = 'https://your-api-endpoint.com/login'; // Replace with your API endpoint

export const loginUser = async (userID, password) => {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userID: userID,
                password: password
            }),
        });

        const data = await response.json();

        if (data.code === 1) {
            console.log('Login successful');
            return data;
        } else {
            console.error('Login failed:', data.display_err);
            return null;
        }
    } catch (error) {
        console.error('An error occurred during login:', error);
        return null;
    }
};
