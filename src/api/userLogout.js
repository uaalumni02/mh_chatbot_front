export const logoutUser = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/logout", {
      method: "POST",
      credentials: "include",
    });
    return await response.json();
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
};
