<template>
  <q-page class="flex flex-start items-center column q-mb-lg q-px-md">
    <q-card tag="form" class="q-pa-md q-mt-lg form-card">
      <div class="text-body1 text-weight-medium text-left">
        <p class="q-mb-sm">Enter your update and click "GIF Me!" 📺</p>
        <p class="q-mb-sm">Click your favorite gif to copy it to your clipboard 📋</p>
        <p class="q-mb-xs">
          Use CMD + V to paste your update and gif into slack to easily share with your team 📨
        </p>
      </div>
      <q-input
        :model-value="inputText"
        type="textarea"
        label="What's your standup update?"
        class="q-mx-xs"
        :disable="loading"
        @update:model-value="inputText = $event"
      />
      <q-card-actions align="between" class="q-mt-lg">
        <q-btn label="Reset" color="secondary" :disable="loading" @click.prevent="resetForm" />
        <div>
          <q-spinner v-if="loading" class="q-mr-sm" color="secondary" size="24px" />
          <q-btn
            label="GIF Me!"
            color="primary"
            :disable="loading || !inputText.trim()"
            @click.prevent="submit"
          />
        </div>
      </q-card-actions>
    </q-card>
    <div v-if="results && results.length > 0" class="q-mt-lg results-container">
      <q-card align="center">
        <q-banner class="bg-primary text-white q-pa-sm flex column banner-container">
          <p class="text-h6 q-mb-sm">You are: {{ tone }}</p>
          <p class="text-subtitle1">{{ message }}</p>
        </q-banner>
        <q-card-section align="center">
          <div>
            <q-img
              v-for="result in results"
              :key="result.id"
              :src="result.images.fixed_height.url"
              :alt="result.title || 'GIF'"
              :copied="result.copied"
              class="col-auto q-ma-sm"
              style="width: 200px; height: 200px; cursor: pointer"
              fit="contain"
              @error="onImageError"
              @click="copyUpdate(result.bitly_url, result.id)"
            />
          </div>
        </q-card-section>
      </q-card>
    </div>
    <div v-if="loading" class="q-mt-lg results-container">
      <q-card class="row justify-center" align="center">
        <q-skeleton type="rect" class="banner-container" />
        <q-skeleton
          v-for="i in 9"
          :key="i"
          class="q-ma-md"
          style="width: 200px; height: 100px"
          fit="contain"
        />
      </q-card>
    </div>
    <div v-if="error" class="q-mt-lg results-container">
      <q-card class="row justify-center" align="center">
        <q-banner class="bg-negative text-white q-pa-sm flex column banner-container">
          <p class="text-h6 q-mb-sm">❤️‍🩹 Uh oh! We're having trouble fetching your gif. ☹️</p>
          <p class="text-subtitle1 q-mb-sm">Please try again later.</p>
        </q-banner>
        <q-skeleton
          v-for="i in 9"
          :key="i"
          class="q-ma-md"
          style="width: 200px; height: 100px"
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
      message: '',
      error: false,
    };
  },
  methods: {
    copyUpdate: function (url, id) {
      const header = `*📺 My StandUp.gif:*`;
      copyToClipboard(header + '\n\n' + this.inputText + '\n\n' + url);
      const result = this.results.find((result) => result.id === id);
      result.copied = true;
    },
    submit: async function () {
      this.resetResults();
      this.loading = true;
      try {
        const { query, tone, message } = await summarizeStandup(this.inputText);
        this.results = await searchGiphy({ query });
        this.tone = tone;
        this.message = message;
      } catch (error) {
        console.error('Error fetching GIFs:', error);
        this.error = true;
      }
      this.loading = false;
    },
    resetResults: function () {
      this.results = null;
      this.tone = '';
      this.message = '';
      this.error = false;
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
    },
  },
};
</script>

<style scoped>
.form-card {
  width: 100%;
  max-width: 566px;
}

.results-container {
  width: 100%;
  max-width: 800px;
}

.banner-container {
  width: 100%;
  height: 96px;
}

@media (max-width: 600px) {
  .form-card {
    max-width: 100%;
  }

  .results-container {
    max-width: 100%;
  }

  .banner-container {
    width: 100%;
    height: 120px;
  }
}
</style>
