<template>
  <q-item clickable :to="link">
    <q-item-section v-if="icon" avatar>
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label v-if="caption" caption>{{ caption }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  name: 'EssentialLink',
  props: {
    caption: {
      type: String,
      default: '',
    },
    icon: {
      type: String,
      default: '',
    },
    link: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
}
</script>
