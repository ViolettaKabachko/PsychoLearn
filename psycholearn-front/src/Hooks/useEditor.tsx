import { EditorState, RichUtils } from "draft-js";
import { BlockType, InlineStyle } from "@/editorConfig.ts";
import { useCallback, useMemo, useState } from "react";
import { createDecorator, findEntitiesOf } from "contenido";
import Image from "@/Components/Image/Image.tsx";
import { HTMLtoState, stateToHTML } from "@/convert.tsx";

export interface EditorAPI {
  state: EditorState;
  onChange: (state: EditorState) => void;
  toggleBlockType: (blockType: BlockType) => void;
  currentBlockType: string;
  toggleInlineStyle: (inlineStyle: InlineStyle) => void;
  hasInlineStyle: (inlineStyle: InlineStyle) => boolean;
  toHTML: () => string;
}

export const useEditor = (html?: string): EditorAPI => {
  const decorators = createDecorator([
    {
      component: Image,
      strategy: findEntitiesOf("image"),
    },
  ]);

  const [state, setState] = useState(() =>
    html
      ? EditorState.createWithContent(HTMLtoState(html), decorators)
      : EditorState.createEmpty(decorators),
  );

  const toggleBlockType = useCallback((blockType: BlockType) => {
    setState((currentState) =>
      RichUtils.toggleBlockType(currentState, blockType),
    );
  }, []);

  const toHTML = useCallback(() => {
    return stateToHTML(state.getCurrentContent());
  }, [state]);

  const toggleInlineStyle = useCallback((inlineStyle: InlineStyle) => {
    setState((currentState) =>
      RichUtils.toggleInlineStyle(currentState, inlineStyle),
    );
  }, []);

  const hasInlineStyle = useCallback(
    (inlineStyle: InlineStyle) => {
      /* Получаем иммутабельный Set с ключами стилей */
      const currentStyle = state.getCurrentInlineStyle();
      /* Проверяем содержится ли там переданный стиль */
      return currentStyle.has(inlineStyle);
    },
    [state],
  );

  const currentBlockType = useMemo(() => {
    const selection = state.getSelection();
    const content = state.getCurrentContent();
    const block = content.getBlockForKey(selection.getStartKey());
    return block.getType();
  }, [state]);

  return useMemo(
    () => ({
      state,
      onChange: setState,
      toggleBlockType,
      currentBlockType,
      toggleInlineStyle,
      hasInlineStyle,
      toHTML,
    }),
    [state],
  );
};
