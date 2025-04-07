export const loginUser = async (userName, password) => {
  const res = await fetch("http://localhost:3000/api/user/login", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userName, password }),
  });

  const data = await res.json();

  if (!res.ok || data.message !== "Login successful") {
    throw new Error(data.error || "Invalid credentials");
  }

  return data.user;
};
