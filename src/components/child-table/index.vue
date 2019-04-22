<template>
  <el-form class="child-form-table-container" ref="childForm">
    <h2 class="child-table-header" v-if="title !== ''">{{title}}</h2>
    <table class="child-form-table">
      <colgroup>
        <col width="20" v-if="!readonly"/>
        <col
          v-for="item in constructInfo"
          :key="item.id"
          v-if="item.isHide === '0'"
          :width="item.colWidth"/>
      </colgroup>
      <tr>
        <th class="form-th" v-if="!readonly"></th>
        <th
          v-for="item in constructInfo"
          v-if="item.isHide === '0'"
          :key="item.id"
          class="form-th"
        >
          {{item.name}}
        </th>
      </tr>
      <tr
        v-for="(item, index) in dataInfo"
        :key="index"
      >
        <td v-if="!readonly">
          <span class="ct-icon-minus1-red" @click="handleDelete(item, index)"></span>
        </td>
        <td v-for="childItem in constructInfo" :key="childItem.id" v-if="childItem.isHide === '0'">
          <el-form-item :prop="item.code">
            <el-input
              v-model="item[childItem.code]"
              v-if="childItem.type === 'Input'"
              style="width: 100%;"
              :readonly="readonly"
              @change="handleChange">
            </el-input>
            <el-input
              v-model="item[childItem.code]"
              v-if="childItem.type === 'TextArea'"
              type="textarea"
              style="width: 100%;"
              :rows="1"
              :readonly="readonly"
              @change="handleChange">
            </el-input>
            <el-select
              v-model="item[childItem.code]"
              v-if="childItem.type === 'ConstantDD'"
              style="width: 100%;"
              :readonly="readonly"
              @change="handleChange">
              <el-option
                v-for="optionItem in optionGroup[childItem.code]"
                :key="optionItem.displayValue"
                :label="optionItem.displayName"
                :value="optionItem.displayValue">
              </el-option>
            </el-select>
            <el-radio-group
              v-model="item[childItem.code]"
              v-if="childItem.type === 'Radio'"
              @change="handleChange">
              <el-radio
                v-for="optionItem in optionGroup[childItem.code]"
                :key="optionItem.displayValue"
                :label="optionItem.displayValue"
              >
                {{item.displayName}}
              </el-radio>
            </el-radio-group>
            <el-checkbox-group
              v-model="item[childItem.code]"
              v-if="childItem.type === 'CheckBox'"
              @change="handleChange">
              <el-checkbox
                v-for="item in optionGroup[childItem.code]"
                :key="item.displayValue"
                :label="item.displayValue"
              >
                {{item.displayName}}
              </el-checkbox>
            </el-checkbox-group>
            <el-date-picker
              v-if="childItem.type === 'Date'"
              v-model="item[childItem.code]"
              :readonly="readonly"
              value-format="yyyy-MM-dd"
              type="date"
              style="width: 100%;"
            >
            </el-date-picker>
          </el-form-item>
        </td>
      </tr>
      <tr class="add-tr" v-if="!readonly">
        <span class="ct-icon-add-green" @click="handleAdd"></span>
      </tr>
    </table>
  </el-form>
</template>

<script type="text/ecmascript-6">
/**
 * 专为api的设计的一个组件
 */
import { getBridgeData, getDictionaryData } from '@/api/common/common';
import { postHttp } from '@/api/util';
export default {
  data ()
  {
    return {
      /* 放select下拉框的一些options选项 */
      optionGroup: {},
      /* 结构数据（包括表名，每一列的type） */
      constructInfo: [],
      /* 表格数据 */
      dataInfo: this.initDataInfo ? JSON.parse(this.initDataInfo) : []
    };
  },
  props: {
    readonly: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    initDataInfo: {
      type: String,
      default: ''
    },
    relatedTableCode: {
      type: String,
      default ()
      {
        return '';
      }
    },
    deleteUrl: {
      type: String,
      default: ''
    }
  },
  watch: {
    initDataInfo: {
      handler (newVal, oldVal)
      {
        this.dataInfo = [];
        this.initData();
        if (newVal)
        {
          this.dataInfo = JSON.parse(newVal);
        }
      },
      immediate: true
    }
  },
  methods: {
    /**
     * 初始化数据
     */
    initData ()
    {
      getBridgeData(this.relatedTableCode).then(({ data }) =>
      {
        this.constructInfo = data.data;
        this.constructInfo.forEach(item =>
        {
          if (item.type !== 'Date' && item.type !== 'Input' && item.type !== 'TextArea' && item.type !== 'Attachment')
          {
            getDictionaryData(item.codeValue).then(({ data }) =>
            {
              this.$set(this.optionGroup, item.code, data.data);
            });
          }
          else
          {
            this.$set(this.optionGroup, item.code, []);
          }
        });
      });
    },
    /**
     * 新增一行
     */
    handleAdd ()
    {
      let obj = {};
      this.constructInfo.forEach(item =>
      {
        obj[item.code] = '';
      });
      this.dataInfo.push(obj);
      this.$emit('change', this.dataInfo);
    },
    /**
     * 删除一行
     */
    handleDelete (item, index)
    {
      let id = item.id;
      this.$confirm('确认删除数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() =>
      {
        postHttp(this.deleteUrl, { id }).then(_ =>
        {
          this.dataInfo.splice(index, 1);
          this.$emit('change', this.dataInfo);
        });
      }).catch(_ =>
      {});
    },
    /**
     * 当随便一个值改变时提交到父组件那里
     */
    handleChange ()
    {
      this.$emit('change', this.dataInfo);
    }
  }
};
</script>

<style lang="less" scoped>
.child-form-table-container {
  .child-table-header {
    background: #EDF6FC;
    text-align: left;
    padding: 5px 5px 5px 20px;
    font-family: '宋体';
    font-size: 16px;
    font-weight: bold;
    color: #333333;
  }
  .child-form-table {
    width: 100%;
    table-layout: fixed;
    .form-th {
      text-align: center;
      vertical-align: middle;
      font-size: 12px;
      font-weight: 700;
      background: #fbfbfb;
      padding: 5px;
      color: #333333;
      letter-spacing: 1px;
      border: 1px solid #ccc;
      box-sizing: border-box;
      word-wrap: break-word;
    }
    td {
      border: 1px solid #ccc;
      padding: 5px;
      box-sizing: border-box;
      word-wrap: break-word;
      font-size: 12px;
    }
    .readonly {
      /deep/ .el-input__inner {
        text-align: center;
      }
    }
    /deep/ .el-input__inner {
      height: 25px !important;
      line-height: 25px !important;
      border-radius: 3px;
      font-size: 12px;
    }
    /deep/ .el-select .el-input__suffix {
      top: 0px;
      .el-select__caret {
        line-height: 25px;
      }
    }
    /deep/ .el-date-editor--date .el-input__prefix {
      top: -8px;
    }
    /deep/ .el-date-editor--date .el-input__suffix {
      top: -8px;
      right: 1px;
    }
    .add-tr {
      border: 0;
      .ct-icon-add-green {
        display: inline-block;
        font-size: 16px;
        margin-left: 6px;
        cursor: pointer;
      }
    }
    ct-icon-minus1-red {
      font-size: 18px;
      cursor: pointer;
    }
  }
}
</style>
