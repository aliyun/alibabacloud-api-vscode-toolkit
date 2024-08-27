import * as React from "react";
import { PontUIService } from "../service/UIService";
import { parseAPIMetaDescription } from "../utils/parseAPIMetaDescription";
import { getSpecInfoFromName, getVSCode } from "../utils/utils";
import { API as APIPage } from "./APIPage/API";
import { ApiErrorCode } from "./APIPage/APIDocument/ApiErrorCode";
import { BaseClass as StructDocument } from "./APIPage/APIDocument/BaseClass";
import ProfileManagerIndex from "./ProfileManager/ProfileManagerIndex";

if (typeof window !== "undefined") {
  (window as any).routerMeta = {};
}

const getRouterMeta = (): any => {
  if (typeof window === "undefined") {
    return {};
  }

  const routerMetaStr = (document.getElementById("router-meta-data") as any)?.value;
  let value = {};
  try {
    value = JSON.parse(decodeURI(routerMetaStr));
  } catch (e) {}

  getVSCode()?.setState(value);
  return value;
};

export class AppProps {
  routerMeta?: any;
}

export const App: React.FC<AppProps> = (props) => {
  const [appMeta, setAppMeta] = React.useState(props.routerMeta);
  const { pageType, schemaType, specName, modName, name, spec: metaSpec, remoteSpec } = appMeta || {};

  const { product: popcode, version } = getSpecInfoFromName(specName || "");

  const [itemMeta, setItemMeta] = React.useState(metaSpec);
  const [defs, setDefs] = React.useState({});

  React.useEffect(() => {
    if (!appMeta) {
      const newAppMeta = getRouterMeta();
      if (newAppMeta) {
        setAppMeta(newAppMeta);
        setItemMeta(newAppMeta.spec);
        PontUIService.requestDefinitions(newAppMeta?.specName).then((defs) => {
          setDefs(defs);
        });
      }
    }

    window.addEventListener("message", (event) => {
      const responseMessage = event.data;
      if (responseMessage?.type === "updateItemMeta") {
        setItemMeta(responseMessage.data);
      }
    });
    if (specName) {
      PontUIService.requestDefinitions(specName).then((defs) => {
        setDefs(defs);
      });
    }
  }, []);

  return React.useMemo(() => {
    // if (!appMeta) {
    //   return null;
    // }

    // if (!metaSpec && !remoteSpec) {
    //   return <div className='vscode-page'>loading...</div>;
    // }
    if (pageType === "document") {
      if (schemaType === "api") {
        const selectedApi = parseAPIMetaDescription(itemMeta, popcode, version);
        const errorCodes = selectedApi?.ext?.errorCodes ? (
          <ApiErrorCode popcode={popcode} version={version} errorCodes={selectedApi?.ext?.errorCodes} />
        ) : null;

        return (
          <div className="w-full">
            <APIPage
              selectedApi={selectedApi}
              product={popcode}
              version={version}
              definitions={defs}
              onStructClick={(struct: any) => {
                PontUIService.openMeta({ ...struct, specName });
              }}
              renderMore={() => errorCodes}
            />
          </div>
        );
      } else if (schemaType === "struct") {
        return (
          <div className="vscode-page">
            <StructDocument
              name={name}
              schema={itemMeta}
              definitions={defs}
              onStructClick={(struct) => {
                PontUIService.openMeta({ ...struct, specName });
              }}
            />
          </div>
        );
      }
    }
    if (pageType === "profile") {
      return <ProfileManagerIndex />;
    }

    return <div className="vscode-page"></div>;
  }, [itemMeta, defs, popcode, version]);
};

App.defaultProps = new AppProps();
