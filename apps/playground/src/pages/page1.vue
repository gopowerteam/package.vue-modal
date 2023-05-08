<template>
  <img alt="Vue logo" src="../assets/logo.png">
  <button @click="onClick">
    12312
  </button>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

<script lang="ts">
import { defineComponent } from 'vue'
import { useModal } from '@gopowerteam/vue-modal'
import HelloWorld from '../components/HelloWorld.vue'

export default defineComponent({
  components: {},
  setup() {
    const modal = useModal()
    function onClick() {
      modal
        .open({
          title: 'aaa',
          component: HelloWorld,
          props: {
            msg: '123',
          },
          width: '50%',
          maskClosable: false,
        })
    }
    return {
      onClick,
    }
  },
})
</script>
