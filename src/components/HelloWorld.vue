<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>hunlongyu join this repo</p>
    <button @click="test">按钮</button>
  </div>
</template>

<script>
import { throttle } from 'lodash'
import { rank } from '@/api'
export default {
  name: 'HelloWorld',
  methods: {
    test: throttle(async function () {
      let result = await rank({ test: 123 })
      console.log(result)
    }, 1000)
  },
  props: {
    msg: String
  }
}
</script>
