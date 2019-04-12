let formComps = {}
const requireComponent = require.context(
  './',
  false,
  /[A-Z]\w+\.vue$/
)
requireComponent.keys().forEach(fileName => {
  const comp = requireComponent(fileName)
  formComps[fileName.replace(/^\.\/(.*)\.\w+$/, '$1').toLowerCase()] = comp.default
})
console.log(formComps)
export default formComps
