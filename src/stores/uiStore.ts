import { defineStore } from 'pinia'

export const useUIStore = defineStore('ui', {
  state: () => ({
    showTopNav: true,
  }),
  actions: {
    toggleTopNav(show: boolean) {
      this.showTopNav = show
    },
  },
})
