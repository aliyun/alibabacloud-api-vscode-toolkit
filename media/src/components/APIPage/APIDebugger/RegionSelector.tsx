/**
* @author yini-chen
* @description 
*/
import React from 'react'
import { Select } from "@alicloud/console-components";
import _ from "lodash";
import I18N from '../../../utils/I18N';

export class RegionSelectorProps {
  regionId: string;
  setRegionId: (endpoint: string) => void;
  product: string;
  endpoints: any[];
}

export const RegionSelector: React.FC<RegionSelectorProps> = (props) => { 

    const dataSource = React.useMemo(() => {
        if (props.endpoints.length) {
          const areaGroups = _.groupBy(props.endpoints, "areaId");
          const areaGroupsOrder = ["asiaPacific", "europeAmerica", "middleEast", "industryCloud"];
          return areaGroupsOrder?.map((area) => {
            return {
              label: areaGroups[area]?.[0]?.areaName,
              children: areaGroups[area]?.map((endpoint) => {
                return {
                  label: endpoint.regionName,
                  key: endpoint.regionId,
                  value: endpoint.regionId,
                };
              }),
            };
          });
        }
        return []
      }, [props.endpoints]);
    
      return (
        <div className="endpoint-selector">
          <div className="endpoint-selector-title">{I18N.main.explorer.endPoint}</div>
          <Select
            style={{ width: "calc(100% - 13px)" }}
            value={props.regionId?.length ? props.regionId : "cn-hangzhou"}
            onChange={props.setRegionId}
            dataSource={dataSource}
          ></Select>
        </div>
      );

}
RegionSelector.defaultProps = new RegionSelectorProps();
export default RegionSelector;