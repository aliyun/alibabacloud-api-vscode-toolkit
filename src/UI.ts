import { PontManager } from "pontx-manager";
// import { diffPontSpec, diffPontSpecs } from "pontx-spec-diff";
import * as vscode from "vscode";
import * as _ from "lodash";

export class AlicloudAPIVSCodeUI {
  pontBar: vscode.StatusBarItem;

  create(manager: PontManager) {
    this.pontBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);
    this.pontBar.command = "alicloud.api.openPontPanel";
    this.pontBar.color = "white";
    this.pontBar.text = "Alibaba Cloud API Toolkit";
    this.pontBar.show();

    // if (hasMultiOrigins && currentSpec?.name) {
    //   this.originBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);
    //   this.originBar.command = "alicloud.api.switchOrigin";
    //   this.originBar.color = "white";
    //   this.originBar.text = currentSpec?.name;
    //   this.originBar.show();
    // }

    // this.generateBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);
    // this.generateBar.command = "alicloud.api.regenerate";
    // this.generateBar.color = "yellow";
    // this.generateBar.text = "generate";
    // this.generateBar.show();

    // this.restartBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);
    // this.restartBar.command = "alicloud.api.restart";
    // this.restartBar.color = "yellow";
    // this.restartBar.text = "restart";
    // this.restartBar.show();
  }

  update(pontManager: PontManager) {
    // const diffs = diffPontSpecs(pontManager.localPontSpecs, pontManager.remotePontSpecs);
    // const diffsCnt = diffs.length;
    // if (this.pontBar) {
    //   this.pontBar.color = diffsCnt ? "yellow" : "white";
    //   this.pontBar.text = `Alibaba Cloud API Toolkit`;
    // }
  }
}

export const alicloudAPIToolbarUI = new AlicloudAPIVSCodeUI();
