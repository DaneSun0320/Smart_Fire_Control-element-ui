
<template>
  <div class="gcharts" :id="id"></div>
</template>

<script>
import * as G2 from '@antv/g2'
export default {
  data () {
    return {
      chart: null
    }
  },
  props: {
    charData: {
      type: Array,
      default: function () {
        return {
          data: []
        }
      }
    },
    id: String
  },
  // 如果使用serverData传过来的静态数据 请使用mounted()方法 并注释掉watch
  mounted () {
    this.drawChart()
  },
  // 监听API接口传过来的数据 使用watch
  // watch: {
  // charData: function (val, oldVal) {    // 监听charData，当发生变化时，触发这个回调函数绘制图表
  // console.log('new: %s, old: %s', val, oldVal);
  // this.drawChart(val);
  // }
  methods: {
    drawChart () {
      // 2019.03.30 更新 destory方法已被废弃
      // this.chart && this.chart.destory()
      this.chart = new G2.Chart({
        container: this.id,
        padding: 20,
        width: 800,
        height: 330
      })
      this.chart.source(this.charData)
      this.chart.scale('value', {
        type: 'linear',
        alias: '温度',
        nice: true
      })
      this.chart.scale('time', {
        type: 'time',
        mask: 'MM-DD hh:mm:ss',
        range: [0, 1]
      })
      this.chart.tooltip({
        crosshairs: {
          type: 'line'
        }
      })
      this.chart.line().position('time*value')
      this.chart.point().position('time*value').size(4).shape('circle').style({
        stroke: '#fff',
        lineWidth: 1
      })
      this.chart.render()
    }
  }
}
</script>
<style scope>
  .gcharts{
    height: 100%;
    width: 100%;
  }
</style>
