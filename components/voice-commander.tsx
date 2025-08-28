'use client'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Mic, MicOff } from 'lucide-react'

interface VoiceCommanderProps {
  onCommand: (command: string) => void
}

export function VoiceCommander({ onCommand }: VoiceCommanderProps) {
  const [isListening, setIsListening] = useState(false)
  const [recognition, setRecognition] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [transcript, setTranscript] = useState('')

  useEffect(() => {
    const w = window as any
    const SR = w.webkitSpeechRecognition || w.SpeechRecognition
    if (SR) {
      const r = new SR()
      r.continuous = false
      r.interimResults = false
      r.lang = 'en-US'
      
      r.onstart = () => {
        setIsListening(true)
        setError(null)
        setTranscript('')
        console.log('Voice recognition started')
      }
      
      r.onresult = (event: any) => {
        const command = event.results[0][0].transcript
        console.log('Voice command received:', command)
        setTranscript(command)
        onCommand(command)
      }
      
      r.onerror = (e: any) => {
        console.error('Voice recognition error:', e.error)
        setError(e.error || 'Voice error')
        setIsListening(false)
      }
      
      r.onend = () => {
        setIsListening(false)
        console.log('Voice recognition ended')
      }
      
      setRecognition(r)
    } else {
      setError('Voice not supported. Use Chrome or type your prompt.')
    }
  }, [onCommand])

  const toggleListening = () => {
    if (!recognition) {
      alert('Voice recognition not available. Please use Chrome browser.')
      return
    }
    
    try {
      if (isListening) {
        recognition.stop()
      } else {
        recognition.start()
      }
    } catch (err) {
      console.error('Voice recognition error:', err)
      setError('Failed to start voice recognition')
    }
  }

  return (
    <div className="flex items-center gap-2">
      <Button 
        onClick={toggleListening} 
        variant={isListening ? 'destructive' : 'outline'} 
        size="sm"
        disabled={!recognition}
        className="flex items-center gap-2"
      >
        {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
        {isListening ? 'Listening...' : 'Voice'}
      </Button>
      {error && (
        <div className="text-xs text-red-500 max-w-32">
          {error}
        </div>
      )}
    </div>
  )
}


