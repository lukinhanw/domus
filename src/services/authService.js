const MOCK_USER = {
  id: 1,
  name: 'John Doe',
  email: 'john@example.com',
  role: 'admin'
}

const MOCK_TOKEN = 'mock-jwt-token'

export async function loginUser({ email, password }) {
  // Simulating API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === 'admin@example.com' && password === 'password') {
        resolve({
          user: MOCK_USER,
          token: MOCK_TOKEN
        })
      } else {
        reject(new Error('Invalid credentials'))
      }
    }, 1000)
  })
}