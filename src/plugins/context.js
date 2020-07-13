// import Vue from 'vue';
import usePostService from '@/models/Post/usePostService';
import { provide } from '@vue/composition-api'

const contextMixin = {
  setup() {
    provide('PostService', usePostService())
  },
}

export default contextMixin