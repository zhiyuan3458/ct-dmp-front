<template>
  <div class="lzy-form-wrapper" v-loading.lock="isLoading">
    <right-nav-layout
      :btnList="operateBtns"
      :breadcrumbs="navigateMenus"
    ></right-nav-layout>
    <div class="form-container">
      <el-form :model="formData" ref="ctForm">
        <table class="form-table" width="100%">
          <tr>
            <th class="form-header" colspan="6">
              <h2 style="text-align: center">中央车购税项目表</h2>
            </th>
          </tr>
        </table>
        <el-collapse v-model="activeNames">
          <el-collapse-item title="A.基本信息" name="1">
            <table class="form-table" width="100%">
              <colgroup>
                <col width="12%"/>
                <col width="21%"/>
                <col width="12%"/>
                <col width="21%"/>
                <col width="12%"/>
                <col width="22%"/>
              </colgroup>
              <tr>
                <th>项目序号</th>
                <td>
                  <el-form-item label="" prop="projectNumber">
                    <el-input class="form-input" v-model="formData.projectNumber" placeholder="请输入序号" :readonly="readOnly"></el-input>
                  </el-form-item>
                </td>
                <th><span style="color: red;">*</span>项目名称</th>
                <td>
                  <el-form-item label="" prop="projectNmae" :rules="[$validate.Required]">
                    <el-input class="form-input" v-model="formData.projectNmae" placeholder="请输入项目名称" :readonly="readOnly"></el-input>
                  </el-form-item>
                </td>
                <th>计划类别</th>
                <td>
                  <el-form-item label="" prop="planCategory">
                    <ztree-select
                      v-model="formData.planCategory"
                      :ztreeList="formDataParams.planCategoryList"
                      :readOnly="readOnly"
                    ></ztree-select>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <th>费用来源</th>
                <td>
                  <el-form-item label="" prop="costSources">
                    <ztree-select
                      v-model="formData.costSources"
                      :ztreeList="formDataParams.sourcesList"
                      :readOnly="readOnly"
                    ></ztree-select>
                  </el-form-item>
                </td>
                <th><span style="color: red;">*</span>开工年限</th>
                <td>
                  <el-form-item label="" prop="startYear" :rules="[$validate.Required, $validate.Date]">
                    <el-date-picker
                      v-model="formData.startYear"
                      type="year"
                      format="yyyy年"
                      value-format="yyyy"
                      :readonly="readOnly"
                      placeholder="选择年">
                    </el-date-picker>
                  </el-form-item>
                </td>
                <th><span style="color: red;">*</span>完工年限</th>
                <td>
                  <el-form-item label="" prop="endYear" :rules="[$validate.Required, $validate.Date]">
                    <el-date-picker
                      v-model="formData.endYear"
                      type="year"
                      format="yyyy年"
                      value-format="yyyy"
                      :readonly="readOnly"
                      placeholder="选择年">
                    </el-date-picker>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <th>项目所在市区及县区</th>
                <td>
                  <el-form-item label="" prop="cityAndCounty">
                    <el-cascader
                      placeholder="请选择或者搜索"
                      :options="formDataParams.cityAndCountyList"
                      v-model="cityAndCounty"
                      :separator="'-'"
                      filterable
                      size="mini"
                      :disabled="readOnly">
                    </el-cascader>
                  </el-form-item>
                </td>
                <th>中期评估调整情况</th>
                <td>
                  <el-form-item label="" prop="midTermEvaluation">
                    <el-input class="form-input" v-model="formData.midTermEvaluation" placeholder="请输入" :readonly="readOnly"></el-input>
                  </el-form-item>
                </td>
                <th>中期评估调整项目编码</th>
                <td>
                  <el-form-item label="" prop="midTermEvaluationCode">
                    <el-input class="form-input" v-model="formData.midTermEvaluationCode" placeholder="请输入" :readonly="readOnly"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <th>对应规划项目</th>
                <td>
                  <el-form-item label="" prop="correspondingProgram">
                    <el-input class="form-input" v-model="formData.correspondingProgram" placeholder="请输入" :readonly="readOnly"></el-input>
                  </el-form-item>
                </td>
                <th>深度贫困地区</th>
                <td>
                  <el-form-item label="" prop="deepPoverty">
                    <el-input class="form-input" v-model="formData.deepPoverty" placeholder="请输入" :readonly="readOnly"></el-input>
                  </el-form-item>
                </td>
                <th>项目所属集中连片特困地区</th>
                <td>
                  <el-form-item label="" prop="distressArea">
                    <el-select v-model="formData.distressArea" :disabled="readOnly" placeholder="请选择">
                      <el-option
                        v-for="item in formDataParams.distressAreaList"
                        :key="item.text"
                        :label="item.text"
                        :value="item.text">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <th>项目所属革命老区</th>
                <td>
                  <el-form-item label="" prop="revolutionaryArea">
                    <el-input class="form-input" v-model="formData.revolutionaryArea" placeholder="请输入" :readonly="readOnly"></el-input>
                  </el-form-item>
                </td>
                <th>国贫县</th>
                <td>
                  <el-form-item label="" prop="poorCounty">
                    <el-select v-model="formData.poorCounty" :disabled="readOnly" placeholder="请选择">
                      <el-option
                        v-for="item in formDataParams.yesNo"
                        :key="item.text"
                        :label="item.text"
                        :value="item.text">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </td>
                <th>边境县</th>
                <td>
                  <el-form-item label="" prop="borderCounty">
                    <el-select v-model="formData.borderCounty" :disabled="readOnly" placeholder="请选择">
                      <el-option
                        v-for="item in formDataParams.yesNo"
                        :key="item.text"
                        :label="item.text"
                        :value="item.text">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <th>少数民族县</th>
                <td>
                  <el-form-item label="" prop="minorityCounty">
                    <el-select v-model="formData.minorityCounty" :disabled="readOnly" placeholder="请选择">
                      <el-option
                        v-for="item in formDataParams.yesNo"
                        :key="item.text"
                        :label="item.text"
                        :value="item.text">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </td>
                <th>线路性质</th>
                <td>
                  <el-form-item label="" prop="midTermEvaluation">
                    <el-select v-model="formData.routeProperty" :disabled="readOnly" placeholder="请选择">
                      <el-option
                        v-for="item in formDataParams.routePropertyList"
                        :key="item.text"
                        :label="item.text"
                        :value="item.text">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </td>
                <th>收费属性</th>
                <td>
                  <el-form-item label="" prop="feeProperty">
                    <el-select v-model="formData.feeProperty" :disabled="readOnly" placeholder="请选择">
                      <el-option
                        v-for="item in formDataParams.feeAttributeList"
                        :key="item.text"
                        :label="item.text"
                        :value="item.text">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <th>建设性质</th>
                <td>
                  <el-form-item label="" prop="buildProperty">
                    <el-select v-model="formData.buildProperty" :disabled="readOnly" placeholder="请选择">
                      <el-option
                        v-for="item in formDataParams.buildPropertyList"
                        :key="item.text"
                        :label="item.text"
                        :value="item.text">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </td>
                <th>总投资</th>
                <td>
                  <el-form-item label="" prop="totalInvestment">
                    <el-input class="form-input" v-model="formData.totalInvestment" @blur="totalSubsidyChange" placeholder="请输入数字" :readonly="readOnly"></el-input>
                  </el-form-item>
                </td>
                <th>中央投资（车购税）</th>
                <td>
                  <el-form-item label="" prop="centralInvestment">
                    <el-input class="form-input" v-model="formData.centralInvestment" @blur="totalSubsidyChange" placeholder="请输入数字" :readonly="readOnly"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <th>前期工作情况:工可或核准批复文号</th>
                <td>
                  <el-form-item label="" prop="approvalDocumentNo">
                    <el-input class="form-input" v-model="formData.approvalDocumentNo" placeholder="请输入" :readonly="readOnly"></el-input>
                  </el-form-item>
                </td>
                <th>前期工作情况:初设或施工图批复文号</th>
                <td>
                  <el-form-item label="" prop="initialSetNumber">
                    <el-input class="form-input" v-model="formData.initialSetNumber" placeholder="请输入" :readonly="readOnly"></el-input>
                  </el-form-item>
                </td>
                <th>项目业主单位</th>
                <td>
                  <el-form-item label="" prop="projectOwnerUnit">
                    <el-input class="form-input" v-model="formData.projectOwnerUnit" placeholder="请输入" :readonly="readOnly"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <th>实际（或计划）开工年月</th>
                <td>
                  <el-form-item label="" prop="actualStartDate">
                    <el-date-picker
                      v-model="formData.actualStartDate"
                      type="date"
                      format="yyyy年MM月dd日"
                      value-format="yyyy-MM-dd"
                      :readonly="readOnly"
                      placeholder="选择日期">
                    </el-date-picker>
                  </el-form-item>
                </td>
                <th>实际（或计划）完工年月</th>
                <td>
                  <el-form-item label="" prop="actualEndDate">
                    <el-date-picker
                      v-model="formData.actualEndDate"
                      type="date"
                      format="yyyy年MM月dd日"
                      value-format="yyyy-MM-dd"
                      :readonly="readOnly"
                      placeholder="选择日期">
                    </el-date-picker>
                  </el-form-item>
                </td>
                <th>截至今年底情况（完工/在建/未开工）</th>
                <td>
                  <el-form-item label="" prop="yearEndSituation">
                    <el-input class="form-input" v-model="formData.yearEndSituation" placeholder="请输入" :readonly="readOnly"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <th>截至今年底已完工项目是否已交工验收（未交验的简单说明进展情况）</th>
                <td>
                  <el-form-item label="" prop="acceptanceSituation">
                    <el-input class="form-input" type="textarea" rows="5" cols="50" v-model="formData.acceptanceSituation" placeholder="请输入" :readonly="readOnly">
                    </el-input>
                  </el-form-item>
                </td>
                <th>备注</th>
                <td colspan="3">
                  <el-form-item label="" prop="comment">
                    <el-input class="form-input" type="textarea" rows="5" cols="50" v-model="formData.comment" placeholder="请输入备注" :readonly="readOnly">
                    </el-input>
                  </el-form-item>
                </td>
              </tr>
            </table>
          </el-collapse-item>
        </el-collapse>
        <el-collapse v-model="activeNames">
          <el-collapse-item title="B.公路现状等级（公里）" name="2">
            <table class="form-table" width="100%">
              <colgroup>
                <col width="12%"/>
                <col width="21%"/>
                <col width="12%"/>
                <col width="21%"/>
                <col width="12%"/>
                <col width="22%"/>
              </colgroup>
              <tr>
                <th>一级公路</th>
                <td>
                  <el-form-item label="" prop="level1Road">
                    <el-input class="form-input" v-model="formData.level1Road" placeholder="请输入数字" :readonly="readOnly">
                    </el-input>
                  </el-form-item>
                </td>
                <th>二级公路</th>
                <td>
                  <el-form-item label="" prop="level2Road">
                    <el-input class="form-input"  v-model="formData.level2Road" placeholder="请输入数字" :readonly="readOnly">
                    </el-input>
                  </el-form-item>
                </td>
                <th>三级公路</th>
                <td>
                  <el-form-item label="" prop="level3Road">
                    <el-input class="form-input" v-model="formData.level3Road" placeholder="请输入数字" :readonly="readOnly">
                    </el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <th>四级公路</th>
                <td colspan="5">
                  <el-form-item label="" prop="level4Road">
                    <el-input class="form-input"  v-model="formData.level4Road" placeholder="请输入数字" :readonly="readOnly">
                    </el-input>
                  </el-form-item>
                </td>
              </tr>
            </table>
          </el-collapse-item>
        </el-collapse>
        <el-collapse v-model="activeNames">
          <el-collapse-item title="C.建设规模（公里）/（延米）" name="3">
            <table class="form-table" width="100%">
              <colgroup>
                <col width="12%"/>
                <col width="21%"/>
                <col width="12%"/>
                <col width="21%"/>
                <col width="12%"/>
                <col width="22%"/>
              </colgroup>
              <tr>
                <th>合计</th>
                <td>
                  <el-form-item label="" prop="total">
                    <el-input class="form-input" v-model="total" :readonly="true">
                    </el-input>
                  </el-form-item>
                </td>
                <th>高速公路</th>
                <td>
                  <el-form-item label="" prop="highway">
                    <el-input class="form-input" v-model="formData.highway" @blur="totalChange" placeholder="请输入数字" :readonly="readOnly">
                    </el-input>
                  </el-form-item>
                </td>
                <th>一级公路</th>
                <td>
                  <el-form-item label="" prop="grade1Road">
                    <el-input class="form-input" v-model="formData.grade1Road" @blur="totalChange" placeholder="请输入数字" :readonly="readOnly">
                    </el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <th>二级公路</th>
                <td>
                  <el-form-item label="" prop="grade2Road">
                    <el-input class="form-input"  v-model="formData.grade2Road" @blur="totalChange" placeholder="请输入数字" :readonly="readOnly">
                    </el-input>
                  </el-form-item>
                </td>
                <th>三级公路</th>
                <td>
                  <el-form-item label="" prop="grade3Road">
                    <el-input class="form-input" v-model="formData.grade3Road" @blur="totalChange" placeholder="请输入数字" :readonly="readOnly">
                    </el-input>
                  </el-form-item>
                </td>
                <th>四级公路</th>
                <td>
                  <el-form-item label="" prop="grade4Road">
                    <el-input class="form-input"  v-model="formData.grade4Road" @blur="totalChange" placeholder="请输入数字" :readonly="readOnly">
                    </el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <th>独立大桥</th>
                <td>
                  <el-form-item label="" prop="independentBridge">
                    <el-input class="form-input" v-model="formData.independentBridge" @blur="totalChange" placeholder="请输入数字" :readonly="readOnly">
                    </el-input>
                  </el-form-item>
                </td>
                <th>独立隧道</th>
                <td colspan="3">
                  <el-form-item label="" prop="independentTunnel">
                    <el-input class="form-input"  v-model="formData.independentTunnel" @blur="totalChange" placeholder="请输入数字" :readonly="readOnly">
                    </el-input>
                  </el-form-item>
                </td>
              </tr>
            </table>
          </el-collapse-item>
        </el-collapse>
        <el-collapse v-model="activeNames">
          <el-collapse-item title="D.完成投资情况" name="4">
            <table class="form-table" width="100%">
              <colgroup>
                <col width="12%"/>
                <col width="21%"/>
                <col width="12%"/>
                <col width="21%"/>
                <col width="12%"/>
                <col width="22%"/>
              </colgroup>
              <tr>
                <th>{{parseInt(formDataParams.startYear)}}年车购税</th>
                <td>
                  <el-form-item label="" prop="tax1">
                    <el-input class="form-input"v-model="formData.tax1" placeholder="请输入数字" @blur="totalSubsidyChange" :readonly="readOnly"></el-input>
                  </el-form-item>
                </td>
                <th>{{parseInt(formDataParams.startYear)+1}}年车购税</th>
                <td>
                  <el-form-item label="" prop="tax2">
                    <el-input class="form-input"v-model="formData.tax2" placeholder="请输入数字" @blur="totalSubsidyChange" :readonly="readOnly"></el-input>
                  </el-form-item>
                </td>
                <th>{{parseInt(formDataParams.startYear)+2}}年车购税</th>
                <td>
                  <el-form-item label="" prop="tax3">
                    <el-input class="form-input"v-model="formData.tax3" placeholder="请输入数字" @blur="totalSubsidyChange" :readonly="readOnly"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <th>{{parseInt(formDataParams.startYear)+3}}年车购税</th>
                <td>
                  <el-form-item label="" prop="tax4">
                    <el-input class="form-input"v-model="formData.tax4" placeholder="请输入数字" @blur="totalSubsidyChange" :readonly="readOnly"></el-input>
                  </el-form-item>
                </td>
                <th>{{parseInt(formDataParams.startYear)+4}}年车购税</th>
                <td>
                  <el-form-item label="" prop="tax5">
                    <el-input class="form-input"v-model="formData.tax5" placeholder="请输入数字" @blur="totalSubsidyChange" :readonly="readOnly"></el-input>
                  </el-form-item>
                </td>
                <th>已补助资金合计</th>
                <td>
                  <el-form-item label="" prop="totalSubsidyFund">
                    <el-input class="form-input"v-model="totalSubsidyFund" :readonly="true"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <th>已申请车购税比例</th>
                <td>
                  <el-form-item label="" prop="carPurchaseTaxRate">
                    <el-input class="form-input"v-model="carPurchaseTaxRate" :readonly="true"></el-input>
                  </el-form-item>
                </td>
                <th>剩余补助资金</th>
                <td>
                  <el-form-item label="" prop="surplusSubsidyFund">
                    <el-input class="form-input" v-model="surplusSubsidyFund" :readonly="true"></el-input>
                  </el-form-item>
                </td>
                <th>第二批建议</th>
                <td>
                  <el-form-item label="" prop="secondSuggestion">
                    <el-input class="form-input" v-model="formData.secondSuggestion" placeholder="请输入数字" :readonly="readOnly"></el-input>
                  </el-form-item>
                </td>
              </tr>
            </table>
          </el-collapse-item>
        </el-collapse>
        <el-collapse v-model="activeNames">
          <el-collapse-item title="E.投资情况表" name="5">
            <table class="form-table1" width="100%">
              <colgroup>
                <col width="12%"/>
                <col width="88%"/>
              </colgroup>
              <tr>
                <td class="child-table-container">
                  <div class="child-table-wrapper">
                    <child-table
                      title=""
                      relatedTableCode="InvestmentStatusSub"
                      :initDataInfo="investmentStatusSub"
                      @change="investmentStatusSubChange"
                      :readonly="readOnly"
                      :isMinus = "false"
                      :isAdd = "false"
                    ></child-table>
                  </div>
                </td>
              </tr>
            </table>
            <table class="form-table" width="100%">
              <colgroup>
                <col width="12%"/>
                <col width="21%"/>
                <col width="12%"/>
                <col width="21%"/>
                <col width="12%"/>
                <col width="22%"/>
              </colgroup>
              <tr>
                <th>累计完成投资合计</th>
                <td>
                  <el-form-item label="" prop="totalCompletedInvestment">
                    <el-input class="form-input"v-model="formData.totalCompletedInvestment" placeholder="请输入数字" @blur="totalSubsidyChange" :readonly="readOnly"></el-input>
                  </el-form-item>
                </td>
                <th>累计完成投资中央车购税</th>
                <td>
                  <el-form-item label="" prop="completedInvestmentTax">
                    <el-input class="form-input"v-model="formData.completedInvestmentTax" placeholder="请输入数字" :readonly="readOnly"></el-input>
                  </el-form-item>
                </td>
                <th>年底剩余投资</th>
                <td>
                  <el-form-item label="" prop="remainingInvestment">
                    <el-input class="form-input"v-model="remainingInvestment" :readonly="true"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <th>预计完成投资</th>
                <td>
                  <el-form-item label="" prop="expectedInvestment">
                    <el-input class="form-input"v-model="formData.expectedInvestment" placeholder="请输入数字" :readonly="readOnly"></el-input>
                  </el-form-item>
                </td>
                <th>累计完成投资比例</th>
                <td colspan="3">
                  <el-form-item label="" prop="completedInvestmentRate">
                    <el-input class="form-input"v-model="formData.completedInvestmentRate" placeholder="请输入数字" :readonly="readOnly"></el-input>
                  </el-form-item>
                </td>
              </tr>
            </table>
          </el-collapse-item>
        </el-collapse>
        <el-collapse v-model="activeNames">
          <el-collapse-item title="F.建议计划表" name="6">
            <table class="form-table1" width="100%">
              <colgroup>
                <col width="12%"/>
                <col width="88%"/>
              </colgroup>
              <tr>
                <td class="child-table-container">
                  <div class="child-table-wrapper">
                    <child-table
                      title=""
                      relatedTableCode="SuggestedPlanSub"
                      :initDataInfo="suggestedPlanSub"
                      @change="suggestedPlanSubChange"
                      :readonly="readOnly"
                      :deleteUrl="$prifix.plan + '/pm/po/carpurchasetax/removeSub'"
                    ></child-table>
                  </div>
                </td>
              </tr>
            </table>
          </el-collapse-item>
        </el-collapse>
      </el-form>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import rightNavLayout from '@/components/topToolBar';
import { mapGetters } from 'vuex';
import childTable from '@/components/inline-edit-table';
import ztreeSelect from '@/components/ztreeSelect';
export default {
  components: {
    rightNavLayout,
    childTable,
    ztreeSelect
  },
  data ()
  {
    return {
      activeNames: ['1', '2', '3', '4', '5', '6'],
      metaData: {
        investmentStatusSub: [], // 投资情况子表
        suggestedPlanSub: [] // 建议计划子表
      },
      total: 0, // 合计
      cityAndCounty: [], // 市县
      totalSubsidyFund: 0, // 已补助资金合计
      carPurchaseTaxRate: 0, // 已申请车购税比例
      surplusSubsidyFund: 0, // 剩余补助资金
      remainingInvestment: 0 // 年底剩余投资
    };
  },
  methods: {
    investmentStatusSubChange (data)
    {
      this.metaData.investmentStatusSub = data;
    },
    suggestedPlanSubChange (data)
    {
      this.metaData.suggestedPlanSub = data;
    },
    /**
     * 表单提交.
     * @author   yekuncai
     * @date     2019/3/1
     */
    saveFn ()
    {
      this.$confirm('确认保存数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() =>
      {
        this.$refs['ctForm'].validate((valid) =>
        {
          if (valid)
          {
            let obj = this.formData;
            obj.total = this.total;
            obj.cityAndCounty = this.cityAndCounty[0] + '-' + this.cityAndCounty[1];
            obj.totalSubsidyFund = this.totalSubsidyFund;
            obj.carPurchaseTaxRate = this.carPurchaseTaxRate;
            obj.surplusSubsidyFund = this.surplusSubsidyFund;
            obj.remainingInvestment = this.remainingInvestment;
            if (this.metaData.investmentStatusSub !== '')
            {
              let investmentStatusSub = JSON.stringify(this.metaData.investmentStatusSub);
              Object.assign(obj, { investmentStatusSub: investmentStatusSub });
            }
            if (this.metaData.suggestedPlanSub !== '')
            {
              let suggestedPlanSub = JSON.stringify(this.metaData.suggestedPlanSub);
              Object.assign(obj, { suggestedPlanSub: suggestedPlanSub });
            }
            this.$store.dispatch('integrityPlanManagementSystem/_CARPURCHASETAX/save', obj).then(() =>
            {
              this.$store.dispatch('integrityPlanManagementSystem/_CARPURCHASETAX/showList', this.carPurchaseTax);
            });
          }
        });
      });
    },
    /**
     * 返回
     * @author   yekuncai
     * @date     2019/3/1
     */
    returnFn ()
    {
      this.$store.dispatch('integrityPlanManagementSystem/_CARPURCHASETAX/showList', this.carPurchaseTax);
    },
    /**
     * C.建设规模（公里）/（延米）中，合计自动计算.
     * @author   yekuncai
     * @date     2019/4/18
     */
    totalChange ()
    {
      let highway = parseFloat(this.formData.highway);
      let grade1Road = parseFloat(this.formData.grade1Road);
      let grade2Road = parseFloat(this.formData.grade2Road);
      let grade3Road = parseFloat(this.formData.grade3Road);
      let grade4Road = parseFloat(this.formData.grade4Road);
      let independentBridge = parseFloat(this.formData.independentBridge);
      let independentTunnel = parseFloat(this.formData.independentTunnel);
      if (!Number.isFinite(highway))
      {
        highway = 0;
      }
      if (!Number.isFinite(grade1Road))
      {
        grade1Road = 0;
      }
      if (!Number.isFinite(grade2Road))
      {
        grade2Road = 0;
      }
      if (!Number.isFinite(grade3Road))
      {
        grade3Road = 0;
      }
      if (!Number.isFinite(grade4Road))
      {
        grade4Road = 0;
      }
      if (!Number.isFinite(independentBridge))
      {
        independentBridge = 0;
      }
      if (!Number.isFinite(independentTunnel))
      {
        independentTunnel = 0;
      }
      this.total = highway + grade1Road + grade2Road + grade3Road + grade4Road + independentBridge + independentTunnel;
    },
    /**
     * D.完成投资情况中，自动计算项目
     * @author   yekuncai
     * @date     2019/4/18
     */
    totalSubsidyChange ()
    {
      let tax1 = parseFloat(this.formData.tax1);
      let tax2 = parseFloat(this.formData.tax2);
      let tax3 = parseFloat(this.formData.tax3);
      let tax4 = parseFloat(this.formData.tax4);
      let tax5 = parseFloat(this.formData.tax5);
      if (!Number.isFinite(tax1))
      {
        tax1 = 0;
      }
      if (!Number.isFinite(tax2))
      {
        tax2 = 0;
      }
      if (!Number.isFinite(tax3))
      {
        tax3 = 0;
      }
      if (!Number.isFinite(tax4))
      {
        tax4 = 0;
      }
      if (!Number.isFinite(tax5))
      {
        tax5 = 0;
      }
      this.totalSubsidyFund = tax1 + tax2 + tax3 + tax4 + tax5;
      let cptr = (this.totalSubsidyFund / this.formData.centralInvestment) * 100;
      this.carPurchaseTaxRate = parseInt(cptr) + '%';
      this.surplusSubsidyFund = this.formData.centralInvestment - this.totalSubsidyFund;
      this.remainingInvestment = this.formData.totalInvestment - this.formData.totalCompletedInvestment;
    }
  },
  computed: {
    ...mapGetters('integrityPlanManagementSystem/_CARPURCHASETAX', [
      'readOnly',
      'formData',
      'isLoading',
      'navigateMenus',
      'operateBtns',
      'investmentStatusSub',
      'suggestedPlanSub',
      'carPurchaseTax',
      'editParams',
      'formDataParams'
    ])
  },
  watch: {
    editParams: {
      handler ()
      {
        if (this.editParams.cityAndCounty !== undefined)
        {
          this.cityAndCounty = this.editParams.cityAndCounty.split('-');
        }
        if (this.editParams.total !== undefined)
        {
          this.total = this.editParams.total;
        }
        if (this.editParams.totalSubsidyFund !== undefined)
        {
          this.totalSubsidyFund = this.editParams.totalSubsidyFund;
        }
        if (this.editParams.carPurchaseTaxRate !== undefined)
        {
          this.carPurchaseTaxRate = this.editParams.carPurchaseTaxRate;
        }
        if (this.editParams.surplusSubsidyFund !== undefined)
        {
          this.surplusSubsidyFund = this.editParams.surplusSubsidyFund;
        }
        if (this.editParams.remainingInvestment !== undefined)
        {
          this.remainingInvestment = this.editParams.remainingInvestment;
        }
      },
      immediate: true
    }
  }
};
</script>

<style lang="less" scoped>
@import '../../../../common/less/common';
.form-table1 {
  .up-constructor {
    vertical-align: middle;
    border: 1px solid #ddd;
  }
  .down-constructor {
    vertical-align: middle;
    border: 1px solid #ddd;
  }
}
</style>
