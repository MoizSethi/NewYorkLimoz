export async function fetchVehicles() {
  try {
    // Get username from localStorage (acts like SharedPreferences for web)
    const username = localStorage.getItem('driver_username');

    if (!username) {
      throw new Error('Username not found in localStorage');
    }

    // Construct API URL with username
    const url = `http://localhost:5000/api/vehicle/all/${username}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch vehicles');
    }

    const data = await response.json();

    // Adjust return structure if API format differs
    return data?.vehicles || [];
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    return [];
  }
}
