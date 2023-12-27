/**
 * @author 奇阳
 * @description Icon
 */
import classNames from 'classnames';
import * as React from 'react';
// import './Icon.scss';

export class WorkbenchIconProps {
  type = '';

  style? = {} as React.CSSProperties;

  color? = undefined;

  className? = '';

  useSVG? = false;
}

export const WorkbenchIcon: React.FC<WorkbenchIconProps> = props => {
  let { style } = props;
  const { className } = props;

  if (props.color) {
    style = {
      ...style,
      color: props.color,
    };
  }

  const classes = classNames('oa-iconfont', `icon-${props.type}`, className, { 'svg-icon': props.useSVG });

  if (props.useSVG) {
    return (
      <svg className={classes} aria-hidden="true" style={style}>
        <use xlinkHref={`#icon-${props.type}`} />
      </svg>
    );
  }

  return <i className={classes} style={style}></i>;
};

WorkbenchIcon.defaultProps = new WorkbenchIconProps();
