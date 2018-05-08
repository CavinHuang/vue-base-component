<template lang="pug">
layout(v-show="showStatus")
  .vb-dialog.vb-alert
    .vb-dialog-title
      h3 {{title}}
    .vb-dialog-content(:class="{'vb-dialog-declare': isDeclare}", v-if="!isHTML")
      p {{content}}
    .vb-dialog-content(:class="{'vb-dialog-declare': isDeclare}", v-else, v-html="content")
    .vb-dialog-btns
      a.vb-dialog-btn.vb-dialog-cancel(v-if="cancelStatus === true", @click="cancel") {{cancelText}}
      a.vb-dialog-btn(@click="confirm") {{confirmText}}
</template>

<script>
import layout from './layout'
export default {
  name: 'Alert',
  props: {
    dialogStatus: {
      default: true,
      type: Boolean
    },
    title: {
      default: '提示',
      type: String
    },
    content: {
      default: '提示内容',
      type: String
    },
    isHTML: {
      default: false,
      type: Boolean
    },
    isDeclare: {
      default: false,
      type: Boolean
    },
    cancelStatus: {
      default: true,
      type: Boolean
    },
    confirmText: {
      default: '确定',
      type: String
    },
    cancelText: {
      default: '取消',
      type: String
    }
  },
  data () {
    return {
      showStatus: true
    }
  },
  watch: {
    dialogStatus (nVal) {
      this.showStatus = nVal
    }
  },
  methods: {
    cancel (e) {
      this.showStatus = false
      this.$emit('cancelHandel', e)
    },
    confirm (e) {
      this.showStatus = false
      this.$emit('confirmHandel', e)
    }
  },
  components: {
    layout
  }
}
</script>

<style lang="stylus">
@import '../../assets/styles/dialog/index.styl';
</style>
