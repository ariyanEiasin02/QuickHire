"use client";
import React, { useCallback, useEffect, useRef } from "react";
import "@/styles/RichEditor.scss";

interface RichEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  error?: boolean;
}

interface ToolbarBtn {
  icon: string;
  command: string;
  value?: string;
  title: string;
}

const TOOLBAR_GROUPS: ToolbarBtn[][] = [
  [
    { icon: "fi-rr-bold",          command: "bold",         title: "Bold (Ctrl+B)" },
    { icon: "fi-rr-italic",        command: "italic",       title: "Italic (Ctrl+I)" },
    { icon: "fi-rr-underline",     command: "underline",    title: "Underline (Ctrl+U)" },
    { icon: "fi-rr-strikethrough", command: "strikeThrough",title: "Strikethrough" },
  ],
  [
    { icon: "fi-rr-h2",            command: "formatBlock",  value: "H2", title: "Heading 2" },
    { icon: "fi-rr-h3",            command: "formatBlock",  value: "H3", title: "Heading 3" },
  ],
  [
    { icon: "fi-rr-list",          command: "insertUnorderedList", title: "Bullet list" },
    { icon: "fi-rr-list-ol",       command: "insertOrderedList",   title: "Numbered list" },
  ],
  [
    { icon: "fi-rr-quote-right",        command: "formatBlock", value: "BLOCKQUOTE", title: "Blockquote" },
  ],
];

const RichEditor = ({ value, onChange, placeholder = "Write job description here…", error }: RichEditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const isInternalChange = useRef(false);

  // Initialise content from value prop (only when mounting or programmatic reset)
  useEffect(() => {
    if (!editorRef.current) return;
    // Avoid cursor jumping on every keystroke
    if (!isInternalChange.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || "";
    }
    isInternalChange.current = false;
  }, [value]);

  const handleInput = useCallback(() => {
    if (!editorRef.current) return;
    isInternalChange.current = true;
    onChange(editorRef.current.innerHTML);
  }, [onChange]);

  const exec = (command: string, val?: string) => {
    editorRef.current?.focus();
    // Toggle H2/H3/BLOCKQUOTE back to div if already active
    if (command === "formatBlock") {
      const sel = window.getSelection();
      if (sel && sel.rangeCount > 0) {
        const node = sel.getRangeAt(0).startContainer.parentElement;
        const tag = node?.tagName?.toUpperCase();
        if (tag === val?.toUpperCase()) {
          document.execCommand("formatBlock", false, "DIV");
          handleInput();
          return;
        }
      }
    }
    document.execCommand(command, false, val);
    handleInput();
  };

  const isActive = (command: string, val?: string) => {
    if (typeof document === "undefined") return false;
    if (command === "formatBlock") {
      try {
        return document.queryCommandValue("formatBlock").toUpperCase() === val?.toUpperCase();
      } catch { return false; }
    }
    try { return document.queryCommandState(command); } catch { return false; }
  };

  const handleClear = () => {
    if (!editorRef.current) return;
    editorRef.current.innerHTML = "";
    handleInput();
  };

  const charCount = value.replace(/<[^>]*>/g, "").length;

  return (
    <div className={`rich-editor${error ? " rich-editor--error" : ""}`}>
      {/* Toolbar */}
      <div className="re-toolbar">
        {TOOLBAR_GROUPS.map((group, gi) => (
          <React.Fragment key={gi}>
            <div className="re-tb-group">
              {group.map((btn) => (
                <button
                  key={btn.command + (btn.value || "")}
                  type="button"
                  className={`re-tb-btn${isActive(btn.command, btn.value) ? " active" : ""}`}
                  title={btn.title}
                  onMouseDown={(e) => {
                    e.preventDefault(); // prevent editor blur
                    exec(btn.command, btn.value);
                  }}
                >
                  <i className={`fi ${btn.icon}`} />
                </button>
              ))}
            </div>
            {gi < TOOLBAR_GROUPS.length - 1 && <span className="re-tb-sep" />}
          </React.Fragment>
        ))}

        {/* Spacer */}
        <span style={{ flex: 1 }} />

        {/* Clear */}
        <button
          type="button"
          className="re-tb-btn re-tb-btn--clear"
          title="Clear all content"
          onMouseDown={(e) => { e.preventDefault(); handleClear(); }}
        >
          <i className="fi fi-rr-broom" />
        </button>
      </div>

      {/* Editable area */}
      <div
        ref={editorRef}
        className="re-body"
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        data-placeholder={placeholder}
      />

      {/* Footer */}
      <div className="re-footer">
        <span className={`re-charcount${charCount > 3000 ? " re-charcount--warn" : ""}`}>
          {charCount.toLocaleString()} chars
        </span>
        <span className="re-hint">
          Ctrl+B Bold · Ctrl+I Italic · Ctrl+U Underline
        </span>
      </div>
    </div>
  );
};

export default RichEditor;
