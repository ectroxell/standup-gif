<template>
  <q-page class="flex flex-center">
    <q-card tag="form">
      <p>📺 Enter your stand up update, select a tone, and click submit! ✨</p>

      <q-input
        :model-value="inputText"
        label="Type away..."
        @update:model-value="inputText = $event"
      />

      <q-btn label="get that gif!" color="primary" @click="submit" />
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: 'IndexPage',
  data: function () {
    return {
      inputText: ''
    }
  },
  methods: {
    submit: function () {
      console.log('submitting!', this.inputText);
    }
  }
}
</script>
