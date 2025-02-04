export enum BlockType {
  h1 = "header-one",
  default = "p",
}

export enum InlineStyle {
  BOLD = "BOLD",
  ITALIC = "ITALIC",
  UNDERLINE = "UNDERLINE",
  ACCENT = "ACCENT",
}

export const CUSTOM_STYLE_MAP = {
  [InlineStyle.ACCENT]: {
    backgroundColor: "#dcdcdc",
    color: "#f17777",
  },
};

export enum EntityType {
  img = "img",
}
