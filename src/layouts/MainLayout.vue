<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <img
          alt="StandUp.gif logo"
          src="assets/just-logo.png"
          style="width: 58px; height: 58px"
          class="q-my-sm"
        />
        <q-toolbar-title class="text-bold"> StandUp.gif </q-toolbar-title>
        <EssentialLink title="About the App" link="/about" class="q-mx-sm" />
        <div>Quasar v{{ $q.version }} 💫</div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue';

export default {
  name: 'MainLayout',
  components: {
    EssentialLink
  }
}
</script>
