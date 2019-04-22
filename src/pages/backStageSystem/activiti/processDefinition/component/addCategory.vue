<template>
    <div class="lzy-form-wrapper" v-if="isAddCategoryShow" v-loading.lock="isLoading">
      <right-nav-layout
        :btnList="operateBtns"
        :breadcrumbs="navigateMenus"
        ref="rightNavLayout"
      ></right-nav-layout>
      <div class="form-container">
        <el-form :model="categoryNode" ref="ctForm">
          <table class="form-table" width="100%">
            <colgroup>
              <col width="12%"/>
              <col width="88%"/>
            </colgroup>
            <tr>
              <th>
                <span style="color: red;">*</span> 类型名称：
              </th>
              <td>
                <el-form-item label="" prop="name" :rules="[$validate.Required]">
                  <el-input class="form-input" v-model="categoryNode.name"></el-input>
                </el-form-item>
              </td>
            </tr>
          </table>
        </el-form>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
import rightNavLayout from '@/components/topToolBar';
import { mapGetters } from 'vuex';
export default {
  components: {
    rightNavLayout
  },
  methods: {
    /**
     * 表单提交
     * @author   chenguang
     * @date     2018/9/29
     */
    saveFn ()
    {
      this.$confirm('确认保存数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() =>
      {
        this.$store.dispatch('backStageSystem/_PROCESSDEFINITION/saveCategory', this.categoryNode);
      });
    }
  },
  computed: {
    ...mapGetters('backStageSystem/_PROCESSDEFINITION', [
      'marginLeft',
      'categoryNode',
      'navigateMenus',
      'operateBtns',
      'isAddCategoryShow',
      'isLoading'
    ])
  }
};
</script>

<style lang="less" scoped>
@import '../../../../../common/less/common';
</style>
