<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
  @font-face {
    font-family: 'webfont';
    font-display: swap;
    src: url('//at.alicdn.com/t/webfont_of1b9ehnf7e.eot'); /* IE9*/
    src: url('//at.alicdn.com/t/webfont_of1b9ehnf7e.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
    url('//at.alicdn.com/t/webfont_of1b9ehnf7e.woff2') format('woff2'),
    url('//at.alicdn.com/t/webfont_of1b9ehnf7e.woff') format('woff'), /* chrome、firefox */
    url('//at.alicdn.com/t/webfont_of1b9ehnf7e.ttf') format('truetype'), /* chrome、firefox、opera、Safari, Android, iOS 4.2+*/
    url('//at.alicdn.com/t/webfont_of1b9ehnf7e.svg#NotoSansHans-DemiLight') format('svg'); /* iOS 4.1- */
  }
#app {
  font-family:"webfont" !important;
  font-size:16px;
  font-weight: bold;
  font-style:normal;
  -webkit-font-smoothing: antialiased;
  /*-webkit-text-stroke-width: 0.2px;*/
  -moz-osx-font-smoothing: grayscale;
  /*font-family: Avenir, Helvetica, Arial, sans-serif*/;
  text-align: center;
  color: #2c3e50;
}
</style>
