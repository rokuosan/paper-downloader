<script setup lang="ts">
const {isRequesting, toggle} = useIsRequesting()


</script>

<template>
  <div class="paper-updater">
    <div class="controller">
      <button @click="fetchResult">Get Response</button>
      <span>{{ isRequesting ? 'Requesting...' : ''}}</span>
    </div>
    <div class="result">
      [Result]
      {{ result }}
    </div>
  </div>
</template>

<script lang="ts">

export interface Projects{
  projects: string[]
}

export default defineComponent({
  name: 'PaperUpdater',
  data(){
    return {
      result: '',
    }
  },
  methods: {
    async fetchResult(){
      this.toggle()
      const {data: response} = await useFetch<Projects>('https://papermc.io/api/v2/projects')

      this.result = response.value.projects

      console.log('Successfully fetched.')
      this.toggle()
    }
  }
})
</script>