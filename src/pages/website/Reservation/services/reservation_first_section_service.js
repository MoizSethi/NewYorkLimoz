export async function createRide(payload) {
  try {
    // Fetch the stored username (equivalent to SharedPreferences in web)
    const username = localStorage.getItem('driver_username');

    if (!username) {
      throw new Error('Username not found in localStorage');
    }

    // Construct the API endpoint using the username
    const url = `http://localhost:5000/api/ride/create/${username}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create ride');
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}
