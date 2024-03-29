/**
 * @file SQL编辑器定义文件
 * @author 奇阳
 */

export enum EditorLanguages {
    /** Darabonba */
    Darabonba = 'Darabonba',
  
    TypeScript = 'TypeScript',
  
    Javascript = 'javascript',
  
    PHP = 'PHP',
  
    Ruby = 'Ruby',
  
    CSharp = 'CSharp',
  
    Markdown = 'markdown',
  
    /** Go 语言 */
    Go = 'Go',
  
    /** Java 语言 */
    Java = 'Java',
  
    /** Python 语言 */
    Python = 'Python',
  
    Python2 = 'Python2',
  
    JSON = 'json',
  
    XML = 'xml',
  
    Shell = 'shell',
  
    CPP = 'cpp',
  
    JavaAsync = 'java-async',
  
    Swift = 'swift',
  }

  export interface SDKLanguage {
    typescript:   string;
    java:         string;
    php:          string;
    python:       string;
    python2:      string;
    go:           string;
    csharp:       string;
    swift:        string;
    "java-async": string;
    dependencies: string;
}
  