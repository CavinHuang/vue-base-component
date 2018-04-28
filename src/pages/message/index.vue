<template lang="pug">
div
  message(:close="true" @closeHandel="close")
</template>

<script>
import Message from '@/components/message'
export default {
  methods: {
    close (e) {
      console.log(e)
    }
  },
  components: {
    Message
  }
}
</script>

<style lang="css" scoped>
</style>
