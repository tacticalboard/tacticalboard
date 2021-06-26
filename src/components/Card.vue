<template>
  <div class="w-48 mb-5">
    <router-link :to="route">
      <img
        :src="require('@/assets/' + screenshot)"
        class="shadow-xl rounded transition duration-150 ease-in-out transform hover:scale-105"
      />
      <div class="mt-2"><slot></slot></div>
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    route: {
      type: String,
    },
    screenshot: {
      type: String,
    },
    text: {
      type: String,
    },
  },
};
</script>