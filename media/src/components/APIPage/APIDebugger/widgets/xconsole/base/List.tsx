/**
 * @author
 * @description 列表
 */
import * as _ from 'lodash';
import * as React from 'react';
import { SemixJsonSchema } from 'semix-core';
import { ErrorField } from '../../types';
import { FormStoreContext } from '../../../../../SemixFormRender/context';
import { ListProps } from '../../../../../SemixFormRender';
// import { FormStoreContext, ListProps } from 'semix-form-render';

export class RenderListProps {
  dataPath = '';
  schema = {} as SemixJsonSchema;
  errorFields = [] as ErrorField[];
  fieldName: string;
  renderTitle?: (props) => void;
  schemaPath? = '';
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function getSchemaDefaultValue(schema: SemixJsonSchema) {
  switch (schema.type) {
    case 'object': {
      // if (schema.properties) {
      //   return mapObject(schema.properties, (property: SemixJsonSchema, key) => {
      //     return getSchemaDefaultValue(property);
      //   });
      // }

      return {};
    }
    case 'array': {
      // if (schema.items) {
      //   return [];
      // }
      return [];
    }
  }

  return undefined;
}

export const RenderList: React.FC<RenderListProps> = (props) => {
  const { formData, onItemChange, widgets, errorFields } = FormStoreContext.useContainer();

  const customWidget = props.schema?.customWidget || 'simpleList';

  const ListUI = widgets[customWidget] || widgets['simpleList'];

  let listData = _.get(formData, props.dataPath);
  const displayList = Array.isArray(listData) && listData.length ? listData : [""];

  const addItem = (): number => {
    const newItem = props.schema.items ? getSchemaDefaultValue(props.schema.items) || '' : '';
    const newList = [...displayList, newItem];
    const newIndex = newList.length - 1;
    onItemChange(props.dataPath, newList);
    return newIndex;
  };

  const changeItemValue = (value, index): void => {
    let newList = [...displayList];
    if (index === displayList?.length) {
      newList.push(value);
    } else {
      newList[index] = value;
    }
    onItemChange(props.dataPath, newList);
  };

  const copyItem = (index: number): void => {
    const newItem = displayList[index];
    const newList = [...displayList.slice(0, index), newItem, ...displayList.slice(index)];
    onItemChange(props.dataPath, newList);
  };

  const deleteItem = (index: number): void => {
    // 删除元素的时候，也需要delete相对于的校验信息（errorFields）
    const newErrors = errorFields.filter((error) => {
      return !error.dataPath.includes(props.dataPath + '.' + index);
    });
    // setErrorFields(newErrors);
    const newList = displayList.filter((item, kdx) => kdx !== index);
    onItemChange(props.dataPath, newList);
  };

  const listProps = {
    addItem,
    copyItem,
    deleteItem,
    errorFields: props.errorFields,
    dataPath: props.dataPath,
    schemaPath: props.schemaPath,
    schema: props.schema?.items,
    displayList,
    fieldName: props.fieldName,
    renderTitle: props.renderTitle || null,
    parentSchema: props.schema,
    /**
     * 根据index改变对应值
     */
    changeItemValue,
    /**
     * 改变当前dataPath的值
     */
    onChange: onItemChange,
    formData: formData || {},
  } as unknown as ListProps;
  // return <>ddd</>;

  return <ListUI {...listProps} />;
};

RenderList.defaultProps = new RenderListProps();

export default RenderList;
