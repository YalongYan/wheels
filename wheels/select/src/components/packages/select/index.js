import ElSelect from './select.vue';

ElSelect.install = function(Vue) {
  console.log(ElSelect.name)
  Vue.component(ElSelect.name, ElSelect);
};

export default ElSelect;
