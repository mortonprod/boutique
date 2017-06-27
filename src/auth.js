import auth0 from 'auth0-js';
import createHistory from 'history/createBrowserHistory';

let history = createHistory({
  forceRefresh: true
});

export default class Auth {
  constructor() {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.getProfile = this.getProfile.bind(this);
  }
  userProfile=null;
  auth0 = new auth0.WebAuth({
    domain: 'mortonprod.eu.auth0.com',
    clientID: 'i92K1aH4gGRkkJagDPAAIjH0xmCX4A8S',
    redirectUri: 'http://localhost:3000',
    audience: 'https://mortonprod.eu.auth0.com/userinfo',
    responseType: 'token id_token',
    scope: 'openid profile'
  });

  login() {
    this.auth0.authorize();
  }

  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        history.replace('/');
      } else if (err) {
        history.replace('/');
        console.log(err);
      }
    });
  }

  setSession(authResult) {
    let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    if(typeof localStorage !=="undefined"){
	    localStorage.setItem('access_token', authResult.accessToken);
	    localStorage.setItem('id_token', authResult.idToken);
	    localStorage.setItem('expires_at', expiresAt);
    }
    // navigate to the home route
    history.replace('/home');
  }

  logout() {
    // Clear access token and ID token from local storage
    if(typeof localStorage !=="undefined"){
	    localStorage.removeItem('access_token');
	    localStorage.removeItem('id_token');
	    localStorage.removeItem('expires_at');
    }
    // navigate to the home route
    history.replace('/home');
  }

  getProfile(cb) {
    if(typeof localStorage !=="undefined"){
	    if(localStorage.getItem('access_token') !==null){
	        this.auth0.client.userInfo(localStorage.getItem('access_token'), (err, profile) => {
	            if (profile) {
	              this.userProfile = profile;
	            }
	            cb(err, profile);
	        });
	    }
    }
  }  
  isAuthenticated() {
    // Check whether the current time is past the 
    // access token's expiry time
    if(typeof localStorage !== "undefined"){
	    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
	    return new Date().getTime() < expiresAt;
    }
  }

}