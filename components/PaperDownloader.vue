<!-- Script -->
<script setup lang="ts">

// API URL
const VERSION_URL = 'https://papermc.io/api/v2/projects/paper'
const BUILD_URL = (ver: string) => `${VERSION_URL}/versions/${ver}`
const DOWNLOAD_URL = (ver: string, build: string) => `${BUILD_URL(ver)}/builds/${build}/downloads/paper-${ver}-${build}.jar`


// Variables
const fetchedVersions = ref(false)
const fetchedBuilds = ref(false)
const isDefinedVersion = ref(false)
const isDefinedBuilds = ref(false)

const versions = ref([''])
const builds = ref([''])

const version = ref('default')
const build = ref('default')

const url = ref('')


// Function
const download = () => {
  window.location.href = url.value
}



// Watch version
watch(version, (newVer) => {

  isDefinedVersion.value = false
  isDefinedBuilds.value = false
  fetchedBuilds.value = false

  fetch(BUILD_URL(newVer)).then(res => res.json())
    .then(data => {

      builds.value = data.builds
      build.value = builds.value.slice().pop() // Auto select latest build

      fetchedBuilds.value = true
      isDefinedVersion.value = true
      isDefinedBuilds.value = true
    })
})


// Watch build
watch(build, (newBuild) => {

  isDefinedBuilds.value = false

  url.value = DOWNLOAD_URL(version.value, newBuild) // Update download link

  isDefinedBuilds.value = true
})

  
// Events
onMounted(() => {
  fetch(VERSION_URL).then( res => res.json())
    .then( data => {

      versions.value = data.versions
      version.value = versions.value.slice().pop() // Auto select latest version

      fetchedVersions.value = true
    })
})


</script>
<script lang="ts">

</script>

<!-- HTML -->
<template>
  <div id="app">

    <div class="title"> 
      <h1>Paper Downloader</h1>
      <h3>This application was designed to download Paper easier.</h3>
    </div>

    <div class="content">

      <div class="version">
        <span>Version:</span>
        <div v-if="fetchedVersions">
          <select name="selector-version" id="selector-version" v-model="version">
            <option v-for="e in versions" :value="e"> {{ e }} </option>
          </select>
        </div>
        <div v-else>
          <span>Preparing...</span>
        </div>
      </div>

      <div class="build" v-if="isDefinedVersion">
        <span>Build: </span>
        <div v-if="fetchedBuilds">
          <select name="selector-build" id="selector-build" v-model="build">
            <option v-for="e in builds" :value="e"> {{ e }} </option>
          </select>
        </div>
        <div v-else>
          <span>Preparing...</span>
        </div>
      </div>

      <div class="result" v-show="isDefinedBuilds">
        <p>Ready for download</p>
        <button id="btn-result-download" @click="download" :title="url">Download</button>
      </div>

    </div>
  </div>
</template>

<!-- CSS -->
<style>

</style>