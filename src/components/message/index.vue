<template lang="pug">
.vb-message-warrp
  .vb-message-container
    .vb-message-icon
      slot(name="icon")
    .vb-message-content
      slot(name="content")
    .vb-close-icon
      slot(name="close")
</template>

<script>
export default {
  name: 'Message'
}
</script>

<style lang="stylus" scoped>
@import '../../assets/styles/message/index.styl';
</style>
