/**
 * @author
 * @description
 */
import * as React from "react";
import { Card } from "@alicloud/console-components";

export class SemixCardProps {}

export const SemixCard: React.FC<SemixCardProps> = (props) => {
  return <Card {...props}></Card>;
};

SemixCard.defaultProps = new SemixCardProps();
