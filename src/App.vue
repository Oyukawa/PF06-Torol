<template>
  <div id="app">
    <v-app-bar dark flat class="header">
      <v-app-bar-nav-icon  @click.stop="drawer = !drawer" />
    </v-app-bar>
      <router-view />    

    <v-navigation-drawer app temporary dark v-model="drawer">
      <v-list-item>
        <v-list-item-title class="title">
          Torol
        </v-list-item-title>
        <v-btn icon>
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>
      <v-divider />
      <v-list nav>
        <v-list-item v-for="menu in menus" :key="menu.title" :to="menu.url">
          <v-list-item-icon>
            <v-icon>{{ menu.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ menu.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    drawer: false,
    menus: [
      { title: 'トップ', icon: 'mdi-home', url: '/' },
      { title: 'とろ場', icon: 'mdi-message-text', url: '/chat' }
    ]
  })
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  overflow: hidden;
}
</style>

<style scoped>
  .header {
    position: fixed;
    z-index:1;
  }
</style>