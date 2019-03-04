<template>
  <div>
    <nav class="nav-extended">
      <div class="nav-wrapper">
        <a href="#" class="brand-logo">Foogle</a>
        <ul id="nav-mobile" class="right hide-on-med-and-down">
          <li><a  v-if="!isAuthenticated" @click="login">Login</a></li>
          <li><a v-if="isAuthenticated" @click="logout">Logout</a></li>
        </ul>
      </div>
      <div class="nav-content">
        <ul class="tabs tabs-transparent">
          <li class="tab"><router-link to="/"><a href="#">Home</a></router-link></li>
          <li class="tab"><router-link to="/favorites"><a class="active" href="#">Favorites</a></router-link></li>
        </ul>
      </div>
    </nav>

    <ul class="sidenav" id="mobile-demo">
      <li><a v-if="!isAuthenticated" href="#" @click="login">Login</a></li>
      <li><a v-if="isAuthenticated" href="#" @click="logout">Logout</a></li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import keys from '../config/keys';

export default {
  name: 'navbar',

  computed: {
    ...mapGetters({
      isAuthenticated: 'userModule/isAuthenticated',
    }),

    buttonLabel() {
      return this.isAuthenticated ? 'Logout' : 'Login';
    }
  },

  methods: {
    login() {
      console.log(keys);
      window.location.href = `https://foursquare.com/oauth2/authenticate?client_id=${keys.default.clientID}&response_type=code&redirect_uri=${keys.default.redirectUri}`;
    },

    logout() {
      window.sessionStorage.removeItem('access_token');
      window.location.reload();
    },
  },
};
</script>

