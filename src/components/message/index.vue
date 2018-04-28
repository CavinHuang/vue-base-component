<template lang="pug">
transition(name="fade")
  .vb-message-warrp(v-if="isShow === true")
    .vb-message-container
      .vb-message-icon(v-if="icon === true")
        i.iconfont(:class="[iconClass]")
      .vb-message-content
        span(slot="content") {{message}}
      .vb-close-icon(v-if="close === true", @click="closeHandel")
        i.iconfont.icon-close
</template>

<script>
export default {
  name: 'Message',
  props: {
    iconClass: {
      default: 'icon-info',
      type: String
    },
    icon: {
      default: true,
      type: Boolean
    },
    message: {
      default: '提示消息!',
      type: String
    },
    close: {
      default: false,
      type: Boolean
    }
  },
  data () {
    return {
      isShow: true
    }
  },
  watch: {
    isShow (val) {
      this.$emit('statusChange', val)
    }
  },
  methods: {
    closeHandel (e) {
      this.isShow = false
      this.$emit('closeHandel', e)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../../assets/styles/message/index.styl';
</style>
