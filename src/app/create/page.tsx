"use client"

import { useState } from "react"
import { Button } from "@/ui/ui/button"
import { Card, CardContent } from "@/ui/ui/card"
import { Input } from "@/ui/ui/input"
import { Textarea } from "@/ui/ui/textarea"
import { Loader2, Download, Share2 } from "lucide-react"
import { generateMeme } from "@/lib/meme-generator"
import Image from "next/image"

export default function CreatePage() {
  const [prompt, setPrompt] = useState("")
  const [caption, setCaption] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedMeme, setGeneratedMeme] = useState<string | null>(null)

  const handleGenerate = async () => {
    if (!prompt) return

    setIsGenerating(true)
    try {
      const memeUrl = await generateMeme(prompt, caption)
      setGeneratedMeme(memeUrl)
    } catch (error) {
      console.error("Failed to generate meme:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="container max-w-4xl py-10 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Create Your Meme</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Describe what you want to see, add an optional caption, and let AI do the rest
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardContent className="pt-6 space-y-4">
            <div className="space-y-2">
              <label htmlFor="prompt" className="text-sm font-medium">
                Describe your meme
              </label>
              <Textarea
                id="prompt"
                placeholder="E.g., A cat wearing sunglasses and riding a skateboard"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="resize-none"
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="caption" className="text-sm font-medium">
                Caption (optional)
              </label>
              <Input
                id="caption"
                placeholder="Add a funny caption"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
              />
            </div>
            <Button onClick={handleGenerate} disabled={!prompt || isGenerating} className="w-full">
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                "Generate Meme"
              )}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6 space-y-4">
            <div className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center overflow-hidden">
              {generatedMeme ? (
                <Image
                  src={generatedMeme || "/placeholder.svg"}
                  alt="Generated meme"
                  width={400}
                  height={400}
                  className="object-contain"
                />
              ) : (
                <p className="text-gray-500 dark:text-gray-400 text-center p-4">Your meme will appear here</p>
              )}
            </div>
            {generatedMeme && (
              <div className="flex gap-2">
                <Button variant="outline" className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
                <Button variant="outline" className="w-full">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

