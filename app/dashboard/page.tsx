const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

const DashboardPage = async () => {
  try {
    const response = await fetch(`${baseUrl}/api/auth/session`, {
      method: "GET",
      credentials: "same-origin",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch session");
    }

    console.log("Session data", response);

    // const data = await response.json();
    // console.log("Session data", data);
  } catch (error) {
    console.error(error);
  }

  return (
    <div>
      {/* <h1>Welcome, {user.firstName}!</h1>
      <p>Your role: {user.role}</p> */}
    </div>
  );
};

export default DashboardPage;
