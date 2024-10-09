import * as assert from "assert";
import I18N, { getCurrentLang, treegifyI18N } from "../../utils/I18N";
import * as _ from "lodash";
import mds from "../../langs/mds.json";

suite("I18N Test Suite", async function () {
  // 获取当前语言为默认语言，检查默认语言是否为中文
  test("getCurrentLangByDefault", function () {
    const defaultLang = getCurrentLang();
    assert.strictEqual(defaultLang, "zh_CN");
  });

  // 检查语言包
  test("check I18N", function () {
    const curLang = getCurrentLang();
    const langs = treegifyI18N({ en_US: mds["en_US"], zh_CN: mds["zh_CN"], zh_HK: mds["zh_CN"], ja_JP: mds["en_US"] });
    if (I18N?.setLang && I18N?.ide) {
      I18N.setLang(curLang);
      // 检查I18N 和 mds 中的文案是否相同
      const leaves = getLeafPaths(langs[curLang]);
      for (let i = 0; i < leaves?.length; i++) {
        // 随机获取一个叶子节点路径
        // const leaves = getLeafPaths(I18N.ide);
        // const randomPath = getRandomLeafPath(leaves);
        const path = getLeaf(leaves, i);
        // console.log(`${i + 1}.`, path);
        const value1 = getValueFromPath(I18N, path);
        const value2 = getValueFromPath(langs[curLang], path);
        assert.equal(value1, value2);
      }
    } else {
      assert.fail("I18N is not defined");
    }
  });
});

function getLeafPaths(obj, currentPath = "") {
  const keys = Object.keys(obj);
  let leaves = [];

  keys.forEach((key) => {
    const newPath = currentPath ? `${currentPath}.${key}` : key;
    if (typeof obj[key] === "object" && obj[key] !== null) {
      leaves = leaves.concat(getLeafPaths(obj[key], newPath));
    } else if (typeof obj[key] === "string") {
      leaves.push(newPath);
    }
  });
  return leaves;
}

function getRandomLeafPath(leaves) {
  // return paths[Math.floor(Math.random() * paths.length)];
  // 随机选择一个叶子节点路径
  if (leaves.length > 0) {
    const randomIndex = Math.floor(Math.random() * leaves.length);
    return leaves[randomIndex];
  }
}
function getLeaf(leaves, index) {
  return leaves[index];
}

function getValueFromPath(obj, path) {
  return _.get(obj, path);
}
