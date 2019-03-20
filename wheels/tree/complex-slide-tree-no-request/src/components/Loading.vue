<template>
  <div class="loadingCtn">
      <img class="loadingImg" :style="`width:${size}px;height:${size}px;`" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAcCAYAAAB2+A+pAAADqElEQVRIS8WWW2gcZRTHzzmzm0ZMRXqhqMGWolithRafLCIIgcxeOrObZrZrInX1TUGhiFjxwfhYqFCEPilYFZLsfjHOzjSZWbVEEMEbgkHtg2hBBKGIUknS7O7Md2RmTdhsLrO7lXZev/M/v/mfc2bOh9Dhk9CNhyRDWWE6NWsXL3YoXw3HToUhWPKPCLAU74vvtScm/uw0RxDfMTiVPfGg5/k/hWIlNuCak5duCvjY8ScP1Gr1ywGMFCXpmEVnI3BCyx+RLO+v2KXSRudrHKcyxiOexBcBpEeIbzplETprftKGcU99mX8PHROl3HJptjWmAfU/BYTfKpY4EglW9VwSpJxmgG0AuIiKknbNyc9ahYPa8BfAcBQQ0xVLzDSfr0KBdyDil64lHo0EBwGqnhtkySYA9wYDBEpMa+2jYRg7Fqr4CgKJWWvy25XEmpa/uwrePDDsRESfABKzlvikLXAQNKjnBpDZYubbEPE6EmUcs/hx1BCp2vDrzDAWQJlxZLP+bjnVSd04JJlfAqAYAZ1rdrbZCyR04zVmeCMK2tXntJXrhGHs5ho85pbFR1HV6fg7jkrY7vmtBY+NjcW+/v7yfgToYSlRcgyR5KJjFn9p10FrHDNjeih/0GfcpYQ5GVlRcHvc/0oIsYApPX/UY38amPesFdO7Fbv0bDfgQqHQ+8dfixVgfrxZjwDV7b24RwhxDVXNmGfmQy0Bv8YBB2xbXOkGrOrDz7OE82u1uIwAz7m2uBBOdUrLPRGUgRDZJ2KSsHD7Nn9eCFHrBhr+B4aeugs9fzehx0jEUkrZ1wNXhBDXV3Le2uHq1tmN6LZ0nMwYhyVR3J0ufnMjkLb/1UFgAPV9uITIn7vWVCYKnBga7ed6/VVAuQtJubDZnt6yxytQaKy2GdcS6Siwphn31YDnmKE/iCWAU449dW4z3bpSJ4dG9vr1+nf/QX0gJbjerO7kTKZw57JcPBOLx89e/HD85+bEqeMj+71afQ6A7w3hRC875dLZtkqt6rm3WMoXgtWGCKNOWRSbhcEikMt8FRCuxvp6DsyMj//dfK5m8vtA+nPMvK/hnE47dulMK3ydY/VY7m1AfmYjaCBeBYd3Lso6ZslsTRpuqSqcBuB+JJrYKGZ9qTPGYWZ4oNXpSvJs9uTOJW+pcaVV8GTFFB9E9b+tUkclSYyO3iH/qV5r9BCedspT70dp/hdwkETVhn9ghoOIVHCt0ns3DZzKnnjY8/13gPB8t6X+F3hVmSyWnBybAAAAAElFTkSuQmCC" alt="">
  </div>
</template>
<script>
  export default{
    props:{
      size:{
        type: Number,
        default: 35
      }
    }
  }
</script>
<style lang="scss" scoped>
.loadingCtn{
  display: inline-block;
  margin-left: 0px;
  margin-right: 6px;
}
.loadingImg{
  animation: rotate 0.8s infinite linear;
  vertical-align: middle;
  margin-right: 2px;
  margin-top: -3px;
}
@keyframes rotate {
  from {
    transform: rotateZ(0)
  } to { 
    transform: rotateZ(360deg)
  }
}
</style>
