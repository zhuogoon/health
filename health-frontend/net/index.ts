const baseURL = "http://localhost:8080";

export async function fetchWithJwt(
  endpoint: string,
  options: RequestInit = {}
) {
  const token = localStorage.getItem("jwt");
  if (!token) {
    throw new Error("No JWT token found in local storage");
  }

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
    Authorization: `Bearer ${token}`,
  };

  const response = await fetch(`${baseURL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const jsonResponse = await response.json();
  return jsonResponse.data;
}

export async function get(endpoint: string) {
  return fetchWithJwt(endpoint, {
    method: "GET",
  });
}

export async function post(endpoint: string, data: any) {
  return fetchWithJwt(endpoint, {
    method: "POST",
    body: JSON.stringify(data),
  });
}
