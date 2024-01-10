/**
 * @author yini-chen
 * @description Map
 */
import * as React from "react";
import * as _ from "lodash";
import { AlicloudUISchema, ErrorField, MapProps } from "../types";
import { FormStoreContext } from "../../../../SemixFormRender/context";

export class RenderMapProps {
  dataPath = "";
  schema = {} as AlicloudUISchema;
  errorFields = [] as ErrorField[];
  fieldName: string;
  renderTitle?: Function;
}

export const RenderMap: React.FC<RenderMapProps> = (props) => {
  const { formData, onItemChange, widgets, errorFields } = FormStoreContext.useContainer();

  const typeOfValue = props?.schema?.additionalProperties?.type || 'string'

  const InitValue = {
    string: "",
    number: 0,
    object: {},
    array: [],
    boolean: false,
    integer: 0,
    map: {},
    $ref: {},
    any:""
  }

  const MapUI = widgets["simpleMap"];

  const [mapData, setMapData] = React.useState({ "": InitValue[typeOfValue] || "" } as { [key: string]: any });
  const [displayList, setDisplayList] = React.useState([{ key: "", value: InitValue[typeOfValue] || "" } as { key: string; value: any }]);

  React.useEffect(() => {
    if (_.get(formData, props.dataPath) !== mapData) {
      setMapData(_.get(formData, props.dataPath));
    }
  }, [_.get(formData, props.dataPath)]);

  React.useEffect(() => {
    const uiList =
      typeof mapData === "object" && Object.keys(mapData).length
        ? Object.keys(mapData).map((key) => {
            return { key, value: mapData[key] };
          })
        : [{ key: "", value: "" as any } as { key: string; value: any }];
    if (!_.isEqual(uiList, displayList)) {
      setDisplayList(uiList);
    }
  }, [mapData]);

  const addItem = () => {
    const newItem = InitValue[typeOfValue] || "";
    const newList = [...displayList, { key: "", value: newItem }];
    setDisplayList([...newList]);
    const newIndex = newList.length - 1;
    return newIndex;
  };

  const copyItem = (index: number) => {
    const newItem = {
      key: displayList[index].key + "-copy",
      value: displayList[index].value,
    };
    const newList = [...displayList.slice(0, index), newItem, ...displayList.slice(index)];
    setDisplayList([...newList]);
  };

  const editItemKey = (index: number, newKey: string) => {
    const tempList = displayList;
    tempList[index].key = newKey;
    setDisplayList([...tempList]);
    calculateValue();
  };

  const calculateValue = React.useCallback(() => {
    const resultValue = {} as { [key: string]: any };
    displayList.map((item) => {
      resultValue[item.key] = item.value;
    });
    onItemChange(props.dataPath, resultValue);
    setMapData(resultValue);
  }, [displayList]);

  const deleteItem = (index: number) => {
    // 删除元素的时候，也需要delete相对于的校验信息（errorFields）
    const newErrors = errorFields.filter((error) => {
      return error.dataPath !== props.dataPath + "." + displayList[index].key;
    });
    // setErrorFields(newErrors);
    const newList = displayList.filter((item, kdx) => kdx !== index);
    setDisplayList(newList);
  };

  React.useEffect(() => {
    calculateValue();
  }, [displayList]);

  const mapProps = {
    editItemKey,
    addItem,
    copyItem,
    deleteItem,
    errorFields: props.errorFields,
    dataPath: props.dataPath,
    schema: props.schema?.additionalProperties,
    displayList,
    fieldName: props.fieldName,
    renderTitle: props.renderTitle || null,
  } as MapProps;

  return <MapUI {...mapProps} />;
};

RenderMap.defaultProps = new RenderMapProps();
