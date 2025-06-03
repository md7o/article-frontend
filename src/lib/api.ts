export async function signup(data: {
  name: string;
  email: string;
  password: string;
}) {
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function login(data: { email: string; password: string }) {
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function getById(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch user with ID ${id}: ${res.statusText}`);
  }

  return res.json();
}
