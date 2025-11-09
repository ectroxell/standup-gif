<template>
  <q-dialog
    :model-value="modelValue"
    no-backdrop-dismiss
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <div v-if="loading">
      <q-card
        class="row justify-center"
        align="center"
      >
        <q-skeleton type="rect" />
        <q-skeleton class="q-ma-md" />
      </q-card>
    </div>
    <div v-else>
      <q-card>
        <q-banner class="bg-primary text-white">
          <div class="text-h6">{{ heading }}</div>
        </q-banner>
        <q-card-section>
          <div class="text-body1">{{ body }}</div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            flat
            glossy
            label="Close"
            text-color="white"
            class="bg-primary"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </div>
  </q-dialog>
</template>

<script>
export default {
  name: 'EssentialModal',
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
    loading: {
      type: Boolean,
      required: true,
    },
    heading: {
      type: String,
      default: 'Here ya go!',
    },
    body: {
      type: String,
      default: null,
    },
  },
};
</script>

