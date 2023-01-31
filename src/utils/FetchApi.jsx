class FetchContainer {
  constructor() {}

  async getData(url, token = "") {
    try {
      const res = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      return await res.json();
    } catch (e) {
      console.log(e);
    }
  }
  async postData(url, body, token) {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      return await res.json();
    } catch (e) {
      console.log(e);
    }
  }
  async updateData(url, body, token) {
    try {
      const res = await fetch(url, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      return await res.json();
    } catch (e) {
      console.log(e);
    }
  }
  async deleteData(url, token) {
    try {
      const res = await fetch(url, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      return await res.json();
    } catch (err) {
      console.log(err);
    }
  }

  async Login(url, mail, password) {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mail, password }),
      });
      return res.json();
    } catch (e) {
      console.log(e);
    }
  }

  async refreshLogin(url, data) {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      return res.json();
    } catch (e) {
      console.log(e);
    }
  }
  async UploadFiles(url, data, token) {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      });

      return await res.json();
    } catch (e) {
      console.log(e);
    }
  }
}

export const FetchApi = new FetchContainer();
