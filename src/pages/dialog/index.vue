<template lang="pug">
div.dialog-demo-warrp
  alert
  confirm
</template>

<script>
import alert from '@/components/dialog/alert'
import confirm from '@/components/dialog/confirm'
export default {
  name: 'dialog-page',
  components: {
    alert,
    confirm
  }
}
</script>

<style lang="stylus">
</style>
