import React, { useEffect, useRef, useState } from 'react'

export default function VideoDisplay({ videoUrl }: { videoUrl: string }) {
    const [url, setUrl] = useState("")
    const [id, setId] = useState<string | undefined>()
    useEffect(() => {
        setId(videoUrl.split("?")[1].split("&").filter(ele => ele.startsWith("v="))[0].split("=")[1])
        setUrl(`https://www.youtube.com/embed/${id}`)
    }, [videoUrl, id])

    if (!id) {
        return null
    }
    return (
        <iframe
            width="100%"
            height="100%"
            src={url}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="YouTube Video" >
        </iframe>
    )
}
