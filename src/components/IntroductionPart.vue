import IntroductionCard from '@/components/IntroductionCard.vue';
<template>
  <div class="introduction-wrapper">
    <AvatarImage class="div1" />

    <IntroductionText class="div2" />
    <ProgrammingSkills class="div3" />

    <GithubContribution class="div4" />
  </div>
</template>

<script setup lang="ts">
import AvatarImage from './introduction/AvatarImage.vue'
import GithubContribution from './introduction/GithubContributionGrid.vue'
import IntroductionText from './introduction/IntroductionText.vue'
import ProgrammingSkills from './introduction/SkillsTags.vue'
</script>

<style scoped>
.introduction-wrapper {
  position: absolute;
  top: 300px;
  left: 50%;
  transform: translateX(-50%);
  max-width: 1800px;
  width: 90vw;
  height: 1000px;

  display: grid;

  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(6, 1fr);
  grid-column-gap: 10px;
  grid-row-gap: 20px;
  gap: 1rem;
}

.div1 {
  grid-area: 1 / 1 / 4 / 3;
}
.div2 {
  grid-area: 1 / 3 / 5 / 7;
}
.div3 {
  grid-area: 4/ 1 / 7 / 3;
}
.div4 {
  grid-area: 5 / 3 / 7 / 6;
}
</style>
