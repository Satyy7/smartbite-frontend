import { User } from "@/types/user";

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}`;
export async function getCurrentUser() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
      credentials: "include",
    });

    // 401 means user not logged in — this is normal
    if (res.status === 401) {
      return null;
    }

    if (!res.ok) {
      console.error("Unexpected auth error:", res.status);
      return null;
    }

    return await res.json();
  } catch (err) {
    console.error("Auth fetch failed:", err);
    return null;
  }
}

export async function login(email: string, password: string) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.detail || "Login failed");
  }

  return res.json();
}

export async function register(
  username: string,
  email: string,
  password: string
) {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.detail || "Registration failed");
  }

  return res.json();
}

export async function logout() {
  await fetch(`${BASE_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
}