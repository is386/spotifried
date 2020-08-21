class Auth {
  constructor() {
    this.authenticated = false;
  }

  // Checks if the JWT token is valid on the backend. If valid, sets loggedIn to true
  async authenticate(token) {
    await fetch("/authToken", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          this.authenticated = true;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  login() {
    this.authenticated = true;
  }

  logout() {
    this.authenticated = false;
  }
}

export default new Auth();
