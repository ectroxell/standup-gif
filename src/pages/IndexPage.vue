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
    <q-card v-if="results && results.length > 0" class="q-pa-md q-mt-lg">
      <div class="row q-gutter-md justify-center">
        <q-img
          v-for="result in results"
          :key="result.id"
          :src="result.images.fixed_height.url"
          :alt="result.title || 'GIF'"
          class="col-auto"
          style="width: 200px; height: 200px;"
          fit="contain"
          @error="onImageError"
        />
      </div>
    </q-card>
  </q-page>
</template>

<script>
import { searchGiphy } from '../helpers/network';

export default {
  name: 'IndexPage',
  data: function () {
    return {
      inputText: '',
      results: null
    }
  },
  methods: {
    submit: async function () {
      console.log('submitting!', this.inputText);
      try {
        this.results = await searchGiphy({ query: this.inputText });
        console.log('Search results:', this.results);
        this.clearInput();
      } catch (error) {
        console.error('Error fetching GIFs:', error);
      }
    },
    clearInput: function () {
      this.inputText = '';
    },
    resetForm: function () {
      this.clearInput();
      this.results = null;
    },
    onImageError: function (event) {
      console.error('Image failed to load:', event.target.src);
    }
  }
}
</script>
