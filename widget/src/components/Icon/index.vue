<template>
  <component :is="name" v-bind="$props" />
</template>

<script>
import Loading from './Loading.vue'
import Copy from './Copy.vue'
import ChevronDown from './ChevronDown'
import Chat from './Chat'
import Close from './Close'
import ArrowRight from './ArrowRight'
import Check from './Check'
import Atention from './Atention'

export default {
  components: {
    Loading,
    Copy,
    ChevronDown,
    Chat,
    Close,
    ArrowRight,
    Check,
    Atention
  },
  props: {
    name: {
      type: String,
      required: true
    }
  }
}
</script>
