<template>
  <div class="bg-gray-800 min-h-screen text-white">
    <div>
      <!-- Place this tag where you want the button to render. -->
    </div>
    <div class="pt-10 text-center">
      <div class="flex justify-center items-end">
        <p class="text-5xl mr-2">Tactical Board</p>
        <github-button
          href="https://github.com/tacticalboard/tacticalboard"
          data-show-count="true"
          aria-label="Star tacticalboard/tacticalboard on GitHub"
          >Star</github-button
        >
      </div>
      <p class="mt-1 text-xl">Make tactical communication convenient.</p>
    </div>
    <div class="px-2 mx-auto max-w-3xl mt-16">
      <div class="flex items-end justify-around text-center flex-wrap">
        <div class="w-48 mb-5">
          <router-link to="/shuttle">
            <img src="@/assets/screenshot/shuttle.jpg" alt="" />
            <p class="mt-2">Badminton</p>
          </router-link>
        </div>

        <div class="w-48 mb-5">
          <router-link to="/football">
            <img src="@/assets/screenshot/football.jpg" alt="" />
            <p class="mt-2">Football</p>
          </router-link>
        </div>

        <div class="w-48 mb-5">
          <router-link to="/basketball">
            <img src="@/assets/screenshot/basketball.jpg" alt="" />
            <p class="mt-2">Basketball</p>
          </router-link>
        </div>
      </div>
    </div>
    <div>
      <p class="text-center text-xs mt-5">
        *Double click the ball to enter/exit the full screen mode.
      </p>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { useHead } from "@vueuse/head";
import GithubButton from "vue-github-button";

export default {
  name: "Home",
  components: {
    GithubButton,
  },
  setup: function () {
    useHead({
      title: "Tactical Board",
    });
  },
};
</script>