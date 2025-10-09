<template>
  <q-page class="flex flex-start items-center column">
    <q-card tag="form" class="q-pa-md q-mt-xl">
      <p>📺 Enter your stand up update, select a tone, and click submit! ✨</p>
      <q-input
        :model-value="inputText"
        type="textarea"
        class="q-ma-sm"
        label="Type away..."
        @update:model-value="inputText = $event"
      />
      <q-card-actions>
        <q-btn
          label="get that gif!"
          color="primary"
          @click.prevent="submit"
        />
      </q-card-actions>
    </q-card>
    <q-card tag="div" class="q-pa-md q-mt-lg">
      <p>gif will go here</p>
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
      this.clearInput();
    },
    clearInput: function () {
      this.inputText = '';
    }
  }
}
</script>
