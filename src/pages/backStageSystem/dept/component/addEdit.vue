<template>
  <!-- 模态框 -->
  <transition name="fade">
    <div class="lzy-form-wrapper" v-if="isAddEditShow">
      <right-nav-layout
        :btnList="operateBtns"
        :breadcrumbs="navigateMenus"
      ></right-nav-layout>
      <div class="form-container">
        <el-tabs type="border-card">
          <el-tab-pane label="基本信息">
            <el-form :model="formData" ref="ctForm" v-loading="metaData.loading">
              <table class="form-table" width="100%">
                <colgroup>
                  <col width="12%"/>
                  <col width="38%"/>
                  <col width="12%"/>
                  <col width="38%"/>
                </colgroup>
                <tr>
                  <th>
                    <span style="color: red;">*</span>编码：
                  </th>
                  <td>
                    <el-form-item label="" prop="code"
                    :rules="[$validate.Required]">
                      <el-input class="form-input" v-model="formData.code"></el-input>
                    </el-form-item>
                  </td>
                  <th>
                    <span style="color: red;">*</span>简称：
                  </th>
                  <td>
                    <el-form-item label="" prop="name"
                    :rules="[$validate.Required]">
                      <el-input class="form-input" v-model="formData.name"></el-input>
                    </el-form-item>
                  </td>
                </tr>
                <tr>
                  <th>全称：</th>
                  <td>
                    <el-form-item label="" prop="fullName">
                      <el-input class="form-input" v-model="formData.fullName"></el-input>
                    </el-form-item>
                  </td>
                  <th>负责人：</th>
                  <td>
                    <el-form-item label="" prop="chargeinPersion">
                      <el-input class="form-input" v-model="formData.chargeinPersion"></el-input>
                    </el-form-item>
                  </td>
                </tr>
                <tr>
                  <th>联系人：</th>
                  <td>
                    <el-form-item label="" prop="linkMan">
                      <el-input class="form-input" v-model="formData.linkMan"></el-input>
                    </el-form-item>
                  </td>
                  <th>联系人移动电话：</th>
                  <td>
                    <el-form-item label="" prop="mobile">
                      <el-input class="form-input" v-model="formData.mobile"></el-input>
                    </el-form-item>
                  </td>
                </tr>
                <tr>
                  <th>电话：</th>
                  <td>
                    <el-form-item label="" prop="telephone">
                      <el-input class="form-input" v-model="formData.telephone"></el-input>
                    </el-form-item>
                  </td>
                  <th>传真：</th>
                  <td>
                    <el-form-item label="" prop="fax">
                      <el-input class="form-input" v-model="formData.fax"></el-input>
                    </el-form-item>
                  </td>
                </tr>
                <tr>
                  <th>办公地址：</th>
                  <td>
                    <el-form-item label="" prop="address">
                      <el-input class="form-input" v-model="formData.address"></el-input>
                    </el-form-item>
                  </td>
                  <th>邮政编码：</th>
                  <td>
                    <el-form-item label="" prop="postalCode">
                      <el-input class="form-input" v-model="formData.postalCode"></el-input>
                    </el-form-item>
                  </td>
                </tr>
                <tr>
                  <th>经纬度</th>
                  <td style="position: relative;">
                    <el-form-item label="" prop="coordinate">
                      <!--<el-input class="form-input" v-model="formData.coordinate" :readonly="true"></el-input>-->
                      <lat-lng-position
                        v-model="formData.coordinate"
                        :readonly="readOnly"
                      ></lat-lng-position>
                    </el-form-item>
                  </td>
                </tr>
                <tr>
                  <th>网络地址：</th>
                  <td>
                    <el-form-item label="" prop="netAddress">
                      <el-input class="form-input" v-model="formData.netAddress"></el-input>
                    </el-form-item>
                  </td>
                  <th>邮箱：</th>
                  <td>
                    <el-form-item label="" prop="email">
                      <el-input class="form-input" v-model="formData.email"></el-input>
                    </el-form-item>
                  </td>
                </tr>
                <tr>
                  <th>成立日期：</th>
                  <td>
                    <el-form-item label="" prop="foundDate">
                      <el-date-picker
                        v-model="formData.foundDate"
                        type="date"
                        value-format="yyyy-MM-dd"
                       >
                      </el-date-picker>
                    </el-form-item>
                  </td>
                  <th>部门类型：</th>
                  <td>
                    <el-form-item label="" prop="type">
                      <form-component
                        v-model="formData.type"
                        type="select"
                        dictionaryCode="deptType"
                        @change="handleChange"
                      ></form-component>
                    </el-form-item>
                  </td>
                </tr>
                <tr>
                  <th>备注：</th>
                  <td colspan="3">
                    <el-form-item label="" prop="memo">
                      <el-input
                        type="textarea"
                        class="form-input"
                        rows="3"
                        placeholder="请输入内容"
                        v-model="formData.memo">
                      </el-input>
                    </el-form-item>
                  </td>
                </tr>
                <tr>
                  <th>附件:</th>
                  <td colspan="5" height="190">
                    <uploader v-model="formData.sessionId" accept="image/*">
                    </uploader>
                  </td>
                </tr>
              </table>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="扩展信息">
            <el-form :model="deptExtend" ref="ctForm" v-loading="metaData.loading" v-show="metaData.selected === '子机构'">
              <el-collapse v-model="activeNames">
              <el-collapse-item title="A.管养管理" name="1">
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
                    <th><span style="color: red;">*</span>管养里程(公里)</th>
                    <td>
                      <el-form-item label="" prop="belongMileage">
                        <el-input class="form-input" v-model="deptExtend.belongMileage" :readonly="readOnly"></el-input>
                      </el-form-item>
                    </td>
                    <th><span style="color: red;">*</span>国道(公里)</th>
                    <td>
                      <el-form-item label="" prop="nationalHighway">
                        <el-input class="form-input" v-model="deptExtend.nationalHighway" :readonly="readOnly"></el-input>
                      </el-form-item>
                    </td>
                    <th><span style="color: red;">*</span>省道(公里)</th>
                    <td>
                      <el-form-item label="" prop="provincialHighway">
                        <el-input class="form-input" v-model="deptExtend.provincialHighway" :readonly="readOnly"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <th><span style="color: red;">*</span>县道(公里)</th>
                    <td>
                      <el-form-item label="" prop="countyHighway">
                        <el-input class="form-input" v-model="deptExtend.countyHighway" :readonly="readOnly"></el-input>
                      </el-form-item>
                    </td>
                    <th><span style="color: red;">*</span>乡道(公里)</th>
                    <td>
                      <el-form-item label="" prop="villageRoad">
                        <el-input class="form-input" v-model="deptExtend.villageRoad" :readonly="readOnly"></el-input>
                      </el-form-item>
                    </td>
                    <th><span style="color: red;">*</span>专用线路(公里)</th>
                    <td>
                      <el-form-item label="" prop="privateLine">
                        <el-input class="form-input" v-model="deptExtend.privateLine" :readonly="readOnly"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <th><span style="color: red;">*</span>沥青路面(公里)</th>
                    <td>
                      <el-form-item label="" prop="bitumenRoad">
                        <el-input class="form-input" v-model="deptExtend.bitumenRoad" :readonly="readOnly"></el-input>
                      </el-form-item>
                    </td>
                    <th><span style="color: red;">*</span>简易沥青路面(公里)</th>
                    <td>
                      <el-form-item label="" prop="simpleBitumenRoad">
                        <el-input class="form-input" v-model="deptExtend.simpleBitumenRoad" :readonly="readOnly"></el-input>
                      </el-form-item>
                    </td>
                    <th><span style="color: red;">*</span>砼路面(公里)</th>
                    <td>
                      <el-form-item label="" prop="concreteRoad">
                        <el-input class="form-input" v-model="deptExtend.concreteRoad" :readonly="readOnly"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <th><span style="color: red;">*</span>国道交通流量(辆/昼夜)</th>
                    <td>
                      <el-form-item label="" prop="nationalTrafficFlow">
                        <el-input class="form-input" v-model="deptExtend.nationalTrafficFlow" :readonly="readOnly"></el-input>
                      </el-form-item>
                    </td>
                    <th><span style="color: red;">*</span>省道交通流量(辆/昼夜)</th>
                    <td>
                      <el-form-item label="" prop="provincialTrafficFlow">
                        <el-input class="form-input" v-model="deptExtend.provincialTrafficFlow" :readonly="readOnly"></el-input>
                      </el-form-item>
                    </td>
                    <th><span style="color: red;">*</span>职工(人数)</th>
                    <td>
                      <el-form-item label="" prop="workers">
                        <el-input class="form-input" v-model="deptExtend.workers" :readonly="readOnly"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                </table>
              </el-collapse-item>
              <el-collapse-item title="B.扩展信息详情" name="2">
                <table class="form-table1" width="100%">
                  <tr>
                    <div class="child-table-wrapper">
                      <child-table
                        title="扩展信息详情"
                        relatedTableCode="DeptExtendDetail"
                        :initDataInfo="listDeptExtendDetail"
                        @change="deptExtendDetailChange"
                        :readonly="readOnly"
                        :deleteUrl="$prifix.backstage + '/sys/bs/dept/removeDeptExtendDetail'"
                      ></child-table>
                    </div>
                  </tr>
                </table>
              </el-collapse-item>
              <el-collapse-item title="C.设备管理" name="3">
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
                    <th><span style="color: red;">*</span>养护站(个)</th>
                    <td>
                      <el-form-item label="" prop="maintenanceStation">
                        <el-input class="form-input" v-model="deptExtend.maintenanceStation" :readonly="readOnly"></el-input>
                      </el-form-item>
                    </td>
                    <th><span style="color: red;">*</span>机化站(个)</th>
                    <td>
                      <el-form-item label="" prop="mechanizedStation">
                        <el-input class="form-input" v-model="deptExtend.mechanizedStation" :readonly="readOnly"></el-input>
                      </el-form-item>
                    </td>
                    <th><span style="color: red;">*</span>养护站职工(人数)</th>
                    <td>
                      <el-form-item label="" prop="maintenanceWorkers">
                        <el-input class="form-input" v-model="deptExtend.maintenanceWorkers" :readonly="readOnly"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <th><span style="color: red;">*</span>机化站职工(人数)</th>
                    <td>
                      <el-form-item label="" prop="mechanizedWorkers">
                        <el-input class="form-input" v-model="deptExtend.mechanizedWorkers" :readonly="readOnly"></el-input>
                      </el-form-item>
                    </td>
                    <th><span style="color: red;">*</span>养护机械设备站(套)</th>
                    <td>
                      <el-form-item label="" prop="maintenanceEquipment">
                        <el-input class="form-input" v-model="deptExtend.maintenanceEquipment" :readonly="readOnly"></el-input>
                      </el-form-item>
                    </td>
                    <th><span style="color: red;">*</span>拌和机(台)</th>
                    <td>
                      <el-form-item label="" prop="mixingMachine">
                        <el-input class="form-input" v-model="deptExtend.mixingMachine" :readonly="readOnly"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <th><span style="color: red;">*</span>沥青储罐(个)</th>
                    <td>
                      <el-form-item label="" prop="bitumenStorage">
                        <el-input class="form-input" v-model="deptExtend.bitumenStorage" :readonly="readOnly"></el-input>
                      </el-form-item>
                    </td>
                    <th><span style="color: red;">*</span>运料车(台)</th>
                    <td>
                      <el-form-item label="" prop="loadingTruck">
                        <el-input class="form-input" v-model="deptExtend.loadingTruck" :readonly="readOnly"></el-input>
                      </el-form-item>
                    </td>
                    <th><span style="color: red;">*</span>压路机(台)</th>
                    <td>
                      <el-form-item label="" prop="roller">
                        <el-input class="form-input" v-model="deptExtend.roller" :readonly="readOnly"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <th><span style="color: red;">*</span>清扫车(台)</th>
                    <td>
                      <el-form-item label="" prop="sweepCart">
                        <el-input class="form-input" v-model="deptExtend.sweepCart" :readonly="readOnly"></el-input>
                      </el-form-item>
                    </td>
                    <th><span style="color: red;">*</span>装载机(台)</th>
                    <td>
                      <el-form-item label="" prop="loader">
                        <el-input class="form-input" v-model="deptExtend.loader" :readonly="readOnly"></el-input>
                      </el-form-item>
                    </td>
                    <th><span style="color: red;">*</span>铣刨机(台)</th>
                    <td>
                      <el-form-item label="" prop="millingMachine">
                        <el-input class="form-input" v-model="deptExtend.millingMachine" :readonly="readOnly"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <th><span style="color: red;">*</span>高压清洗机(台) </th>
                    <td>
                      <el-form-item label="" prop="highPressureWasher">
                        <el-input class="form-input" v-model="deptExtend.highPressureWasher" :readonly="readOnly"></el-input>
                      </el-form-item>
                    </td>
                    <th><span style="color: red;">*</span>移动照明设备(台)</th>
                    <td>
                      <el-form-item label="" prop="mobileLightingEquipment">
                        <el-input class="form-input" v-model="deptExtend.mobileLightingEquipment" :readonly="readOnly"></el-input>
                      </el-form-item>
                    </td>
                    <th><span style="color: red;">*</span>变压器(台)</th>
                    <td>
                      <el-form-item label="" prop="transformer">
                        <el-input class="form-input" v-model="deptExtend.transformer" :readonly="readOnly"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <th><span style="color: red;">*</span>发电机组(台)</th>
                    <td>
                      <el-form-item label="" prop="generatorSet">
                        <el-input class="form-input" v-model="deptExtend.generatorSet" :readonly="readOnly"></el-input>
                      </el-form-item>
                    </td>
                    <th><span style="color: red;">*</span>切割机(台)</th>
                    <td>
                      <el-form-item label="" prop="cuttingMachine">
                        <el-input class="form-input" v-model="deptExtend.cuttingMachine" :readonly="readOnly"></el-input>
                      </el-form-item>
                    </td>
                    <th><span style="color: red;">*</span>冲击夯(台)</th>
                    <td>
                      <el-form-item label="" prop="impactRammer">
                        <el-input class="form-input" v-model="deptExtend.impactRammer" :readonly="readOnly"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <th><span style="color: red;">*</span>平板夯(台)</th>
                    <td>
                      <el-form-item label="" prop="plateCompactor">
                        <el-input class="form-input" v-model="deptExtend.plateCompactor" :readonly="readOnly"></el-input>
                      </el-form-item>
                    </td>
                    <th><span style="color: red;">*</span>沥青路面加热修补机(台)</th>
                    <td>
                      <el-form-item label="" prop="bitumenRoadHeatRepairMachine">
                        <el-input class="form-input" v-model="deptExtend.bitumenRoadHeatRepairMachine" :readonly="readOnly"></el-input>
                      </el-form-item>
                    </td>
                    <th><span style="color: red;">*</span>割灌机(台)</th>
                    <td>
                      <el-form-item label="" prop="brushCutter">
                        <el-input class="form-input" v-model="deptExtend.brushCutter" :readonly="readOnly"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <th><span style="color: red;">*</span>灌缝机(台)</th>
                    <td>
                      <el-form-item label="" prop="seamingMechine">
                        <el-input class="form-input" v-model="deptExtend.seamingMechine" :readonly="readOnly"></el-input>
                      </el-form-item>
                    </td>
                    <th><span style="color: red;">*</span>其他设备(台)</th>
                    <td>
                      <el-form-item label="" prop="otherMenchine">
                        <el-input class="form-input" v-model="deptExtend.otherMenchine" :readonly="readOnly"></el-input>
                      </el-form-item>
                    </td>
                    <th></th>
                    <td>
                    </td>
                  </tr>
                </table>
              </el-collapse-item>
            </el-collapse>
            </el-form>
            <el-form :model="deptExtend" ref="ctForm" v-loading="metaData.loading" v-show="metaData.selected === '内设机构'">
              <el-collapse v-model="activeNames">
                <el-collapse-item title="A.养护管理" name="4">
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
                      <th><span style="color: red;">*</span>养护里程(公里)</th>
                      <td>
                        <el-form-item label="" prop="maintenanceMileage">
                          <el-input class="form-input" v-model="deptExtend.maintenanceMileage" :readonly="readOnly"></el-input>
                        </el-form-item>
                      </td>
                      <th><span style="color: red;">*</span>国道(公里)</th>
                      <td>
                        <el-form-item label="" prop="mnationalHighway">
                          <el-input class="form-input" v-model="deptExtend.mnationalHighway" :readonly="readOnly"></el-input>
                        </el-form-item>
                      </td>
                      <th><span style="color: red;">*</span>省道(公里)</th>
                      <td>
                        <el-form-item label="" prop="mprovincialHighway">
                          <el-input class="form-input" v-model="deptExtend.mprovincialHighway" :readonly="readOnly"></el-input>
                        </el-form-item>
                      </td>
                    </tr>
                    <tr>
                      <th><span style="color: red;">*</span>砼路面(公里)</th>
                      <td>
                        <el-form-item label="" prop="mconcreteRoad">
                          <el-input class="form-input" v-model="deptExtend.mconcreteRoad" :readonly="readOnly"></el-input>
                        </el-form-item>
                      </td>
                      <th><span style="color: red;">*</span>沥青路面(公里)</th>
                      <td>
                        <el-form-item label="" prop="mbitumenRoad">
                          <el-input class="form-input" v-model="deptExtend.mbitumenRoad" :readonly="readOnly"></el-input>
                        </el-form-item>
                      </td>
                      <th><span style="color: red;">*</span>简易沥青路面(公里)</th>
                      <td>
                        <el-form-item label="" prop="msimpleBitumenRoad">
                          <el-input class="form-input" v-model="deptExtend.msimpleBitumenRoad" :readonly="readOnly"></el-input>
                        </el-form-item>
                      </td>
                    </tr>
                  </table>
                </el-collapse-item>
                <el-collapse-item title="B.职工管理" name="5">
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
                      <th><span style="color: red;">*</span>职工(人数)</th>
                      <td>
                        <el-form-item label="" prop="mworkers">
                          <el-input class="form-input" v-model="deptExtend.mworkers" :readonly="readOnly"></el-input>
                        </el-form-item>
                      </td>
                      <th><span style="color: red;">*</span>男职工(人数)</th>
                      <td>
                        <el-form-item label="" prop="manWorkers">
                          <el-input class="form-input" v-model="deptExtend.manWorkers" :readonly="readOnly"></el-input>
                        </el-form-item>
                      </td>
                      <th><span style="color: red;">*</span>女职工(人数)</th>
                      <td>
                        <el-form-item label="" prop="womanWorkers">
                          <el-input class="form-input" v-model="deptExtend.womanWorkers" :readonly="readOnly"></el-input>
                        </el-form-item>
                      </td>
                    </tr>
                    <tr>
                      <th><span style="color: red;">*</span>党员(人数)</th>
                      <td>
                        <el-form-item label="" prop="commie">
                          <el-input class="form-input" v-model="deptExtend.commie" :readonly="readOnly"></el-input>
                        </el-form-item>
                      </td>
                      <th><span style="color: red;">*</span>团员(人数)</th>
                      <td>
                        <el-form-item label="" prop="leagueMember">
                          <el-input class="form-input" v-model="deptExtend.leagueMember" :readonly="readOnly"></el-input>
                        </el-form-item>
                      </td>
                      <th><span style="color: red;">*</span>技师(人数)</th>
                      <td>
                        <el-form-item label="" prop="technician">
                          <el-input class="form-input" v-model="deptExtend.technician" :readonly="readOnly"></el-input>
                        </el-form-item>
                      </td>
                    </tr>
                    <tr>
                      <th><span style="color: red;">*</span>高级工(人数)</th>
                      <td>
                        <el-form-item label="" prop="seniorWorkers">
                          <el-input class="form-input" v-model="deptExtend.seniorWorkers" :readonly="readOnly"></el-input>
                        </el-form-item>
                      </td>
                      <th><span style="color: red;">*</span>中级工(人数)</th>
                      <td>
                        <el-form-item label="" prop="lowLevelWorkers">
                          <el-input class="form-input" v-model="deptExtend.lowLevelWorkers" :readonly="readOnly"></el-input>
                        </el-form-item>
                      </td>
                      <th><span style="color: red;">*</span>低级工(人数)</th>
                      <td>
                        <el-form-item label="" prop="intermediateWorkers">
                          <el-input class="form-input" v-model="deptExtend.intermediateWorkers" :readonly="readOnly"></el-input>
                        </el-form-item>
                      </td>
                    </tr>
                    <tr>
                      <th><span style="color: red;">*</span>初中文化(人数)</th>
                      <td>
                        <el-form-item label="" prop="juniorHighSchoolCulture">
                          <el-input class="form-input" v-model="deptExtend.juniorHighSchoolCulture" :readonly="readOnly"></el-input>
                        </el-form-item>
                      </td>
                      <th><span style="color: red;">*</span>高中文化(人数)</th>
                      <td>
                        <el-form-item label="" prop="highSchoolCulture">
                          <el-input class="form-input" v-model="deptExtend.highSchoolCulture" :readonly="readOnly"></el-input>
                        </el-form-item>
                      </td>
                      <th><span style="color: red;">*</span>大专以上文化 (人数)</th>
                      <td>
                        <el-form-item label="" prop="juniorCollegeCultureAbove">
                          <el-input class="form-input" v-model="deptExtend.juniorCollegeCultureAbove" :readonly="readOnly"></el-input>
                        </el-form-item>
                      </td>
                    </tr>
                    <tr>
                      <th><span style="color: red;">*</span>35岁以下 (人数)</th>
                      <td>
                        <el-form-item label="" prop="underThirtyFive">
                          <el-input class="form-input" v-model="deptExtend.underThirtyFive" :readonly="readOnly"></el-input>
                        </el-form-item>
                      </td>
                      <th><span style="color: red;">*</span>35岁以上 (人数)</th>
                      <td>
                        <el-form-item label="" prop="overThirtyFive">
                          <el-input class="form-input" v-model="deptExtend.overThirtyFive" :readonly="readOnly"></el-input>
                        </el-form-item>
                      </td>
                      <th></th>
                      <td>
                      </td>
                    </tr>
                  </table>
                </el-collapse-item>
                <el-collapse-item title="C.设备管理" name="6">
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
                      <th><span style="color: red;">*</span>养护机械设备站(套)</th>
                      <td>
                        <el-form-item label="" prop="mmaintenanceEquipment">
                          <el-input class="form-input" v-model="deptExtend.mmaintenanceEquipment" :readonly="readOnly"></el-input>
                        </el-form-item>
                      </td>
                      <th><span style="color: red;">*</span>运料车(台)</th>
                      <td>
                        <el-form-item label="" prop="mloadingTruck">
                          <el-input class="form-input" v-model="deptExtend.mloadingTruck" :readonly="readOnly"></el-input>
                        </el-form-item>
                      </td>
                      <th><span style="color: red;">*</span>灌缝机(台)</th>
                      <td>
                        <el-form-item label="" prop="mseamingMechine">
                          <el-input class="form-input" v-model="deptExtend.mseamingMechine" :readonly="readOnly"></el-input>
                        </el-form-item>
                      </td>
                    </tr>
                    <tr>
                      <th><span style="color: red;">*</span>液压动力站 </th>
                      <td>
                        <el-form-item label="" prop="hydraulicPowerStation">
                          <el-input class="form-input" v-model="deptExtend.hydraulicPowerStation" :readonly="readOnly"></el-input>
                        </el-form-item>
                      </td>
                      <th><span style="color: red;">*</span>冲击夯(台)</th>
                      <td>
                        <el-form-item label="" prop="mimpactRammer">
                          <el-input class="form-input" v-model="deptExtend.mimpactRammer" :readonly="readOnly"></el-input>
                        </el-form-item>
                      </td>
                      <th><span style="color: red;">*</span>手扶式单钢轮压路机 (台)</th>
                      <td>
                        <el-form-item label="" prop="handSteelRoller">
                          <el-input class="form-input" v-model="deptExtend.handSteelRoller" :readonly="readOnly"></el-input>
                        </el-form-item>
                      </td>
                    </tr>
                    <tr>
                      <th><span style="color: red;">*</span>平板夯(台)</th>
                      <td>
                        <el-form-item label="" prop="mplateCompactor">
                          <el-input class="form-input" v-model="deptExtend.mplateCompactor" :readonly="readOnly"></el-input>
                        </el-form-item>
                      </td>
                      <th><span style="color: red;">*</span>道路清洗机(台)</th>
                      <td>
                        <el-form-item label="" prop="msweepCar">
                          <el-input class="form-input" v-model="deptExtend.msweepCar" :readonly="readOnly"></el-input>
                        </el-form-item>
                      </td>
                      <th><span style="color: red;">*</span>割灌机(台)</th>
                      <td>
                        <el-form-item label="" prop="mbrushCutter">
                          <el-input class="form-input" v-model="deptExtend.mbrushCutter" :readonly="readOnly"></el-input>
                        </el-form-item>
                      </td>
                    </tr>
                    <tr>
                      <th><span style="color: red;">*</span>切割机(台)</th>
                      <td>
                        <el-form-item label="" prop="mcuttingMachine">
                          <el-input class="form-input" v-model="deptExtend.mcuttingMachine" :readonly="readOnly"></el-input>
                        </el-form-item>
                      </td>
                      <th><span style="color: red;">*</span>养护站占地面积(平方米)</th>
                      <td>
                        <el-form-item label="" prop="maintenanceStationArea">
                          <el-input class="form-input" v-model="deptExtend.maintenanceStationArea" :readonly="readOnly"></el-input>
                        </el-form-item>
                      </td>
                      <th><span style="color: red;">*</span>房屋建筑面积(平方米)</th>
                      <td>
                        <el-form-item label="" prop="bulidingArea">
                          <el-input class="form-input" v-model="deptExtend.bulidingArea" :readonly="readOnly"></el-input>
                        </el-form-item>
                      </td>
                    </tr>
                  </table>
                </el-collapse-item>
              </el-collapse>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex';
import rightNavLayout from '@/components/topToolBar';
import formComponent from '@/components/formComponent';
import latLngPosition from '@/components/latLngPosition';
import childTable from '@/components/inline-edit-table';
import uploader from '@/components/uploader';
export default {
  components: {
    rightNavLayout,
    formComponent,
    uploader,
    latLngPosition,
    childTable
  },
  data ()
  {
    return {
      activeNames: ['1', '2', '3', '4', '5', '6'],
      metaData: {
        loading: false,
        deptExtendDetail: [],
        selected: ''
      }
    };
  },
  watch:
  {
    formData: {
      handler (newValue, oldValue)
      {
        if (newValue)
        {
          this.metaData.selected = this.formData.type;
        }
      },
      immediate: true
    }
  },
  methods: {
    /**
     * 根据类型 切换对应的扩展信息
     * @author   gongjuncheng
     * @date     2019/4/14
     */
    handleChange (temp)
    {
      this.metaData.selected = temp;
    },
    deptExtendDetailChange (data)
    {
      this.metaData.deptExtendDetail = data;
    },
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
            let obj = {};
            let deptExtendDetailString = JSON.stringify(this.metaData.deptExtendDetail);
            let deptExtendString = JSON.stringify([this.deptExtend]);
            Object.assign(obj, this.formData, {deptExtend: deptExtendString}, {deptExtendDetail: deptExtendDetailString});
            this.loading = true;
            this.$store.dispatch('backStageSystem/_DEPT/save', obj);
          }
          else
          {
            this.$message('数据填写格式有误!');
            return false;
          }
        });
      });
    }
  },
  computed: {
    ...mapGetters('backStageSystem/_DEPT', [
      'formData',
      'readOnly',
      'isAddEditShow',
      'navigateMenus',
      'operateBtns',
      'deptExtend',
      'listDeptExtendDetail'
    ])
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
