<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="flex justify-between">
        <q-toolbar-title>
          <q-item tag="a" to="/" class="items-center" style="padding-left: 0px">
            <img
              alt="StandUp.gif logo"
              src="assets/just-logo.png"
              style="width: 58px; height: 58px"
              class="q-mr-sm"
            />
            <span class="text-bold">StandUp.gif</span>
          </q-item>
        </q-toolbar-title>
        <div class="flex items-center">
          <EssentialLink title="About the App" link="/about" class="q-mx-sm" />
          <div>Quasar v{{ $q.version }} 💫</div>
        </div>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'

export default {
  name: 'MainLayout',
  components: {
    EssentialLink,
  },
}
</script>
