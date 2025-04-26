export async function signup(data: { name: string; email: string; password: string }) {
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json(); // { access_token }
  }

  export async function login(data: { email: string; password: string }) {
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json(); // { access_token }
  }