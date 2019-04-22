<script type="text/jsx">
import roadLine from './roadLine';
import mapInfo from './mapInfo';
import char from './char';
import mapChart from './mapChart';
export default {
  components: {
    roadLine,
    mapInfo,
    char,
    mapChart
  },
  data ()
  {
    return {
    };
  },
  props: {
    /* 组件类型 */
    type: {
      type: String,
      default: 'line'
    },
    charId: {
      type: String
    },
    url: {
      type: String
    }
  },
  computed: {
  },
  render (h)
  {
    if (!this.type) return false;
    const type = this.type.toLowerCase();
    let temp = null;
    switch (type)
    {
      case 'plat' : { temp = <road-line style="width: 100%;"></road-line>; break; }
      case 'mapinfo' : { temp = <map-info style="width: 100%;"></map-info>; break; }
      case 'mapchart' : { temp = <map-chart style="width: 100%;"></map-chart>; break; }
      default: { temp = <char charId={this.charId} url={this.url} ref={this.charId} style="width: 100%;"></char>; break; }
    }
    return (
      temp
    );
  }
};
</script>

<style lang="less" scoped>
</style>
