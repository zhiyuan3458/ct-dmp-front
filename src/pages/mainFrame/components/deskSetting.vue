<template>
<custom-dialog title="自定义桌面设置" icon="ct-icon-set-blue" width="600px" height="350px" :resizable="false"  :visible.sync="isShow" @close="closeModal">
  <ctTransfer
    v-model="target"
    :props="{
      key: 'id',
      label: 'title'
    }"
    :titles="['未选中的图表', '已选中的图表']"
    :data="source"
    @change="handleSave"
  >
    <span slot-scope="{ option }">
      <span>{{option.title.length > 8 ? option.title.substring(0,8) + '...' : option.title}}</span>
    </span>
  </ctTransfer>
</custom-dialog>
</template>

<script type="text/ecmascript-6">
import ctTransfer from '@/pages/mainFrame/components/ctTransfer/index.vue';
import customDialog from '@/components/dialog';
import { saveDeskSetting } from '@/api/mainFrame/header';
import { mapGetters } from 'vuex';

export default {
  name: 'deskSetting',
  components: {
    ctTransfer,
    customDialog
  },
  data ()
  {
    return {
      isShow: false,
      source: [],
      target: [],
      chartTitle: '',
      size: ''
    };
  },
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters([
      'initEcharts',
      'innerDialogVisible',
      'currentSubsystemId'
    ])
  },
  watch: {
    value ()
    {
      this.isShow = this.value;
    },
    initEcharts ()
    {
      this.source = this.initEcharts.map(echart =>
      {
        return {
          id: echart.id,
          title: echart.title
        };
      });
      this.target = this.initEcharts.filter(item => item.isTarget === '1').map(echart => echart.id);
    },
    /* 监听系统的id是否发生改变 */
    currentSubsystemId ()
    {
      this.$store.dispatch('getDeskSetting', this.currentSubsystemId);
    }
  },
  methods: {
    /* 关闭模态框 */
    closeModal ()
    {
      this.isShow = false;
      this.$emit('input', false);
    },
    /**
     * 保存后关闭模态框
     * @author   lvzhiyuan
     * @date     2018/8/21
     */
    handleSave (initIds)
    {
      let ids = initIds.join(',');
      const systemId = sessionStorage.getItem('currentSubsystemId');
      const obj = {
        systemId,
        ids
      };
      saveDeskSetting(obj).then(res =>
      {
        this.$store.dispatch('getDeskSetting', systemId);
        this.$message({
          message: '修改成功！',
          type: 'success'
        });
      });
    }
  }
};
</script>
