import { useSize } from "ahooks";
import { useState, useRef, useEffect } from "react";

const useCustomFixScrollBar = (scrollContentClass: string, contentRef: React.RefObject<HTMLTableElement>) => {
  const [hiddenScroll, setHiddenScroll] = useState(false);
  const [tableLocation, setTableLocation] = useState<DOMRect>();
  const [tableContentWidth, setTableContentWidth] = useState<number>();
  const customScrollBarRef = useRef<HTMLDivElement>(null);
  const size = useSize(contentRef);

  useEffect(() => {
    const targetContent = document?.querySelector(scrollContentClass);
    const location = targetContent?.getBoundingClientRect();
    const { bottom, top } = location;
    setTableContentWidth(targetContent?.scrollWidth);
    setTableLocation(location);
    const oParent = customScrollBarRef.current;
    const viewHeight = window.innerHeight || document.documentElement.clientHeight;
    if (bottom < viewHeight || top > viewHeight) {
      setHiddenScroll(true);
    } else {
      setHiddenScroll(false);
    }
    const handleParentScroll = () => {
      targetContent &&
        targetContent.scrollTo({
          left: oParent?.scrollLeft,
        });
    };
    const handleTableScroll = () => {
      oParent &&
        oParent.scrollTo({
          left: targetContent?.scrollLeft,
        });
    };
    oParent && oParent.addEventListener("scroll", handleParentScroll);
    targetContent && targetContent.addEventListener("scroll", handleTableScroll);
    const handleScroll = () => {
      const viewHeight = window.innerHeight || document.documentElement.clientHeight;
      const { bottom, top } = targetContent?.getBoundingClientRect();
      if (targetContent?.scrollWidth <= targetContent?.clientWidth) {
        setHiddenScroll(true);
      } else {
        if (bottom < viewHeight || top > viewHeight) {
          setHiddenScroll(true);
        } else {
          setHiddenScroll(false);
        }
      }
    };
    window.addEventListener("scroll", handleScroll, true);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      oParent && oParent.removeEventListener("scroll", handleParentScroll);
      targetContent && targetContent.removeEventListener("scroll", handleTableScroll);
    };
  }, [size]);

  return (
    <div
      ref={customScrollBarRef}
      className="scrollbar-custom"
      style={{
        height: 16,
        width: tableLocation?.width,
        position: "fixed",
        bottom: 0,
        left: tableLocation?.left,
        display: "fixed",
        background: "rgba(204, 204, 204, 0.1)",
        // background: 'red',
        zIndex: 100,
        visibility: hiddenScroll ? "hidden" : "visible",
        overflow: "auto",
      }}
    >
      <div
        style={{
          width: tableContentWidth,
          height: 1,
        }}
      />
    </div>
  );
};

export default useCustomFixScrollBar;
