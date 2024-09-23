import _ from 'lodash';
import { APIResponse } from '../../types/WorkbenchAPI';

// 判断 object 的 value 是否全为空
const isEmptyObject = (object) => {
  if (_.isEmpty(object)) {
    return false;
  }

  if (object !== null && typeof object === 'object') {
    const values = Object.values(object);
    for (let i = 0; i < values.length; i++) {
      const element = values[i];
      if (element) {
        if (typeof element === 'object') {
          const res = isEmptyObject(element);
          if (!res) {
            return false;
          }
        } else {
          return false;
        }
      } else {
        return false;
      }
    }
  }

  return true;
};
// export const checkFormValueRequired = (treeData: Parameter[], values) => {
//   /**
//    * @param treeDataArr
//    * @param parentPath
//    * @returns
//    */
//   const checkFn = (treeDataArr:Parameter[], parentPath) => {
//     for (let i = 0; i < treeDataArr.length; i++) {
//       const item = treeDataArr[i];
//       const curPath = parentPath ? `${parentPath}.${item.name}` : item.name;
//       const curV = _.get(values, curPath);
//       // @ts-ignore
//       const showName = item.path;

//       // boolean 类型未填为 false, 此处不判断
//       if (item.type !== 'Boolean') {
//         // 判断基本类型
//         let isEmpty = _.isEmpty(curV);

//         if (typeof curV === 'number') {
//           isEmpty = false;
//         }

//         if (item.required && isEmpty && item.type !== 'Array') {
//           message.error(I18N.template(I18N.ide.main.explorer.isRequied, { val1: showName }));
//           return false;
//         }

//         // 判断数组类型
//         if (
//           item.required &&
//           item.type === 'Array' &&
//           ['Boolean', 'String', 'Double', 'Float', 'Integer', 'Long', 'RequestBody'].includes(item.subType)
//         ) {
//           if (Array.isArray(curV) && (curV || [])?.some((v) => !v)) {
//             message.error(I18N.template(I18N.ide.main.explorer.isRequied, { val1: showName }));
//             return false;
//           }
//         }

//         // 如果不存在参数，则按照requestBody不校验
//         if (item.type === 'Object' && item?.params && curV) {
//           // auto_scaling: {type: ""}
//           // 判断 curV 是否为空的
//           // console.log(40, curV, isEmptyObject(curV));
//           if (!(typeof curV === 'object' && isEmptyObject(curV))) {
//             const res = checkFn(item?.params, `${curPath}`);
//             if (!res) {
//               return false;
//             }
//           }
//         }

//         if (item.type === 'Array' && ['Object', 'RepeatList', 'Map'].includes(item.subType) && item?.params?.length) {
//           // 根据 curV 判断是否必填
//           if (Array.isArray(curV)) {
//             const res = curV.every((v, index) => {
//               if (item.subType === 'Object') {
//                 if (!isEmptyObject(v)) {
//                   return checkFn(item?.params, `${curPath}.${index}`);
//                 }
//                 return true;
//               }
//               return checkFn(item?.params, `${curPath}.${index}`);
//             });
//             if (!res) {
//               return false;
//             }
//           }
//         }
//       }
//     }

//     return true;
//   };
//   return checkFn(treeData, '');
// };

export function getIsUploadApi(response: APIResponse | APIResponse[]) {
  return ((_.isArray(response) ? response : response) as any)?.type === 'Binary';
}
