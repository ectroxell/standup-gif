<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <img
          alt="StandUp.gif logo"
          src="../../public/assets/just-logo.png"
          style="width: 64px; height: 64px"
        />
        <q-toolbar-title> StandUp.gif </q-toolbar-title>
        <div>Quasar v{{ $q.version }} 💫</div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MainLayout'
}
</script>
