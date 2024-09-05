/**
 * @author yini-chen
 * @description
 */
import { CloseOutlined, DownOutlined, UpOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import * as React from "react";

export class SearcherProps {
  contentRef: any;
  isVisible: boolean;
  setIsVisible: (visible: boolean) => void;
  mode?: string;
}

export const Searcher: React.FC<SearcherProps> = (props) => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const { contentRef } = props;
  const contentElement = contentRef.current;

  // 清除高亮
  const clearHighlights = () => {
    setHighlightDoms([]);
    setCurrentIndex(0);
    const highlightedElements = document.querySelectorAll('span[style*="background-color: yellow"]');
    highlightedElements.forEach((element) => {
      const parent = element.parentNode;
      if (parent) {
        const textNode = document.createTextNode(element.textContent || "");
        parent.insertBefore(textNode, element);
        parent.removeChild(element);
      }
    });
  };

  const [highlightDoms, setHighlightDoms] = React.useState([]);

  React.useEffect(() => {
    // 清除之前的高亮
    clearHighlights();
  }, [searchTerm, props.mode]);

  const handleSearch = () => {
    const matchDoms = [];
    function highlightSampleText(searchTerm) {
      // 遍历所有节点的递归函数
      function traverseNodes(node: Node) {
        // 如果是文本节点
        if (node.nodeType === Node.TEXT_NODE) {
          const textContent = node.textContent || "";
          const index = textContent?.toLocaleLowerCase()?.indexOf(searchTerm?.toLocaleLowerCase());

          if (index !== -1) {
            const span = document.createElement("span");
            span.style.backgroundColor = "yellow";
            span.style.color = "#59636E";
            span.textContent = textContent.substring(index, index + searchTerm.length); // 高亮的文本
            span.id = "highlighted-text";
            matchDoms.push(span);

            // 创建一个新的文本节点，包含高亮部分和其他部分
            const beforeText = document.createTextNode(textContent.substring(0, index));
            const afterText = document.createTextNode(textContent.substring(index + searchTerm.length));

            // 替换当前的文本节点
            const parent = node.parentNode;
            if (parent) {
              parent.insertBefore(beforeText, node);
              parent.insertBefore(span, node);
              parent.insertBefore(afterText, node);
              parent.removeChild(node);
            }
          }
        } else {
          // 除文本节点外，递归遍历子节点
          node.childNodes.forEach(traverseNodes);
        }
      }

      // 从文档体开始遍历
      traverseNodes(contentElement);
      setHighlightDoms(matchDoms);
      setCurrentIndex(matchDoms?.length ? 1 : 0);
    }
    if (searchTerm?.length) {
      if (highlightDoms?.length) {
        // 回车时移动到下一个高亮元素
        if (highlightDoms[curIndex]) {
          setCurrentIndex(curIndex + 1);
        } else {
          setCurrentIndex(1);
        }
      } else {
        highlightSampleText(searchTerm);
      }
    }
  };

  const [curIndex, setCurrentIndex] = React.useState(highlightDoms?.length ? 1 : 0);

  // 滚动到当前高亮元素
  React.useEffect(() => {
    if (highlightDoms[curIndex - 1]) {
      highlightDoms[curIndex - 1].scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [highlightDoms, curIndex]);

  if (!props.isVisible) {
    return null;
  }

  return (
    <div className="searcher-wrapper fixed right-[24px] top-[74px] z-50 flex rounded-sm bg-[var(--vscode-badge-background)] p-1 shadow-sm shadow-[var(--vscode-badge-background)]">
      <Input
        style={{ width: "200px" }}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onPressEnter={handleSearch}
        placeholder="Search..."
        size="small"
        className="h-8"
        id="page-search-input"
      />
      <span className="m-auto text-nowrap p-2">
        {curIndex}/{highlightDoms.length}
      </span>
      <div>
        <Button
          type="text"
          className="h-8 w-8 p-1"
          onClick={() => {
            if (curIndex !== 1) {
              setCurrentIndex(curIndex - 1);
            } else {
              setCurrentIndex(highlightDoms.length);
            }
          }}
        >
          <UpOutlined style={{ color: "var(--vscode-editor-foreground)", verticalAlign: "middle" }} />
        </Button>
        <Button
          type="text"
          className="h-8 w-8 p-1"
          onClick={() => {
            if (highlightDoms[curIndex]) {
              setCurrentIndex(curIndex + 1);
            } else {
              setCurrentIndex(1);
            }
          }}
        >
          <DownOutlined style={{ color: "var(--vscode-editor-foreground)", verticalAlign: "middle" }} />
        </Button>
        <Button
          type="text"
          className="h-8 w-8 p-1"
          onClick={() => {
            clearHighlights();
            props.setIsVisible(false);
          }}
        >
          <CloseOutlined style={{ color: "var(--vscode-editor-foreground)", verticalAlign: "middle" }} />
        </Button>
      </div>
    </div>
  );
};
Searcher.defaultProps = new SearcherProps();
export default Searcher;
