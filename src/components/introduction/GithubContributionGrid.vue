<template>
  <div class="githubChart">
    <!-- TODO:用grid布局实现github贡献图，需要从后端拿数据（定时更新）或拿github api -->
    <div class="container">
      <div class="months"></div>
      <div class="weeks"></div>
      <div class="tiles">
        <div class="tile" v-for="(data, index) in contributionData" :key="index" :data-level="data.level"></div>
      </div>
      <div class="total"></div>
      <div class="legend"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getGitHubContributions } from '@/utils/GithubContribution/GetGithubContribution'
import { onMounted, ref } from 'vue'

interface ContributionData {
  level: number
  date: number
  count: number
}
const user = 'zibengjia'
const contributionData = ref<ContributionData[]>([])
onMounted(async () => {
  const data = await getGitHubContributions(user)
  if (data) {
    contributionData.value = data
    contributionData.value.forEach((item) => {
      console.log(item)
    })
  }
})
</script>
<style scoped lang="scss">
//FIXME:用img做权宜之计，以后再优化
.githubChart {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 100%;
    height: auto;
    object-fit: contain;
  }
}
.container {
  display: grid;
  grid-template-columns: auto repeat(53, 10px);
  grid-template-rows: auto repeat(7, 10px) auto;
  gap: 3px;

  width: fit-content;
  font-size: 12px;
  padding: 14px;
  border: solid 1px #d1d9e0;
  border-radius: 0.375rem;
}

.months {
  grid-area: 1 / 2 / 2 / 55;
  margin-bottom: -3px;
}

.weeks {
  grid-area: 2 / 1 / 9 / 2;
  line-height: 10px;
  margin-right: 3px;
}

.tiles {
  grid-area: 2 / 2 / 9 / 55;

  display: grid;
  grid-auto-flow: column;
  grid-template-columns: subgrid;
  grid-template-rows: subgrid;
}

.tile {
  display: block;
  width: 10px;
  height: 10px;
  border-radius: 2px;

  outline: 1px solid rgba(27, 35, 36, 0.06);
  outline-offset: -1px;

  &[data-level='0'] {
    background: #ebedf0;
  }
  &[data-level='1'] {
    background: #9be9a8;
  }
  &[data-level='2'] {
    background: #40c463;
  }
  &[data-level='3'] {
    background: #30a14e;
  }
  &[data-level='4'] {
    background: #216e39;
  }
}

.total {
  grid-area: 9 / 2 / 10 / 24;
  margin-top: 4px;
}

.legend {
  grid-area: 9 / 40 / 10 / 55;
  margin-top: 4px;

  display: flex;
  gap: 5px;
  justify-content: right;
  align-items: center;
}
</style>
