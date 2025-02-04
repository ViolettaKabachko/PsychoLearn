import { convertFromHTML, convertToHTML } from "draft-convert";
import {
  BlockType,
  CUSTOM_STYLE_MAP,
  EntityType,
  InlineStyle,
} from "./editorConfig.ts";

export const stateToHTML = convertToHTML<InlineStyle, BlockType>({
  styleToHTML: (style) => {
    switch (style) {
      case InlineStyle.BOLD:
        return <strong />;
      case InlineStyle.ITALIC:
        return <em />;
      case InlineStyle.UNDERLINE:
        return (
          <span className="underline" style={{ textDecoration: "underline" }} />
        );
      case InlineStyle.ACCENT:
        return (
          <span
            className="accent"
            style={CUSTOM_STYLE_MAP[InlineStyle.ACCENT]}
          />
        );
      default:
        return null;
    }
  },
  blockToHTML: (block) => {
    switch (block.type) {
      case BlockType.h1:
        return <h1 />;
      case BlockType.default:
        return <p />;
      default:
        return null;
    }
  },
  entityToHTML: (entity, originalText) => {
    if (entity.type === EntityType.img) {
      return <img src={entity.data.src} alt={entity.data.alt} />;
    }
    return originalText;
  },
});

export const HTMLtoState = convertFromHTML<DOMStringMap, BlockType>({
  htmlToStyle: (nodeName, node, currentStyle) => {
    if (nodeName === "strong") {
      return currentStyle.add(InlineStyle.BOLD);
    }

    if (nodeName === "em") {
      return currentStyle.add(InlineStyle.ITALIC);
    }

    if (nodeName === "span" && node.classList.contains("underline")) {
      return currentStyle.add(InlineStyle.UNDERLINE);
    }

    if (nodeName === "span" && node.classList.contains("accent")) {
      return currentStyle.add(InlineStyle.ACCENT);
    }

    return currentStyle;
  },
  /** Типизация пакета не предусматривает параметр last, но он есть */
  // @ts-ignore
  htmlToBlock(nodeName, node, last) {
    switch (nodeName) {
      case "h1":
        return BlockType.h1;
      case "div":
      case "p":
        return BlockType.default;
      default:
        return null;
    }
  },
  htmlToEntity: (nodeName, node, addImage) => {
    if (nodeName === "img" && node.src && node.alt) {
      return addImage(EntityType.img, "IMMUTABLE", {
        src: node.src,
        alt: node.alt,
      });
    }

    return undefined;
  },
});
