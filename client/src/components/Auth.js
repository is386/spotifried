class Auth {
  constructor() {
    this.loggedIn = false;
  }

  login(callback) {
    this.loggedIn = true;
    callback();
  }

  logout(callback) {
    this.username = "";
    this.loggedIn = false;
    callback();
  }

  isLoggedIn() {
    return this.loggedIn;
  }
}

export default new Auth();
