<template>
  <q-page class="flex flex-start items-center column">
    <q-card tag="form" class="q-pa-md q-mt-xl" style="width: 400px;">
      <strong>📺 Enter your stand up update and click submit! ✨</strong>
      <q-input
        :model-value="inputText"
        type="textarea"
        class="q-ma-sm"
        label="Type away..."
        :disable="loading"
        @update:model-value="inputText = $event"
      />
      <q-card-actions align="between" >
        <q-btn
        label="reset"
        color="secondary"
        :disable="loading"
        @click.prevent="resetForm"
        />
        <div>
          <q-spinner v-if="loading" class="q-mr-2"/>
          <q-btn
            label="get your gif"
            color="primary"
            :disable="loading"
            @click.prevent="submit"
          />
        </div>
      </q-card-actions>
    </q-card>
    <div v-if="results && results.length > 0" class="q-mt-lg">
      <q-card align="center" style="width: 800px;">
        <q-banner class="bg-primary text-white q-pa-sm flex column" style="height: 120px; width: 100%;">
          <p class="text-h6 q-mb-sm">You are: {{ tone }}</p>
          <p class="text-subtitle1">{{ message }}<br>Click a gif to copy it to your clipboard and easily share with your team.</p>
        </q-banner>
        <q-card-section align="center">
          <q-img
            v-for="result in results"
            :key="result.id"
            :src="result.images.fixed_height.url"
            :alt="result.title || 'GIF'"
            class="col-auto q-ma-sm"
            style="width: 200px; height: 200px;"
            fit="contain"
            @error="onImageError"
            @click="copyToClipboard(result.images.fixed_height.url)"
          />
      </q-card-section>
    </q-card>
    </div>
    <div v-if="loading" class="q-mt-lg">
      <q-card class="row justify-center">
        <q-skeleton
          v-for="i in 9" :key="i"
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
import { searchGiphy, summarizeStandup } from '../network/index';

export default {
  name: 'IndexPage',
  data: function () {
    return {
      inputText: '',
      loading: false,
      results: null,
      tone: '',
      message: ''
    }
  },
  methods: {
    copyToClipboard,
    submit: async function () {
      this.loading = true;
      const { query, tone, message } = await summarizeStandup(this.inputText);
      try {
        this.results = await searchGiphy({ query });
        this.tone = tone;
        this.message = message;
      } catch (error) {
        console.error('Error fetching GIFs:', error);
      }
      this.loading = false;
    },
    resetForm: function () {
      this.inputText = '';
      this.results = null;
      this.tone = '';
      this.message = '';
    },
    onImageError: function (event) {
      console.error('Image failed to load:', event.target.src);
    }
  }
}
</script>
