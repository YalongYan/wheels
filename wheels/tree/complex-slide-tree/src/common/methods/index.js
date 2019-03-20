export default {
    // 防抖 等待多少时间之后再执行，这段时间内（time存在的时候）再次触发，等待时间重置
    _debounce(fn, delay) {
        var delay = delay || 200
        var timer
        return function () {
            var that = this
            var args = arguments
            if (timer) {
                clearTimeout(timer)
            }
            timer = setTimeout(function () {
                timer = null
                fn.apply(that, args)
            }, delay)
        }
    },
    // 节流 ~
    _throttle(fn, interval) {
        var last
        var timer
        var interval = interval || 200
        return function () {
            var that = this
            var args = arguments
            var now = +new Date()
            if (last && now - last < interval) {
                clearTimeout(timer)
                timer = setTimeout(function () { 
                    last = now
                    fn.apply(that, args)
                }, interval)
            } else {
                last = now
                fn.apply(that, args)
            }
        }  
    }
}
