<template>
  <div>
    <nav class="nav-extended">
      <div class="nav-wrapper">
        <a href="#" class="brand-logo">Foogle</a>
        <ul id="nav-mobile" class="right hide-on-med-and-down">
          <li><a @click="redirectUser">Login</a></li>
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
      <li><a href="#">Login</a></li>
    </ul>
  </div>
</template>

<script>
import keys from '../config/keys';

export default {
  name: 'navbar',

  methods: {
    redirectUser() {
      window.location.href = `https://foursquare.com/oauth2/authenticate?client_id=${keys.clientID}&response_type=code&redirect_uri=http://localhost:8080/auth/callback`;
    },
  },
};
</script>

