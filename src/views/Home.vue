<template>
  <v-app id="inspire">
    <div class="home">
      <v-layout justify-center wrap>
        <v-img width="100%" max-width="500" class="mt-16 pt-16" src="../assets/logo.png"/>
      </v-layout>
      <div>
        <p class="text-md-h4">失敗したことを吐露しよう</p>
        <div class="text-md-h5">
          みんなの失敗談を見たり、自分で投稿したり<br>
          どんまいボタンを押して、励ましあって<br>
          今日は、明日こそ、明後日でも<br>
          いつでもいいから<br>
          少しだけ、がんばりましょう<br>
          そんな掲示板 ” トロル ” です<br>
        </div>
        <div class="py-10">
          <v-btn color="primary" depressed x-large to="/chat"><h1>とろする</h1></v-btn>
        </div>
      </div>
    </div>
  </v-app> 
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      lock: false,
    }
  },
  methods: {
    openModal() {
      this.open = true
    },
    closeModal() {
      this.open = false
    },
  },

}
</script>

<style>
  body {
    overflow:hidden;
}
</style>
