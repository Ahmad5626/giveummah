"use client"

import { useState } from "react"
import { ComprehensiveEditor } from "@/components/ckediter/Ckediter"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Save, FileText, Download } from "lucide-react"

export default function TextEditor() {
  const [content, setContent] = useState("")


  const handleSave = () => {
    console.log("Saved content:", content)
    // Here you would typically save to your backend
    alert("Content saved successfully!")
  }

  const handleExport = () => {
    const blob = new Blob([content], { type: "text/html" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "document.html"
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Comprehensive Rich Text Editor
            </CardTitle>
            <div className="flex gap-2">
              <Button onClick={handleSave} className="flex items-center gap-2">
                <Save className="h-4 w-4" />
                Save
              </Button>
              <Button variant="outline" onClick={handleExport} className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Export HTML
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ComprehensiveEditor
            content={content}
            onChange={setContent}
            placeholder="Start writing your amazing content here..."
          />
        </CardContent>
      </Card>
    </div>
  )
}
