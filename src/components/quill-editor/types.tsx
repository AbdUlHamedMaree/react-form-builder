import type {
  Delta,
  RangeStatic,
  Sources,
  StringMap,
  BoundsStatic,
  DeltaStatic,
  Quill,
  QuillOptionsStatic,
} from 'quill';

export type BaseQuillEditorProps = {
  id?: string;
  className?: string;
  theme?: string;
  style?: React.CSSProperties;
  readOnly?: boolean;
  value?: string | Delta;
  defaultValue?: string | Delta;
  placeholder?: string;
  tabIndex?: number;
  bounds?: string | HTMLElement;
  scrollingContainer?: string | HTMLElement;
  onChange?: (
    content: string,
    delta: Delta,
    source: Sources,
    editor: QuillEditorUnprivilegedEditor
  ) => void;
  onChangeSelection?: (
    range: RangeStatic,
    source: Sources,
    editor: QuillEditorUnprivilegedEditor
  ) => void;
  onFocus?: (
    range: RangeStatic,
    source: Sources,
    editor: QuillEditorUnprivilegedEditor
  ) => void;
  onBlur?: (
    previousRange: RangeStatic,
    source: Sources,
    editor: QuillEditorUnprivilegedEditor
  ) => void;
  onKeyPress?: React.EventHandler<any>;
  onKeyDown?: React.EventHandler<any>;
  onKeyUp?: React.EventHandler<any>;
  formats?: string[];
  children?: React.ReactElement<any>;
  modules?: StringMap;
  preserveWhitespace?: boolean;

  /**
   * @deprecated
   * The `toolbar` prop has been deprecated. Use `modules.toolbar` instead.
   * See: https://github.com/zenoamaro/react-quill#upgrading-to-react-quill-v100.
   * */

  toolbar?: never;
  /**
   * @deprecated
   * The `styles` prop has been deprecated. Use custom stylesheets instead.
   * See: https://github.com/zenoamaro/react-quill#upgrading-to-react-quill-v100
   */

  styles?: never;
  /**
   * @deprecated
   * The `pollInterval` property does not have any effect anymore.
   * You can safely remove it from your props.
   * See: https://github.com/zenoamaro/react-quill#upgrading-to-react-quill-v100.
   */
  pollInterval?: never;
};

export type QuillEditorUnprivilegedEditor = {
  getLength(): number;
  getText(index?: number, length?: number): string;
  getHTML(): string;
  getBounds(index: number, length?: number): BoundsStatic;
  getSelection(focus?: boolean): RangeStatic;
  getContents(index?: number, length?: number): DeltaStatic;
};

export type QuillEditorMixin = {
  createEditor(element: HTMLElement, config: QuillOptionsStatic): Quill;
  hookEditor(editor: Quill): void;
  unhookEditor(editor: Quill): void;
  setEditorReadOnly(editor: Quill, value: boolean): void;
  setEditorContents(editor: Quill, value: Delta | string): void;
  setEditorSelection(editor: Quill, range: RangeStatic): void;
  makeUnprivilegedEditor(editor: Quill): QuillEditorUnprivilegedEditor;
};

export type QuillEditorClassType = React.Component<BaseQuillEditorProps> & {
  focus(): void;
  blur(): void;
  getEditor(): Quill;
};
