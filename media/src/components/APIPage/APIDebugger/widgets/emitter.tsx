/**
 * 一个 EventEmitter 实例
 *
 * @author 奇阳
 * @description
 */
import * as EventEmitter from "events";
import { ErrorObject } from "semix-validate";

/**
 * 定义每一个事件的名称及回调参数类型
 */
class EventTypes {
  openAssistant: { href: string; pageType: string };
  scrollToRowKeys: { rowKeys: string[]; tableType: string };
  /** 关闭某一个 tab, tabId */
  // todo any : AmpWorkspaceTabPane
  closeTab: any;

  // todo any : AmpWorkspaceTabPane
  openTab: any;

  // todo any : AmpWorkspaceTabPane
  openTabConflict: any;

  // todo any : AmpWorkspaceTabPane
  addTabPane: any;

  refreshResource: { branchId: number };

  /** 刷新 API */
  refreshAPIEntities: void;

  /** 切换 Tab */
  switchResourceAPITab: { activeMethod: string };

  /** 切换 Tab */
  switchResourceProperties: { attributeName: string };

  /** 切换资源关系 Tab */
  switchResourceRelationTab: { id: string };

  /** 切换资源关系第二级 Tab */
  switchResourceRelationSecondLevelTab: { id: string };

  /** 切换工作空间子 Tab */
  switchWorkPaneSubTab: string;

  /** 刷新 资源属性列表页 */
  refreshPropertiesConfig: string;

  refreshResourceList: never;

  refreshRamAPiMetaList: void;

  switchProject: { projectId: string };

  // 同步api出参或者入参
  syncApiParams: void;

  // 获取到schema
  getSchema: string;

  checkoutEditableCell: string;

  // todo any => AuditCommentDTO
  openAuditComment: any;

  refreshApiPage: string; //刷新 API 页面

  refreshUnRelatedApi: string;

  resetMetaMapOpenRows: string; //重置metaMap 展开的行

  jumpToCode: ErrorObject;

  addStruct: any; // 获取到数据结构

  /**
   * 打开快捷调试
   */
  openNewQuickTest: string;

}

// ===================
// 以下内容无需关心
// ===================
export type EventNames = keyof EventTypes;

class AmpEventEmitter extends EventEmitter.EventEmitter {
  on<K extends EventNames>(eventName: K, listener: (params?: EventTypes[K]) => void): this {
    return super.on.call(this, eventName, listener);
  }

  once<K extends EventNames>(eventName: K, listener: (params?: EventTypes[K]) => void): this {
    return super.once.call(this, eventName, listener);
  }

  emit<K extends EventNames>(eventName: K, params?: EventTypes[K]): boolean {
    return super.emit.call(this, eventName, params);
  }

  removeListener<K extends EventNames>(eventName: K, listener: (params?: EventTypes[K]) => void): this {
    return super.removeListener.call(this, eventName, listener);
  }

  removeAllListeners<K extends EventNames>(eventName: K): this {
    return super.removeAllListeners.call(this, eventName);
  }
}

const emitter = new AmpEventEmitter();
emitter.setMaxListeners(0);

export { emitter };
