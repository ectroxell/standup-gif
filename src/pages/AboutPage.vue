<template>
  <q-page class="flex flex-start items-center column q-mb-lg q-px-md">
    <div class="flex flex-start items-left column q-mb-sm q-mt-lg about-content">
      <h1 class="text-h4 text-left text-weight-medium">
        🪩 About StandUp.gif
      </h1>
      <p class="text-body1">
        StandUp.gif is a playful little app that turns your daily stand-up updates
        into the perfect GIF moment. Whether you're feeling productive, chaotic, or
        blocked by failing builds again, the app pairs your vibe with a GIF that says it
        all — saving you from typing yet another "same as yesterday."
      </p>
      <p class="text-body1">
        It's a lighthearted take on team communication designed to make work updates
        a little more human (and a lot more fun).
      </p>
      <h1 class="text-h4 text-left text-weight-medium">
        👩‍💻 About the Developer
      </h1>
      <p class="text-body1">
        Hi! I'm Emma, a software developer with five years of experience building
        custom web applications that solve real problems for both customers and
        internal teams. I started my coding journey through LaunchCode's Web
        Development program, and it completely changed my life — now I get to blend
        creativity, design, and problem-solving every day.
      </p>
      <p class="text-body1">
        Beyond writing code, I enjoy mentoring new developers, especially women and
        queer folks who are breaking into tech. I've worked with LaunchCode as a
        teaching assistant and volunteer reviewer, helping students prep for
        interviews and evaluating their projects.
      </p>
      <p class="text-body1">
        I love experimenting with fun little side projects like StandUp.gif. It sparks
        joy to create apps that make me smile and (hopefully) make someone else's day
        a little brighter too. I'm currently learning more about mobile development
        and always chasing the next creative idea.
      </p>
      <p class="text-body1">
        When I'm not coding or mentoring, you can usually find me watching reality TV
        or keeping up with the current astrological transits (check out my other
        project, <a href="https://www.moonology.net" target="_blank" class="text-primary">Moonology</a>,
        for more on that).
      </p>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'AboutPage',
}
</script>

<style scoped>
.about-content {
  width: 100%;
  max-width: 800px;
}

@media (max-width: 600px) {
  .about-content {
    max-width: 100%;
  }
}
</style>
