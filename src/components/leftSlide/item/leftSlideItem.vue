<template lang="pug">
.list-item(data-type='0')
  .list-box
    slot(name="content")
  .delete(@click='deleteItem') 删除
</template>

<script>
export default {
  name: 'leftSlideItem',
  methods: {
    deleteItem () {}
  }
}
</script>
