const BASE_URL = 'http://localhost:5000/api';

function getUsername() {
  const username = localStorage.getItem('driver_username');
  if (!username) throw new Error('Username not found in localStorage');
  return username;
}

export async function loginUser(payload) {
  try {
    const username = getUsername();
    const response = await fetch(`${BASE_URL}/user/login/${username}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Login failed');
    }

    return await response.json();
  } catch (error) {
    console.error('Login API Error:', error);
    throw error;
  }
}

export async function registerUser(payload) {
  try {
    const username = getUsername();
    const response = await fetch(`${BASE_URL}/user/register/${username}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'User registration failed');
    }

    return await response.json();
  } catch (error) {
    console.error('User Registration API Error:', error);
    throw error;
  }
}

export async function registerGuest(payload) {
  try {
    const username = getUsername();
    const response = await fetch(`${BASE_URL}/guest/register/${username}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Guest registration failed');
    }

    return await response.json();
  } catch (error) {
    console.error('Guest Registration API Error:', error);
    throw error;
  }
}
