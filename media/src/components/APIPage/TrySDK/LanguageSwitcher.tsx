/**
 * @author yini-chen
 * @description 语言切换
 */
import { Card, Empty, Tabs } from 'antd';
import * as React from 'react';
// import { WorkbenchIcon } from './Icon/Icon';
// import { EditorLanguages } from './MonacoEditor/define';
// import { I18N } from '../utils/I18N';
import { EditorLanguages } from '../../define';
import I18N from '../../../utils/I18N';
import { WorkbenchIcon } from '../../../Icon/Icon';

export const OLD_SDK_LANGUAAGES = [
  { value: EditorLanguages.Java, text: EditorLanguages.Java, icon: 'java' },
  { value: EditorLanguages.Javascript, text: 'Node.js', icon: 'node-js' },
  { value: EditorLanguages.Go, text: EditorLanguages.Go, icon: 'go' },
  { value: EditorLanguages.PHP, text: EditorLanguages.PHP, icon: 'php' },
  { value: EditorLanguages.Python, text: EditorLanguages.Python, icon: 'python' },
  { value: EditorLanguages.CSharp, text: 'C#', icon: 'csharp' },
  { value: EditorLanguages.Ruby, text: EditorLanguages.Ruby, icon: 'ruby' },
  { value: EditorLanguages.CPP, text: 'C++', icon: 'cpp' },
];

export const DARA_SDK_LANGUAGES = [
  { value: EditorLanguages.JavaAsync, text: EditorLanguages.JavaAsync, icon: 'java' },
  { value: EditorLanguages.Java, text: EditorLanguages.Java, icon: 'java' },
  { value: EditorLanguages.TypeScript, text: 'TypeScript', icon: 'typescript' },
  { value: EditorLanguages.Go, text: EditorLanguages.Go, icon: 'go' },
  { value: EditorLanguages.PHP, text: EditorLanguages.PHP, icon: 'php' },
  { value: EditorLanguages.Python, text: EditorLanguages.Python, icon: 'python' },
  { value: EditorLanguages.Python2, text: EditorLanguages.Python2, icon: 'python' },

  { value: EditorLanguages.CSharp, text: 'C#', icon: 'csharp' },
  { value: EditorLanguages.CPP, text: 'C++', icon: 'cpp' },
  { value: EditorLanguages.Swift, text: 'Swift', icon: 'swift' },
];

export class LanguageSwitcherProps {
  languages? = DARA_SDK_LANGUAGES;

  language? :string;

  tabContent: React.ReactNode;

  onLanguageChange(language: EditorLanguages) {}

  extra = null;
  languageStatus? = {};
  sdkDemos? = {};
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = (props) => {

  return (
    <div className="language-switcher-comp">
      <Tabs
        activeKey={props.language}
        onChange={(tab) => props.onLanguageChange(tab as EditorLanguages)}
        // tabBarExtraContent={
        //   { left: <div className="label">{I18N.main.explorer.allLanguages}</div> }
        // }
        type={'card'}
        tabBarGutter={0}
      >
        {props.languages.map((language) => {
          return (
            <Tabs.TabPane
              disabled={!Object.keys(props.sdkDemos || {})?.includes(language.value?.toLocaleLowerCase())}
              tab={
                <span>
                  {/* <WorkbenchIcon type={language.icon} useSVG /> */}
                  {language.text}
                </span>
              }
              key={language.value}
            >
              {props.tabContent}
            </Tabs.TabPane>
          );
        })}
      </Tabs>
      {/* {props.languages && props.languages?.length ? null : (
        <Card className="empty-card">
          <Empty description={I18N.components.index.noData} />
        </Card>
      )} */}
    </div>
  );
};

LanguageSwitcher.defaultProps = new LanguageSwitcherProps();
