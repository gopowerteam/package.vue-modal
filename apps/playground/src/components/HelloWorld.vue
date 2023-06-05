<template>
  <h1>{{ msg }}</h1>
  <button @click="aaa">
    123123
  </button>
  <button @click="bbb">
    cccc
  </button>
  <p v-for="item in 100" :key="item">
    Recommended IDE setup:
    <a href="https://code.visualstudio.com/" target="_blank">VSCode</a>
    +
    <a
      href="https://marketplace.visualstudio.com/items?itemName=octref.vetur"
      target="_blank"
    >
      Vetur
    </a>
    or
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
    (if using
    <code>&lt;script setup&gt;</code>)
  </p>

  <p>See <code>README.md</code> for more information.</p>

  <p>
    <a href="https://vitejs.dev/guide/features.html" target="_blank">
      Vite Docs
    </a>
    |
    <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Docs</a>
  </p>

  <button @click="count++">
    count is: {{ count }}
  </button>
  <p>
    Edit
    <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
</template>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useModal } from '@gopowerteam/vue-modal'
import TTT from './TTT.vue'

export default defineComponent({
  name: 'HelloWorld',
  props: {
    msg: {
      type: String,
      required: true,
    },
  },
  setup: () => {
    const modal = useModal() as any
    const count = ref(0)
    const aaa = () => {
      modal.close({ a: 1 })
    }
    const bbb = () => {
      modal
        .open({
          title: 'ccc',
          component: TTT,
          props: {
            msg: '123',
          },
        })
    }
    return { count, aaa, bbb }
  },
})
</script>
