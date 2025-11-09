<template>
  <q-dialog
    :model-value="modelValue"
    no-backdrop-dismiss
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <div v-if="loading">
      <q-card style="min-width: 500px">
        <q-skeleton
          type="rect"
          height="80px"
        />
        <q-card-section>
          <q-skeleton
            type="text"
            class="text-subtitle1"
          />
          <q-skeleton
            type="text"
            class="text-subtitle1"
          />
          <q-skeleton
            type="text"
            width="60%"
            class="text-subtitle1"
          />
        </q-card-section>
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

