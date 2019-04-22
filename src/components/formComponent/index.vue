<template>
  <div class="form-component-container" :style="{width: `${width}%`}">
    <el-select v-model="initValue" v-if="type === 'select' && !readOnly" @change="handleChange">
      <el-option
        v-for="item in options"
        :key="item.displayValue"
        :label="item.displayName"
        :value="item.displayValue">
      </el-option>
    </el-select>
    <el-radio-group v-model="initValue" v-else-if="type === 'radio' && !readOnly" @change="handleChange">
      <el-radio
        v-for="item in options"
        :key="item.displayValue"
        :label="item.displayValue"
      >
        {{item.displayName}}
      </el-radio>
    </el-radio-group>
    <el-checkbox-group v-model="initValue" v-else-if="type === 'checkbox'" @change="handleChange">
      <el-checkbox
        v-for="item in options"
        :key="item.displayValue"
        :label="item.displayValue"
      >
        {{item.displayName}}
      </el-checkbox>
    </el-checkbox-group>
    <div v-else-if="readOnly">
      {{readOnlyMsg}}
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
/**
 * 专为dictionary的api的设计的一个组件
 */
import { getDictionaryData } from '@/api/common/common';
export default {
  data ()
  {
    return {
      initValue: this.type === 'checkbox' ? this.value ? this.value.split(',') : [] : (this.value || ''),
      readOnlyMsg: '', // 只读数据
      options: []
    };
  },
  props: {
    width: {
      type: Number,
      default: 100
    },
    value: {
      type: [String, Array],
      default: ''
    },
    dictionaryCode: {
      type: String,
      required: true,
      default ()
      {
        return '';
      }
    },
    optionData: {
      type: Array,
      default ()
      {
        return [];
      }
    },
    type: {
      type: String,
      required: true,
      default ()
      {
        return 'select';
      }
    },
    readOnly: { // 是否只读
      type: Boolean,
      required: false,
      default: false
    }
  },
  watch: {
    value (newVal, oldVal)
    {
      this.initValue = this.type === 'checkbox' ? this.value ? this.value.split(',') : [] : (this.value || '');
      this.getData();
    }
  },
  created ()
  {
    this.getData();
  },
  methods: {
    handleChange (label)
    {
      let temp = '';
      if (this.type === 'checkbox')
      {
        temp = label.filter(x => x !== '' && x).join(',');
      }
      else
      {
        temp = label;
      }
      this.$emit('input', temp);
      this.$emit('change', temp);
    },
    getData ()
    {
      if (this.optionData && this.optionData.length > 0)
      {
        if (this.readOnly)
        {
          let listDictionary = [];
          if (this.type === 'checkbox')
          { // 复选框的情况
            for (let a = 0; a < this.initValue.length; a++)
            {
              for (let b = 0; b < this.optionData.length; b++)
              {
                if (this.optionData[b].displayValue === this.initValue[a])
                {
                  listDictionary.push(this.optionData[b].displayName);
                  break;
                }
              }
            }
            this.readOnlyMsg = listDictionary.join(',');
          }
          else
          { // select框与单选框
            if (this.initValue)
            {
              let d = this.optionData.filter(dictionary => dictionary.displayValue === this.initValue);
              this.readOnlyMsg = d[0].displayName;
            }
          }
        }
        else
        {
          this.options = this.optionData;
        }
      }
      else
      {
        getDictionaryData(this.dictionaryCode).then(({ data }) =>
        {
          if (this.readOnly)
          {
            let listDictionary = [];
            if (this.type === 'checkbox')
            { // 复选框的情况
              for (let a = 0; a < this.initValue.length; a++)
              {
                for (let b = 0; b < data.data.length; b++)
                {
                  if (data.data[b].displayValue === this.initValue[a])
                  {
                    listDictionary.push(data.data[b].displayName);
                    break;
                  }
                }
              }
              this.readOnlyMsg = listDictionary.join(',');
            }
            else
            { // select框与单选框
              if (this.initValue)
              {
                let d = data.data.filter(dictionary => dictionary.displayValue === this.initValue);
                this.readOnlyMsg = d[0].displayName;
              }
            }
          }
          else
          {
            this.options = data.data;
          }
        });
      }
    }
  }
};
</script>

<style lang="less" scoped>
.form-component-container {
  /deep/ .el-select {
    width: 100%;
  }
  /deep/ .el-checkbox {
    margin-left: 30px;
  }
}
</style>
