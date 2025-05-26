"use client"

import { useEffect, useRef } from "react"

export default function CKEditor({ value, onChange }) {
  const editorRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    // Load CKEditor script dynamically
    if (!document.querySelector("#ckeditor-script")) {
      const script = document.createElement("script")
      script.id = "ckeditor-script"
      script.src = "https://cdn.ckeditor.com/4.16.2/standard/ckeditor.js"
      script.async = true
      script.onload = initEditor
      document.body.appendChild(script)
    } else if (window.CKEDITOR) {
      initEditor()
    }

    return () => {
      // Clean up CKEditor instance when component unmounts
      if (editorRef.current && window.CKEDITOR) {
        window.CKEDITOR.instances[editorRef.current.name]?.destroy()
      }
    }
  }, [])

  const initEditor = () => {
    if (!containerRef.current || !window.CKEDITOR) return

    // Create a unique ID for the editor
    const editorId = "ckeditor-" + Math.random().toString(36).substr(2, 9)

    // Create textarea element for CKEditor
    const textarea = document.createElement("textarea")
    textarea.id = editorId
    textarea.name = editorId
    textarea.value = value || ""

    // Clear container and append textarea
    containerRef.current.innerHTML = ""
    containerRef.current.appendChild(textarea)

    // Initialize CKEditor
    window.CKEDITOR.replace(editorId, {
      height: 300,
      toolbarGroups: [
        { name: "document", groups: ["mode", "document", "doctools"] },
        { name: "clipboard", groups: ["clipboard", "undo"] },
        { name: "editing", groups: ["find", "selection", "spellchecker", "editing"] },
        { name: "forms", groups: ["forms"] },
        "/",
        { name: "basicstyles", groups: ["basicstyles", "cleanup"] },
        { name: "paragraph", groups: ["list", "indent", "blocks", "align", "bidi", "paragraph"] },
        { name: "links", groups: ["links"] },
        { name: "insert", groups: ["insert"] },
        "/",
        { name: "styles", groups: ["styles"] },
        { name: "colors", groups: ["colors"] },
        { name: "tools", groups: ["tools"] },
        { name: "others", groups: ["others"] },
        { name: "about", groups: ["about"] },
      ],
      removeButtons:
        "Save,NewPage,Preview,Print,Templates,Cut,Copy,Paste,PasteText,PasteFromWord,Find,Replace,SelectAll,Scayt,Form,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,Strike,Subscript,Superscript,CopyFormatting,RemoveFormat,Outdent,Indent,CreateDiv,Blockquote,JustifyLeft,JustifyCenter,JustifyRight,JustifyBlock,BidiLtr,BidiRtl,Language,Anchor,Flash,HorizontalRule,Smiley,SpecialChar,PageBreak,Iframe,Maximize,ShowBlocks,About",
    })

    // Store reference to editor
    editorRef.current = textarea

    // Add change event handler
    window.CKEDITOR.instances[editorId].on("change", function () {
      const data = this.getData()
      onChange(data)
    })
  }

  return <div ref={containerRef} className="min-h-[300px]"></div>
}
