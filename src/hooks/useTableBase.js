import { ref, nextTick } from 'vue'
import { bitable } from '@lark-base-open/js-sdk';
import { confirmImgDown } from '@/api/api.js'
import { urltoBlob } from 'image-conversion' 

const FieldType = {
  Text: 1, // 多行文本
  Number: 2, // 数字
  SingleSelect: 3, // 单选
  MultiSelect: 4, // 多选
  DateTime: 5, // 日期
  Checkbox: 7, // 复选框
  User: 11, // 人员
  Phone: 13, // 电话
  Url: 15, // 超链接
  Attachment: 17, // 附件
  SingleLink: 18, // 单向关联
  Lookup: 19, // 查找引用
  Formula: 20, // 公式
  DuplexLink: 21, // 双向关联
  Location: 22, // 地理位置
  GroupChat: 23, // 群聊
  CreatedTime: 1001, // 创建时间
  ModifiedTime: 1002, // 修改时间
  CreatedUser: 1003, // 创建人
  ModifiedUser: 1004, // 修改人
  AutoNumber: 1005, // 自动编号
  Barcode: 99001, // 二维码
  Progress: 99002, // 进度条
  Currency: 99003, // 货币
  Rating: 99004, // 评分
  Email: 99005 // 邮箱
};

const getFile = (dataurl, filename) => {
  //将base64转换为文件
  return new Promise((resolve, reject) => {
    fetch(dataurl)
    .then(Response => Response.blob())
    .then(res => 
      resolve(res)
    )
  })
}

const dataURLtoFile = (dataurl, filename) =>{
  //将base64转换为文件
  var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
  while(n--){
      u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, {type:mime});
}

const loading = ref(false)
const tableInstance = null // table 实例
const tableInfo = ref(null) // 获取基本信息
const sheetList = ref([]) // 表格sheet数据
const tableName = ref('') // 表格名称
const fieldList = ref([]) // 表格字段
const recordList = ref([]) // 表格数据
const tenantKey = ref('') // 租户key
const userId = ref('') // 用户id 创建人
const tableData =ref([]) // 表格数据
const pageToken = ref(null) // 分页token


const base = bitable.base;
const baseUi = bitable.ui;
const bridge = bitable.bridge;

// 数据变化
// base.onTableAdd((event) => {
//   console.log(event)
// })
// 获取表格实例
const getTableInstance = (tableId) => {
  if(tableInstance) return Promise.resolve(tableInstance)
  else return base.getTable(tableId)
}
// 设置表格信息
const setTableInfo = async(selection) => {
    tableInfo.value = selection
    // 获取表格实例
    const table = await getTableInstance(selection.tableId)
    // 获取当前多维表格下所有的数据表
    getTableName(selection.tableId)
    getTableSheetList(selection.tableId)
    getTableFieldList(selection.tableId)
    // 获取当前多维表格下所有的数据表
    getCellList(selection.tableId)
    getTenantKey()
    getUserId()
    // 上传附件
    // addImgField(selection.tableId,'1840262218240450562')
    // 监听 field 变化
    table.onFieldAdd((event) => {
      console.log('table:', event);
      getTableFieldList(selection.tableId)
      getCellList(selection.tableId)
    })
     table.onFieldDelete((event) => {
      console.log('table:', event);
      getTableFieldList(selection.tableId)
      getCellList(selection.tableId)
    })
    // 监听数据变化
    bitable.base.onSelectionChange((event) => {
      console.log('event:', event);
      nextTick(() => {    
        tableData.value = []
        getTableName(selection.tableId)
        getTableSheetList(selection.tableId)
        getTableFieldList(selection.tableId)
        getCellList(selection.tableId)
      })
    })
}
// 获取当前多维表格下所有的数据表
const getTableSheetList = async (tableId) => {
  const table = await getTableInstance(tableId);
  const sheetListArr = await table.getViewMetaList();
  sheetListArr.map(item => {
    item.label = item.name
    item.value = item.id
    return item
  })
  sheetList.value = sheetListArr
  // 第一个视图不是数据表，切换视图
  if(sheetListArr.length && sheetListArr[0].type!= 1){
    const findTableData = sheetListArr.find(item => item.type == 1)
    const viewId =  findTableData[0].id
    await baseUi.switchToView(tableId, viewId);
  }
}
// 获取当前表格名称
const getTableName = async (tableId) => {
    const table = await getTableInstance(tableId);
    const name = await table.getName()
    tableName.value = name
}
// 获取表格字段列表
const getTableFieldList = async (tableId) => {
  const table = await getTableInstance(tableId);
  const fieldListData = await table.getFieldMetaList();
  fieldList.value = fieldListData.map(item => {
      item.label = item.name
      item.value = item.id
      return item
  })
}
// const getTalbeList = async (tableId) => {
//     const table = await base.getTable(tableId);
// }

// 获取表格数据
const getCellList = async (tableId) => {
  if(loading.value) return
  loading.value = true
  // const table = await getTableInstance(tableId)
  const table = await base.getActiveTable();
  // 获取所有记录 id 列表。
  let params = {
    pageSize: 4,
  }
  if(pageToken.value) {
    params.pageToken = pageToken.value
  }
  const data = await table.getRecords(params);
  // 分页参数
  loading.value = false
  if(data.pageToken) {
    pageToken.value = data.pageToken
    setTimeout(() => {
      getCellList(tableId)
    }, 1000);
  } else {
    pageToken.value = null
  }
  tableData.value = tableData.value.concat(data.records)
}

// 获取附件地址
// const getAttachmentUrl = async (tableId) => {
//     const table = await base.getTable(tableId);
//     const attachment = await table.getCellAttachmentUrls([]);
//     const url = await attachment.getUrl();
//     return url
// }

const getTenantKey = async () => {
  const Id = await bitable.bridge.getTenantKey();
  tenantKey.value = Id
}

const getUserId = async () => {
  const Id = await bitable.bridge.getUserId();
  userId.value = Id
}
// 新增字段
const addField = async (tableId, content) => {
  // const result = await getFile('https://uat.yygongzi.com/salary/wx/pc/Payroll/img/bg_1.32906926.png')
  // console.log(result)
  const setRecords = []
  const table = await getTableInstance(tableId);
  // 创建字段~获取字段 id
  const fieldId = await table.addField({type: FieldType.Url});
  // 通过字段 id 获取字段实例
  const field = await table.getField(fieldId);
  console.log(field)
  // 获取所有列
  const recordIdList = await table.getRecordIdList();

  recordIdList.forEach(item => {
    setRecords.push({
      recordId: item,
      fields: {
        [field.id]: content+item
      }
    })
  })
  // 批量赋值
  await table.setRecords(setRecords)
}

// 新增附件字段
const addImgField = async (tableId, confirmId) => {
  const base64String = await confirmImgDown({confirm_id: confirmId})
  // console.log(base64String)
  // const blob = new Blob([base64String], { type: "image/jpeg" });
  // var byteCharacters = atob(base64String);
  // var byteNumbers = new Array(byteCharacters.length);
  // for (var i = 0; i < byteCharacters.length; i++) {
  //   byteNumbers[i] = byteCharacters.charCodeAt(i);
  // }
  // var byteArray = new Uint8Array(byteNumbers);
  // var blob = new Blob([byteArray], { type: "image/jpeg" });
  // console.log(blob)
  const result = await urltoBlob('https://dev.yygongzi.com/gw/feishuapi/bitable/confirm/qrcode/1840262218240450562', 'imgage.png')
  const file = new File([result], 'imgage.png', { type: 'image/png'});
  console.log(file)
  


  const setRecords = []
  const table = await getTableInstance(tableId);
  console.log(table)
  // // 创建字段~获取字段 id
  const fieldId = await table.addField({type: FieldType.Attachment});
  // 通过字段 id 获取字段实例
  const field = await table.getField(fieldId);
  console.log(field)
  // 获取所有列
  const recordIdList = await table.getRecordIdList();

  recordIdList.forEach(item => {
    setRecords.push({
      recordId: item,
      fields: {
        [field.id]: file
      }
    })
  })
 // 批量赋值
  await table.setRecords(setRecords)
}
export default function useTableBase() {
    return {
        userId,
        tableInfo,
        tableName,
        sheetList,
        fieldList,
        recordList,
        tenantKey,
        tableData,
        getTableSheetList,
        setTableInfo,
        addField
    }

}

    