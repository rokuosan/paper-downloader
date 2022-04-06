<!-- Script -->
<script setup lang="ts">

const versions = await useFetch<Versions>('https://papermc.io/api/v2/projects/paper', {pick: ["versions"]})
const latestVersion = versions.data.value.versions.slice().pop()
const builds = await useFetch<Builds>(`https://papermc.io/api/v2/projects/paper/versions/${latestVersion}`)
const latestBuild = builds.data.value.builds.slice().pop()

const {section, setSection} = useSection()
console.log(section.value)

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
      url: '',
      section: this.section
    }
  },
  methods: {
    async getBuilds(ver: string){
      const temp = await useFetch<Builds>(`https://papermc.io/api/v2/projects/paper/versions/${ver}`)
      const temp2 = temp.data.value.builds.pop()
      console.log(temp2)
      return temp.data.value.builds
    },

    async download(){

    },

    ButtonAction(){
      console.log(this.section.value)
      return () => { this.section.value > 2 ? this.download() : setSection(this.section.value + 1) }
    }
  },
  watch: {
    version: function(newVer) {
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
    },
    ButtonText(){
      return this.section.value > 2 ? "Download" : "Next"
    },
  },
  setup(){
    const versions = await useFetch<Versions>('https://papermc.io/api/v2/projects/paper', {pick: ["versions"]})
    const latestVersion = versions.data.value.versions.slice().pop()
    const builds = await useFetch<Builds>(`https://papermc.io/api/v2/projects/paper/versions/${latestVersion}`)
    const latestBuild = builds.data.value.builds.slice().pop()

    const {section, setSection} = useSection()
    console.log(section.value)
  }
  
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
      <div class="build" v-show="section > 1">
        <span>Builds: </span>
        <select name="select-build" id="select-build" v-model="build">
          <option disabled>Please select one</option>
          <option v-for="b in BuildList"> {{ b }}</option>
        </select>
        {{ build }}
      </div>
    </div>
    <div class="navigation">
      <button @click="ButtonAction"> {{ ButtonText }} </button>
    </div>
  </div>
  <div></div>
</template>

<!-- CSS -->
<style>

</style>