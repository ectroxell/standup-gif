<template>
  <div>
    <q-btn
      label="Roast me 👹"
      color="primary"
      :disable="loading"
      @click.prevent="getMessageForAction('roast')"
    />
    <q-btn
      label="Compliment me 💖"
      color="primary"
      :disable="loading"
      @click.prevent="getMessageForAction('compliment')"
    />
    <q-btn
      label="Motivate me 🚀"
      color="primary"
      :disable="loading"
      @click.prevent="getMessageForAction('motivate')"
    />
    <q-dialog v-model="showModal">
      <div v-if="loading" class="q-my-xl">
        <q-card class="row justify-center" align="center">
          <q-skeleton type="rect" />
          <q-skeleton
            v-for="i in 9"
            :key="i"
            class="q-ma-md"
          />
        </q-card>
      </div>
      <div v-else class="q-mt-xl">
        <q-card>
          <q-card-section>
            <div class="text-h6">Here's your {{ action }}</div>
          </q-card-section>
          <q-card-section>
            <div class="text-body1">{{ message }}</div>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn
              flat
              label="Close"
              color="primary"
              @click.prevent="closeModal"
            />
          </q-card-actions>
        </q-card>
      </div>
    </q-dialog>
  </div>
</template>

<script>
import { generateMessageForAction } from '../network/index';

export default {
  name: 'ActionButtons',
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
    };
  },
  methods: {
    getMessageForAction: async function (action) {
      this.action = action;
      this.loading = true;
      try {
        const { message } = await generateMessageForAction(this.tone, this.summary, this.action);
        this.message = message;
      } catch (error) {
        console.error('Error fetching message:', error);
      }
      this.loading = false;
    },
    closeModal: function () {
      this.action = null;
      this.message = null;
    },
  },
  computed: {
    showModal: function () {
      return !!this.action;
    }
  }
};
</script>
