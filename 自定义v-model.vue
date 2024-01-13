<!-- 父组件 -->
<CustomModel  v-model="name"/>
data() {
  return {
    name: ''
  }
}
<!-- 子组件 -->
<template>
  <input type="text" :value="text" @input="$emit('change',$event.target.value)">
</template>

<script>
export default {
props:{
  text:String,
  default() {
    return ;
  }
},
model:{
  prop: 'text', // 对应 props text
  event: 'change'
}
}
</script>
