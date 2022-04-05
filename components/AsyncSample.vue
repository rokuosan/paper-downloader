<!-- Script -->
<script setup lang="ts">
// const versions = await useFetch<Versions>('https://papermc.io/api/v2/projects/paper', {pick: ["versions"]}).then(res => {
//   console.log('処理完了')
//   return res
// })

// const latestVersion = versions

// console.log(latestVersion, versions)

// const builds = await useFetch<Builds>(`https://papermc.io/api/v2/projects/paper/versions/${latestVersion}`)

// console.log(builds)


const versions = await useFetch<Versions>('https://papermc.io/api/v2/projects/paper', {pick: ["versions"]}).then(res => {
  console.log('処理完了')
  return res
})

const latestVersion = versions.data.value.versions.slice().pop()

const builds = await useFetch<Builds>(`https://papermc.io/api/v2/projects/paper/versions/${latestVersion}`)

console.log(latestVersion)

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
</script>

<!-- HTML -->
<template>

</template>

<!-- CSS -->
<style>

</style>