const API_BASE_URL = import.meta.env.VITE_API_URL || null;

class HttpClient {
  constructor(private baseUrl: string) {}

  async get<T>(path: string, options?: RequestInit): Promise<T> {
    const url = `${this.baseUrl}${path}`;
    const response = await fetch(url, {
      method: "GET",
      ...options,
    });
    if (!response.ok) throw new Error(`HTTP error. Status: ${response.status}`);

    return await response.json();
  }

  async post<T>(path: string, options?: RequestInit): Promise<T> {
    const url = `${this.baseUrl}${path}`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
    });
    if (!response.ok) throw new Error(`HTTP error. Status: ${response.status}`);

    return await response.json();
  }
}

const httpClient = new HttpClient(API_BASE_URL);

export { httpClient };
