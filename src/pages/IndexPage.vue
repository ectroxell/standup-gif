<template>
  <q-page class="flex flex-start items-center column q-mb-lg">
    <q-card tag="form" class="q-pa-md q-mt-lg" style="width: 400px;">
      <p class="text-body1 text-center text-weight-medium q-mb-sm">📺 Enter your stand up update & click submit! ✨</p>
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
          <q-spinner v-if="loading" class="q-mr-sm" color="secondary" size="24px" />
          <q-btn
            label="get your gif"
            color="primary"
            :disable="loading || !inputText.trim()"
            @click.prevent="submit"
          />
        </div>
      </q-card-actions>
    </q-card>
    <div v-if="results && results.length > 0" class="q-mt-lg">
      <q-card align="center" style="width: 800px;">
        <q-banner class="bg-primary text-white q-pa-sm flex column" style="height: 120px; width: 100%;">
          <p class="text-h6 q-mb-sm">You are: {{ tone }}</p>
          <p class="text-subtitle1">{{ message }}<br>Click a gif to copy the URL to your clipboard & easily share with your team.</p>
        </q-banner>
        <q-card-section align="center">
          <q-img
            v-for="result in results"
            :key="result.id"
            :src="result.images.fixed_height.url"
            :alt="result.title || 'GIF'"
            class="col-auto q-ma-sm"
            style="width: 200px; height: 200px; cursor: pointer;"
            fit="contain"
            @error="onImageError"
            @click="copyToClipboard(result.images.fixed_height.url)"
          />
      </q-card-section>
    </q-card>
    </div>
    <div v-if="loading" class="q-mt-lg">
      <q-card class="row justify-center" align="center" style="width: 800px;">
        <q-skeleton type="QBanner" style="width: 800px; height: 120px;" />
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
      this.resetResults();
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
    resetResults: function () {
      this.results = null;
      this.tone = '';
      this.message = '';
    },
    resetInput: function () {
      this.inputText = '';
    },
    resetForm: function () {
      this.resetResults();
      this.resetInput();
    },
    onImageError: function (event) {
      console.error('Image failed to load:', event.target.src);
    }
  }
}
</script>
