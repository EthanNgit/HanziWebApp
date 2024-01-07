import { faVolumeHigh } from '@fortawesome/free-solid-svg-icons/faVolumeHigh';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from 'react';
import { API_TTS_URL } from '../../../global/Ts/Strings';

interface TextToSpeechProps {
    text: string;
}

function TTSButton(
    { text }: TextToSpeechProps,
    ref: React.Ref<unknown> | undefined
) {
    const [audioBuffer, setAudioBuffer] = useState<{
        buffer: ArrayBuffer | null;
        timestamp: number;
    }>({ buffer: null, timestamp: 0 });
    const [isPlaying, setIsPlaying] = useState(false);
    const latestAudioBufferRef = useRef<{
        buffer: ArrayBuffer | null;
        timestamp: number;
    }>({ buffer: null, timestamp: 0 });
    const iconRef = useRef<SVGSVGElement | null>(null);

    const playAudio = async () => {
        if (!isPlaying) {
            try {
                setIsPlaying(true);

                const currentAudioBuffer = latestAudioBufferRef.current;

                if (currentAudioBuffer.buffer) {
                    // Audio file already saved; no need to requery.
                    const audioArrayBuffer = currentAudioBuffer.buffer;
                    const audioBlob = new Blob([audioArrayBuffer], {
                        type: 'audio/mpeg',
                    });
                    const audioUrl = URL.createObjectURL(audioBlob);
                    const audioElement = new Audio(audioUrl);

                    audioElement.addEventListener('ended', () => {
                        setIsPlaying(false);
                    });

                    await audioElement.play();
                } else {
                    // Audio file has not been played yet; get it.
                    const response = await axios.post(
                        API_TTS_URL,
                        { text },
                        { responseType: 'arraybuffer' }
                    );
                    const newAudioBuffer = {
                        buffer: response.data,
                        timestamp: Date.now(),
                    };

                    setAudioBuffer(newAudioBuffer);
                    latestAudioBufferRef.current = newAudioBuffer;
                }
            } catch (error) {
                alert('Error playing audio');
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
            const audioBlob = new Blob([audioArrayBuffer], {
                type: 'audio/mpeg',
            });
            const audioUrl = URL.createObjectURL(audioBlob);
            const audioElement = new Audio(audioUrl);

            // Make sure user can not spam the audio
            audioElement.addEventListener('ended', () => {
                setIsPlaying(false);
            });

            audioElement.play().catch((error) => {
                alert('Error playing audio');
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

    return (
        <FontAwesomeIcon
            icon={faVolumeHigh}
            className="cn-listen-icon"
            onClick={playAudio}
            ref={iconRef}
        />
    );
}

export default forwardRef(TTSButton);
