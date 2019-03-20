export default {
    // data () {
    //     return {
    //       locales:  (() => {
    //         const lang = navigator.language
    //         let useLang = /^zh/.test(lang) ? 'zh-CN' : /^en/.test(lang) ? 'en' : lang
    //         // Object.keys 获取可枚举的属性 如果浏览器的语言不是英语 中文， 而且传递的lang参数也不是这两种之一，就默认使用 zh-CN
    //         if (!Object.keys(locales).includes(useLang)) {
    //             useLang = 'zh-CN'
    //         }
    //         return locales[useLang]
    //       })()
    //     }
    // },
    methods: {
        $_t (key) {
            // this.locales已经过滤好了 是个对象
            let localeStr = this.locales[key]
            return localeStr
        }
    }
}