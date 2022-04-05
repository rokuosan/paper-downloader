<!-- Script -->
<script setup lang="ts">

const versions = await useFetch<Versions>('https://papermc.io/api/v2/projects/paper', {pick: ["versions"]})
const latestVersion = versions.data.value.versions.slice().pop()
const builds = await useFetch<Builds>(`https://papermc.io/api/v2/projects/paper/versions/${latestVersion}`)
const latestBuild = builds.data.value.builds.slice().pop()

</script>
<script lang="ts">
export interface Versions {
  project_id: string,
  project_name: string,
  version_groups: string[],
  versions: string[]
}

export interface Builds {
  project_id: string,
  project_name: string,
  version: string,
  builds: string[]
}

export default defineComponent({
  name: 'PaperDownloader',
  data(){
    return {
      version: this.latestVersion,
      build: this.latestBuild,
      url: ''
    }
  },
  methods: {
    async getBuilds(ver: string){
      const temp = await useFetch<Builds>(`https://papermc.io/api/v2/projects/paper/versions/${ver}`)
      const temp2 = temp.data.value.builds.pop()
      console.log(temp2)
      return temp.data.value.builds
    }
  },
  watch: {
    version: function(newVer, oldVer) {
      console.log('Detected version change')
      this.getBuilds(newVer)
    }
  },
  computed: {
    BuildList(){
      return this.builds.data.value.builds
    },
    VersionList(){
      return this.versions.data.value.versions
    }
  },
  
})
</script>

<!-- HTML -->
<template>
  <div>
    <h1>Paper Downloader</h1>
    <div class="controller">
      <div class="version">
        <span>Version: </span>
        <select id="select-version" name="select-version" v-model="version">
          <option disabled value="selected">Please select one</option>
          <option v-for="v in VersionList"> {{ v }}</option>
        </select>
      </div>
      <div class="build">
        <span>Builds: </span>
        <select name="select-build" id="select-build" v-model="build">
          <option disabled>Please select one</option>
          <option v-for="b in BuildList"> {{ b }}</option>
        </select>
        {{ build }}
      </div>
    </div>
    <div class="result">
      <div class="download-url">

      </div>
      <button class="btn-download">Download</button>
      <div class="output">

      </div>
    </div>
  </div>
  <div></div>
</template>

<!-- CSS -->
<style>

</style>