import { faVolumeHigh } from '@fortawesome/free-solid-svg-icons/faVolumeHigh';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../styles/Buttons/TTSButton.css';
import axios from 'axios';
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';

interface TextToSpeechProps {
  text: string;
}

const TTSButton: React.ForwardRefRenderFunction<any, TextToSpeechProps> = ({ text }, ref) => {
  const [audioBuffer, setAudioBuffer] = useState<{ buffer: ArrayBuffer | null; timestamp: number }>({ buffer: null, timestamp: 0 });
  const [isPlaying, setIsPlaying] = useState(false);
  const latestAudioBufferRef = useRef<{ buffer: ArrayBuffer | null; timestamp: number }>({ buffer: null, timestamp: 0 });
  const iconRef = useRef<null | SVGSVGElement>(null);

  const playAudio = async () => {
    if (!isPlaying) {
      try {
        setIsPlaying(true);

        const currentAudioBuffer = latestAudioBufferRef.current;

        if (currentAudioBuffer.buffer) {
          const audioArrayBuffer = currentAudioBuffer.buffer;
          const audioBlob = new Blob([audioArrayBuffer], { type: 'audio/mpeg' });
          const audioUrl = URL.createObjectURL(audioBlob);
          const audioElement = new Audio(audioUrl);

          audioElement.addEventListener('ended', () => {
            setIsPlaying(false);
          });

          await audioElement.play();

          console.log('Played saved audio');
        } else {
          const response = await axios.post('http://localhost:3001/api/tts', { text }, { responseType: 'arraybuffer' });
          const newAudioBuffer = { buffer: response.data, timestamp: Date.now() };
          setAudioBuffer(newAudioBuffer);
          latestAudioBufferRef.current = newAudioBuffer;

          console.log('Played new audio');
        }
      } catch (error) {
        console.error('Error playing audio:', error);
      } 
    }
  };

  useEffect(() => {
    return () => {
      setAudioBuffer({ buffer: null, timestamp: 0 });
      latestAudioBufferRef.current = { buffer: null, timestamp: 0 };
      setIsPlaying(false);
    };
  }, [text]);

  useEffect(() => {
    if (audioBuffer.buffer) {
      const audioArrayBuffer = audioBuffer.buffer;
      const audioBlob = new Blob([audioArrayBuffer], { type: 'audio/mpeg' });
      const audioUrl = URL.createObjectURL(audioBlob);
      const audioElement = new Audio(audioUrl);

      audioElement.addEventListener('ended', () => {
        setIsPlaying(false);
      });

      audioElement.play().catch((error) => {
        console.error('Error playing audio:', error);
      });

      return () => {
        audioElement.pause();
        audioElement.removeEventListener('ended', () => {
          setIsPlaying(false);
        });
        URL.revokeObjectURL(audioUrl);
      };
    }
  }, [audioBuffer.timestamp]);

  useImperativeHandle(ref, () => ({
    forceClick: playAudio,
  }));

  return <FontAwesomeIcon icon={faVolumeHigh} className='cn-listen-icon' onClick={playAudio} ref={iconRef} />;
};

export default forwardRef(TTSButton);