<!-- SCRIPT -->
<script setup lang="ts">
const {counter, inc, dec, reset, set} = useCounter()

onMounted(() => {
  console.log(counter.value)
})
</script>
<script lang="ts">
export default defineComponent({
  data(){
    return {
      inputNumber: 0
    }
  }
})
</script>


<!-- TEMPLATE -->
<template>
  <div class="block">
    <div>Counter: {{ counter }} </div>
    <div>
      <button v-on:click="inc"> + </button>
      <button v-on:click="dec"> - </button>
      <button @click="reset"> Reset </button>
    </div>
    <div>
      <input type="number" id="order" placeholder="Set your number!" v-model="inputNumber">
      <button type="submit" @click="set(inputNumber)">Set</button>
    </div>
  </div>
</template>


<!-- CSS -->
<style scoped>
.block{
  border: 5px black solid;
}
</style>
