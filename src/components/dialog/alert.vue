<template lang="pug">
vb-dialog(:title="title", :content="content", :confirmText="confirmText" :cancelStatus="false")
</template>

<script>
import VbDialog from './dialog'
export default {
  props: {
    title: {
      default: '操作提示',
      type: String
    },
    content: {
      default: '操作提示',
      type: String
    },
    confirmText: {
      default: '确定',
      type: String
    }
  },
  data () {
    return {

    }
  },
  components: {
    VbDialog
  }
}
</script>

<style lang="css">
</style>
