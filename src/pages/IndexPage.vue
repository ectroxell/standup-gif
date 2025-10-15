<template>
  <q-page class="flex flex-start items-center column q-mb-lg q-px-md">
    <q-card tag="form" class="q-pa-md q-mt-xl form-card">
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
          <q-spinner v-if="loading" class="q-mr-md" color="secondary" size="24px" />
          <q-btn
            label="GIF Me!"
            color="primary"
            :disable="loading || !inputText.trim()"
            @click.prevent="submit"
          />
        </div>
      </q-card-actions>
    </q-card>
    <div v-if="results && results.length > 0" class="q-mt-xl results-container">
      <q-card align="center">
        <q-banner class="bg-primary text-white flex column banner-container">
          <p class="text-h6 q-my-sm">Your update sounds {{ tone }}</p>
          <p class="text-subtitle1 q-mb-sm">{{ message }}</p>
        </q-banner>
        <q-slide-transition :duration="600">
          <div v-show="copied">
            <q-banner class="bg-positive text-white q-pa-sm">
              <div class="flex items-center justify-center q-my-sm">
                <q-icon name="check_circle" size="sm" class="q-mr-sm" />
                <span class="text-body1"
                  >Copied to clipboard! Your update and GIF are ready to paste ✨</span
                >
              </div>
            </q-banner>
          </div>
        </q-slide-transition>
        <q-card-section align="center">
          <q-img
            v-for="result in results"
            :key="result.id"
            :src="result.images.fixed_height.url"
            :alt="result.title || 'GIF'"
            class="col-auto q-ma-sm"
            style="width: 200px; height: 200px; cursor: pointer"
            fit="contain"
            @error="onImageError"
            @click="copyUpdate(result.bitly_url)"
          />
        </q-card-section>
      </q-card>
    </div>
    <div v-if="loading" class="q-my-xl results-container skeleton">
      <q-card class="row justify-center" align="center">
        <q-skeleton type="rect" class="banner-container skeleton" />
        <q-skeleton
          v-for="i in 9"
          :key="i"
          class="q-ma-md"
          style="width: 200px; height: 100px"
          fit="contain"
        />
      </q-card>
    </div>
    <div v-if="error" class="q-my-xl results-container">
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
      copied: false,
    };
  },
  methods: {
    copyUpdate: function (url) {
      const header = `*📺 My StandUp.gif:*`;
      copyToClipboard(header + '\n\n' + this.inputText + '\n\n' + url);
      this.copied = true;
      setTimeout(() => {
        this.copied = false;
      }, 5000);
    },
    submit: async function () {
      this.resetResults();
      this.loading = true;
      try {
        const { query1, query2, query3, tone, message } = await summarizeStandup(this.inputText);
        const resultSet1 = await searchGiphy({ query: query1 });
        const resultSet2 = await searchGiphy({ query: query2 });
        const resultSet3 = await searchGiphy({ query: query3 });
        this.results = [...resultSet1, ...resultSet2, ...resultSet3];
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
      this.copied = false;
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
  max-width: 700px;
}

.results-container {
  width: 100%;
  max-width: 700px;
}

.banner-container {
  width: 100%;
  max-height: 120px;
  &.skeleton {
    height: 96px;
  }
}

@media (max-width: 600px) {
  .form-card {
    max-width: 100%;
  }

  .results-container {
    max-width: 100%;
  }

  .banner-container {
    max-width: 100%;
  }
}
</style>
