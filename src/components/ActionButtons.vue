<template>
  <div class="q-mb-md">
    <q-btn
      label="Roast me 👹"
      color="primary"
      class="q-mr-md"
      glossy
      :disable="loading"
      @click.prevent="getMessageForAction('roast')"
    />
    <q-btn
      label="Compliment me 💖"
      color="primary"
      glossy
      :disable="loading"
      @click.prevent="getMessageForAction('compliment')"
    />
    <q-btn
      label="Motivate me 🚀"
      color="primary"
      class="q-ml-md"
      glossy
      :disable="loading"
      @click.prevent="getMessageForAction('motivate')"
    />
    <EssentialModal
      v-model="showModal"
      :loading="loading"
      :heading="title"
      :body="message"
      @hide="resetData"
    />
  </div>
</template>

<script>
import { generateMessageForAction } from '../network/index';

import EssentialModal from './EssentialModal.vue';

export default {
  name: 'ActionButtons',
  components: {
    EssentialModal,
  },
  props: {
    tone: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
      required: true,
    },
  },
  data: function () {
    return {
      loading: false,
      action: null,
      message: null,
      title: null,
      showModal: false,
    };
  },
  methods: {
    getMessageForAction: async function (action) {
      this.action = action;
      this.showModal = true;
      this.loading = true;
      try {
        const options = {
          tone: this.tone,
          summary: this.summary,
          action: this.action,
        }
        const { message, title } = await generateMessageForAction(options);
        this.message = message;
        this.title = title;
      } catch (error) {
        console.error('Error fetching message:', error);
      }
      this.loading = false;
    },
    resetData: function () {
      this.action = null;
      this.message = null;
      this.title = null;
      this.showModal = false;
    },
  }
};
</script>
