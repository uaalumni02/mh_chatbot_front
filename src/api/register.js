export const registerUser = async ({ userName, email, password }) => {
  const res = await fetch("http://localhost:3000/api/user", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userName, email, password }),
  });

  const data = await res.json();

  if (!res.ok || data.message !== "User created successfully") {
    throw new Error(data.error || "Invalid credentials. Please try again.");
  }

  return data;
};
