const API_BASE_URL = 'http://localhost:5000/api';

export async function fetchBooks() {
  const response = await fetch(`${API_BASE_URL}/books`);
  const result = await response.json();
  return result.data || [];
}

export async function createBook(bookData) {
  const response = await fetch(`${API_BASE_URL}/books`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(bookData)
  });

  return response.json();
}

export async function loginUser(userData) {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  });

  return response.json();
}

export async function createOrder(orderData) {
  const response = await fetch(`${API_BASE_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(orderData)
  });

  return response.json();
}
