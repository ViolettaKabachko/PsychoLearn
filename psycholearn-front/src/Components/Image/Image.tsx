import React, { FC } from "react";
import type { DecoratorComponentProps, ImageAttributes } from "contenido";

const Image: FC<DecoratorComponentProps> = (props) => {
  if (props.blockType === "image") {
    const { src, alt, style } = props as ImageAttributes;
    if (src && alt) return <img alt={alt} src={src} style={style} />;
  }

  return <p>The atomic type is not supported in this demo!</p>;
};

export default Image;
