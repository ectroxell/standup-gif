<template>
  <q-page class="flex items-center column q-mb-lg q-px-md">
    <div class="flex items-left column q-mb-sm q-mt-lg about-content">
      <h1 class="text-h4 text-left text-weight-medium">📺 About StandUp.gif</h1>
      <p class="text-body1">
        <strong>StandUp.gif</strong> (pronounced "stand up dot gif") is a playful app that turns
        your <strong>daily stand-up updates</strong> into the <em>perfect</em> GIF moment. Whether
        you're feeling <em>productive</em>, <em>chaotic</em>, or
        <em>blocked by failing builds again</em>, the app pairs your vibe with a GIF that says it
        all — <strong>saving you from typing yet another "same as yesterday."</strong>
      </p>
      <p class="text-body1">
        It's a lighthearted take on team communication designed to make work updates
        <em>a little more human</em> (and a lot more fun) 💛
      </p>
      <p class="text-body1">
        Check out my <a href="https://github.com/users/ectroxell/projects/2/views/1" target="_blank" class="text-primary">project board on GitHub</a> to see the progress of this project 🤓
      </p>
      <h1 class="text-h4 text-left text-weight-medium q-mt-lg">👩‍💻 About the Developer</h1>
      <p class="text-body1">
        Hi! I'm <strong>Emma</strong>, a software developer with
        <strong>five years of experience</strong> building custom applications that solve real
        problems for both customers and internal teams. I started my coding journey through
        LaunchCode's Web Development program and it <em>completely</em> changed my life. Now I get
        to blend <strong>creativity</strong>, <strong>collaboration</strong>, and
        <strong>problem-solving</strong> every day.
      </p>
      <p class="text-body1">
        Beyond writing code, I enjoy <em>mentoring new developers</em>, especially
        <strong>women</strong> and <strong>queer folks</strong> who are breaking into tech. I've
        worked with LaunchCode as a teaching assistant and volunteer reviewer, helping students prep
        for interviews and polish their projects.
      </p>
      <p class="text-body1">
        I love experimenting with fun little side projects like this one. It sparks joy to create
        apps that make me smile and (hopefully)
        <strong>make someone else's day a little brighter too.</strong> I'm currently learning more
        about mobile development and always chasing the next creative idea.
      </p>
      <p class="text-body1">
        When I'm not coding or mentoring, you can find me watching reality TV or keeping up with the
        current astrological transits (check out my other project,
        <a href="https://www.moonology.net" target="_blank" class="text-primary">Moonology 🌙</a>,
        for more on that).
      </p>
      <p class="text-body1">
        I'm based in <strong>St. Louis, Missouri</strong> and you can find me on
        <a href="https://github.com/ectroxell" target="_blank" class="text-primary">GitHub</a>
        and
        <a href="https://www.linkedin.com/in/emma-troxell/" target="_blank" class="text-primary"
          >LinkedIn</a
        >.
      </p>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'AboutPage',
};
</script>

<style scoped>
.about-content {
  width: 100%;
  max-width: 700px;
}

@media (max-width: 600px) {
  .about-content {
    max-width: 100%;
  }
}
</style>
