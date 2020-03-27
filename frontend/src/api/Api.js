class Api {
  config = {
    baseURL: 'http://localhost:9000'
  };

  getHeaders = async () => {
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    return headers;
  };

  async get(uri, parseJSON = true) {
    const response = await fetch(`${this.config.baseURL}${uri}`, {
      method: 'GET',
      headers: await this.getHeaders(),
    });

    if (parseJSON) {
      return response.json();
    } else {
      return response.text();
    }
  }

  async post(uri, params = {}) {
    const response = await fetch(`${this.config.baseURL}${uri}`, {
      method: 'POST',
      headers: await this.getHeaders(),
      body: JSON.stringify(params),
    });

    return response.json();
  }

  async put(uri, params = {}) {
    const response = await fetch(`${this.config.baseURL}${uri}`, {
      method: 'PUT',
      headers: await this.getHeaders(),
      body: JSON.stringify(params),
    });

    return response.json();
  }

  async delete(uri, params = {}) {
    const response = await fetch(`${this.config.baseURL}${uri}`, {
      method: 'DELETE',
      headers: await this.getHeaders(),
      body: JSON.stringify(params),
    });

    return response.json();
  }
}

export default Api;
