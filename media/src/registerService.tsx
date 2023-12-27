import * as _ from "lodash";
import { getVSCode } from "./utils/utils";
import { PontUIService } from "./service/UIService";

if (import.meta.env.PROD) {
  const requestPostMessage = <T,>(message: { type: string; value?: any; requestId:string }): Promise<T> => {
    // const requestId = _.uniqueId();
    getVSCode().postMessage({ ...message });

    return new Promise((resove, reject) => {
      window.addEventListener("message", (event) => {
        const responseMessage = event.data;
        if (responseMessage?.type === message.type && responseMessage?.requestId === message.requestId) {
          return resove(responseMessage.data as T);
        }
      });
    });
  };

  Object.keys(PontUIService).forEach((methodName) => {
    PontUIService[methodName] = (value, ...args) => {
      const requestId = _.uniqueId();
      return requestPostMessage<void>({
        type: methodName,
        value,
        requestId
      });
    };
  });
}
// todo
