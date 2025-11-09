<template>
  <q-dialog :model-value="modelValue" @update:model-value="$emit('update:modelValue', $event)">
    <div v-if="loading" class="q-my-xl">
      <q-card class="row justify-center" align="center">
        <q-skeleton type="rect" />
        <q-skeleton class="q-ma-md" />
      </q-card>
    </div>
    <div v-else class="q-mt-xl">
      <q-card>
        <q-card-section>
          <div class="text-h6">{{ heading }}</div>
        </q-card-section>
        <q-card-section>
          <div class="text-body1">{{ body }}</div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            flat
            label="Close"
            color="primary"
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
      required: true,
    },
    body: {
      type: String,
      default: null,
    },
  },
};
</script>

