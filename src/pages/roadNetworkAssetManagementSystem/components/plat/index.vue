<script type="text/jsx">
import roadLine from '../plat/roadLine';
import mapInfo from '../plat/mapInfo';
export default {
  components: {
    roadLine,
    mapInfo
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
      default: { temp = null; break; }
    }
    return (
      temp
    );
  }
};
</script>

<style lang="less" scoped>
</style>
