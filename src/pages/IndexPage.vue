<template>
  <q-page class="flex flex-start items-center column">
    <q-card tag="form" class="q-pa-md q-mt-xl">
      <p>📺 Enter your stand up update, select a tone, and click submit! ✨</p>
      <q-input
        :model-value="inputText"
        type="textarea"
        class="q-ma-sm"
        label="Type away..."
        :disable="loading"
        @update:model-value="inputText = $event"
      />
      <q-card-actions class="row justify-between">
        <q-btn
          label="get that gif!"
          color="primary"
          :disable="loading"
          @click.prevent="submit"
        />
        <div v-if="loading">
          <q-spinner class="q-mr-2"/>
        </div>
        <q-btn
          label="reset"
          color="primary"
          :disable="loading"
          @click.prevent="resetForm"
        />
      </q-card-actions>
    </q-card>
    <div v-if="results && results.length > 0" class="q-pa-md q-mt-lg">
      <q-card class="row justify-center">
        <q-img
          v-for="result in results"
          :key="result.id"
          :src="result.images.fixed_height.url"
          :alt="result.title || 'GIF'"
          class="col-auto q-ma-md"
          style="width: 200px; height: 200px;"
          fit="contain"
          @error="onImageError"
          @click="copyToClipboard(result.images.fixed_height.url)"
        />
      </q-card>
    </div>
    <div v-if="loading" class="q-pa-md q-mt-lg">
      <q-card class="row justify-center">
        <q-skeleton
          v-for="i in 5" :key="i"
          class="q-ma-md"
          style="width: 200px; height: 100px;"
          fit="contain"
        />
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { copyToClipboard } from 'quasar';
import { searchGiphy } from '../helpers/network';
import { summarizeStandup } from '../helpers/index';

export default {
  name: 'IndexPage',
  data: function () {
    return {
      inputText: '',
      loading: false,
      results: null
    }
  },
  methods: {
    copyToClipboard,
    submit: async function () {
      this.loading = true;
      const input = await summarizeStandup(this.inputText);
      console.log(input);
      try {
        this.results = await searchGiphy({ query: input });
        this.clearInput();
      } catch (error) {
        console.error('Error fetching GIFs:', error);
      }
      this.loading = false;
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
