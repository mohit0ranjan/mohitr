'use client'

import { useState } from 'react'
import { Linkedin, Twitter, Link as LinkIcon, Check, MessageCircle } from 'lucide-react'
import { Button } from './button'

interface ShareButtonsProps {
    title: string
    slug: string
}

export function ShareButtons({ title, slug }: ShareButtonsProps) {
    const [copied, setCopied] = useState(false)
    const url = typeof window !== 'undefined' ? `${window.location.origin}/opportunities/${slug}` : ''

    const onCopy = () => {
        navigator.clipboard.writeText(url)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const shareLinkedIn = () => {
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank')
    }

    const shareTwitter = () => {
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, '_blank')
    }

    const shareWhatsApp = () => {
        window.open(`https://wa.me/?text=${encodeURIComponent(title + " " + url)}`, '_blank')
    }

    return (
        <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={onCopy} title="Copy Link" className="bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white transition-colors">
                {copied ? <Check className="w-4 h-4 text-green-500" /> : <LinkIcon className="w-4 h-4" />}
            </Button>
            <Button variant="outline" size="icon" onClick={shareLinkedIn} title="Share on LinkedIn" className="bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-[#0077b5] hover:border-[#0077b5]/30 transition-colors">
                <Linkedin className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={shareTwitter} title="Share on X" className="bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-sky-400 hover:border-sky-400/30 transition-colors">
                <Twitter className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={shareWhatsApp} title="Share on WhatsApp" className="bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-green-500 hover:border-green-500/30 transition-colors">
                <MessageCircle className="w-4 h-4" />
            </Button>
        </div>
    )
}
