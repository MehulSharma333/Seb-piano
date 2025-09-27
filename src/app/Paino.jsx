"use client";
import React, { act } from 'react';
import { useRef, useState, useEffect } from 'react';
import './index.css';
import {Select, SelectItem} from "@heroui/react";
import {ChevronDownIcon} from '@heroicons/react/24/solid';
import { Tooltip  } from '@heroui/react';
import { CircleX , Menu ,  Loader2 } from 'lucide-react';
import { motion , AnimatePresence } from "motion/react";
import ToneDropdown from './ToneDropDown';
import { LoaderOverlay } from './LoaderOverlay';

const Paino = () => {
  const [activeKey, setActiveKey] = useState([]);
  const [activeKeyTwo , setActiveKeyTwo] = useState([]);
  const [activeKeyThree , setActiveKeyThree] = useState([]);
  const [activeKeyFour, setActiveKeyFour] = useState([]);
  const [recordedNotes, setRecordedNotes] = useState([]);
const [isRecording, setIsRecording] = useState(false);
const [activateTimer , setActivateTimer] = useState(false);
const [timeLeft , setTimeLeft] = useState(120);
const [timeWhileRecording, setTimeWhileRecording] = useState(120);
const [activateTimerForRecording, setActivateTimerForRecording] = useState(false);
const [elaspedTime , setElaspedTime] = useState(null);
const [startTime , setStartTime] = useState(null);
const [disableSelect, setDisableSelect] = useState(false);
const [selectedSound , setSelectedSound] = useState("sound1");
const [isMetroPlaying, setIsMetroPlaying] = useState(false);
const [bpm , setBpm] = useState(130);
const [intervalId, setIntervalId] = useState(null);
const [barLength , setBarLength] = useState(4);
const [screenDisplay , setScreenDisplay] = useState('');
const currentBeatRef = useRef(1);
const audioRef = useRef();
const audioRefTwo = useRef();
 const scrollPiano = useRef(null);
 const [displayNotes , setDisplayNotes] = useState([]);
 const [displayNotesTwo , setDisplayNotesTwo] = useState([]);
 const [displayNotesThree , setDisplayNotesThree] = useState([]);
 const [sustainNotes , setSustainNotes] = useState(false);
 const [fullScreen , setFullScreen] = useState(false);
 const [isLoaded, setIsLoaded] = useState(false);
 const pianoRef = useRef(null);
 const [isSoundPackLoading, setIsSoundPackLoading] = useState(false);
 const [loadedSoundPacks, setLoadedSoundPacks] = useState(new Set());
  const themes = [
    {
      name: "Classic",
      keyColor: "background-image",
      activeKeyColor: "bg-blue-500",
      borderColor: "border-gray-700",
    }, {
      name: "Snow White",
      keyColor: "white-decor",
      activeKeyColor: "bg-gray-300",
      borderColor: "border-black",
    }, {
    name: "Ocean",
    keyColor: "blue-decor",
    activeKeyColor: "bg-teal-400",
    borderColor: "border-blue-300",
    }
  ]
  const keyMap = {
    a: "C4",
    q: "C#4",
    s: "D4",
    w: "D#4",
    d: "E4",
    f: "F4",
    e: "F#4",
    g: "G4",
    r: "G#4",
    h: "A4",
    t: "A#4",
    j: "B4",
    k: "C5",
    y: "C#5",
    l: "D5",
    u: "D#5",
    ";": "E5",
    "'": "F5",
    i: "F#5",
    z: "G5",
    o : "G#5",
    x: "A5",
    p: "A#5",
    c: "B5",
    v: "C6",
    "[": "C#6",
    b: "D6",
    "]": "D#6",
    n: "E6",
    m: "F6",
    "3": "F#6",
    ",": "G6",
    "4": "G#6",
    ".": "A6",
    "5": "A#6",
    "1": "B6",
    "2" : "C7"
  };
  const [theme , setTheme] = useState(themes[0]);
  function detectChord(keys) {
    const chordLibrary = new Map([
        // Major chords
        [['C4', 'E4', 'G4'], 'C Major'],
        [['C#4', 'F4', 'G#4'], 'C# Major'],
        [['D4', 'F#4', 'A4'], 'D Major'],
        [['D#4', 'G4', 'A#4'], 'D# Major'],
        [['E4', 'G#4', 'B4'], 'E Major'],
        [['F4', 'A4', 'C5'], 'F Major'],
        [['F#4', 'A#4', 'C#5'], 'F# Major'],
        [['G4', 'B4', 'D5'], 'G Major'],
        [['G#4', 'C5', 'D#5'], 'G# Major'],
        [['A4', 'C#5', 'E5'], 'A Major'],
        [['A#4', 'D5', 'F5'], 'A# Major'],
        [['B4', 'D#5', 'F#5'], 'B Major'],
        // Minor chords
        [['C4', 'D#4', 'G4'], 'C Minor'],
        [['C#4', 'E4', 'G#4'], 'C# Minor'],
        [['D4', 'F4', 'A4'], 'D Minor'],
        [['D#4', 'F#4', 'A#4'], 'D# Minor'],
        [['E4', 'G4', 'B4'], 'E Minor'],
        [['F4', 'G#4', 'C5'], 'F Minor'],
        [['F#4', 'A4', 'C#5'], 'F# Minor'],
        [['G4', 'A#4', 'D5'], 'G Minor'],
        [['G#4', 'B4', 'D#5'], 'G# Minor'],
        [['A4', 'C5', 'E5'], 'A Minor'],
        [['A#4', 'C#5', 'F5'], 'A# Minor'],
        [['B4', 'D5', 'F#5'], 'B Minor'],
        // Diminished chords
        [['C4', 'D#4', 'F#4'], 'C Diminished'],
        [['C#4', 'E4', 'G4'], 'C# Diminished'],
        [['D4', 'F4', 'G#4'], 'D Diminished'],
        [['D#4', 'F#4', 'A4'], 'D# Diminished'],
        [['E4', 'G4', 'A#4'], 'E Diminished'],
        [['F4', 'G#4', 'B4'], 'F Diminished'],
        [['F#4', 'A4', 'C5'], 'F# Diminished'],
        [['G4', 'A#4', 'C#5'], 'G Diminished'],
        [['G#4', 'B4', 'D5'], 'G# Diminished'],
        [['A4', 'C5', 'D#5'], 'A Diminished'],
        [['A#4', 'C#5', 'E5'], 'A# Diminished'],
        [['B4', 'D5', 'F5'], 'B Diminished'],
        // Augmented chords
        [['C4', 'E4', 'G#4'], 'C Augmented'],
        [['C#4', 'F4', 'A4'], 'C# Augmented'],
        [['D4', 'F#4', 'A#4'], 'D Augmented'],
        [['D#4', 'G4', 'B4'], 'D# Augmented'],
        [['E4', 'G#4', 'C5'], 'E Augmented'],
        [['F4', 'A4', 'C#5'], 'F Augmented'],
        [['F#4', 'A#4', 'D5'], 'F# Augmented'],
        [['G4', 'B4', 'D#5'], 'G Augmented'],
        [['G#4', 'C5', 'E5'], 'G# Augmented'],
        [['A4', 'C#5', 'F5'], 'A Augmented'],
        [['A#4', 'D5', 'F#5'], 'A# Augmented'],
        [['B4', 'D#5', 'G5'], 'B Augmented']
    ].map(([keys, chord]) => [keys.sort().join(','), chord])); // Normalize keys while storing

    return chordLibrary.get(keys.sort().join(',')) || null;
}
  function randomShuffle(params) {
    const filterCurrentTheme = themes.filter((val)=> val.name !== theme.name); 
   const randomIndex =  Math.floor(Math.random() *filterCurrentTheme.length);
   setTheme(filterCurrentTheme[randomIndex])
  }
  function scroll(x){
   scrollPiano.current.scrollLeft += x;
  } 
   // 49-key mapping (C4 to C7)
  const whiteKeys = [
    {note :"C4", sound1 :"/c4.wav", sound2 :"/Rhodes-C4.wav", sound3 : "/sound3/C4-stage-grand.wav" , sound4 : "/sound4/C4-electric.wav" ,sustain:"/sustain/C4.wav", label : "C4" , alphabet : "a"},
    {note :"D4", sound1 :"/D4.wav",sound2 :"/Rhodes-D4.wav", sound3 : "/sound3/D4-stage-grand.wav" , sound4 : "/sound4/D4-electric.wav" ,sustain:"/sustain/D4.wav",  label : "D4", alphabet : "s"},
    {note :"E4", sound1 :"/E4.wav", sound2 : "/Rhodes-E4.wav", sound3 : "/sound3/E4-stage-grand.wav" , sound4 : "/sound4/E4-electric.wav" ,sustain:"/sustain/E4.wav",  label : "E4", alphabet : "d"},
    {note :"F4", sound1 :"/F4.wav", sound2 : "/Rhodes-F4.wav", sound3 : "/sound3/F4-stage-grand.wav" , sound4 : "/sound4/F4-electric.wav" ,sustain:"/sustain/F4.wav",  label : "F4", alphabet : "f"},
    {note :"G4", sound1 :"/G4.wav", sound2 : "/Rhodes-G4.wav", sound3 : "/sound3/G4-stage-grand.wav" , sound4 : "/sound4/G4-electric.wav" ,sustain:"/sustain/G4.wav",  label : "G4", alphabet : "g"},
    {note :"A4", sound1 :"/A4.wav", sound2 : "/Rhodes-A4.wav", sound3 : "/sound3/A4-stage-grand.wav" , sound4 : "/sound4/A4-electic.wav" ,sustain:"/sustain/A4.wav", label : "A4", alphabet : "h"},
    {note :"B4", sound1 :"/B4.wav", sound2 : "/Rhodes-B4.wav", sound3 : "/sound3/B4-stage-grand.wav" , sound4 : "/sound4/B4-electric.wav" ,sustain:"/sustain/B4.wav",  label : "B4", alphabet : "j"},
    {note :"C5", sound1 :"/C5.wav", sound2 : "/Rhodes-C5.wav", sound3 : "/sound3/C5-stage-grand.wav" , sound4 : "/sound4/C5-electric.wav" ,sustain:"/sustain/C5.wav",  label : "C5", alphabet : "k"},
    {note :"D5", sound1 :"/D5.wav", sound2 : "/Rhodes-D5.wav", sound3 : "/sound3/D5-stage-grand.wav" , sound4 : "/sound4/D5-electric.wav" ,sustain:"/sustain/D5.wav",  label : "D5", alphabet : "l"},
    {note :"E5", sound1 :"/E5.wav", sound2 : "/Rhodes-E5.wav", sound3 : "/sound3/E5-stage-grand.wav" , sound4 : "/sound4/E5-electric.wav" ,sustain:"/sustain/E5.wav",  label : "E5", alphabet : ";"},
    {note :"F5", sound1 :"/F5.wav", sound2 : "/Rhodes-F5.wav", sound3 : "/sound3/F5-stage-grand.wav" , sound4 : "/sound4/F5-electric.wav" ,sustain:"/sustain/F5.wav",  label : "F5", alphabet : "'"},
    {note :"G5", sound1 :"/G5.wav", sound2 : "/Rhodes-G5.wav",sound3 : "/sound3/G5-stage-grand.wav" ,  sound4 : "/sound4/G5-electric.wav" ,sustain:"/sustain/G5.wav", label : "G5" , alphabet : "z"},
    {note :"A5", sound1 :"/A5.wav", sound2 : "/Rhodes-A5.wav", sound3 : "/sound3/A5-stage-grand.wav" , sound4 : "/sound4/A5-electric.wav" ,sustain:"/sustain/A5.wav",  label : "A5", alphabet : "x"},
    {note :"B5", sound1 :"/B5.wav", sound2 : "/Rhodes-B5.wav", sound3 : "/sound3/B5-stage-grand.wav" , sound4 : "/sound4/B5-electric.wav" ,sustain:"/sustain/B5.wav",  label : "B5", alphabet : "c" },
    {note :"C6", sound1 :"/C5.wav", sound2 : "/Rhodes-C6.wav", sound3 : "/sound3/C6-stage-grand.wav" , sound4 : "/sound4/C6-electric.wav" ,sustain:"/sustain/C6.wav",  label : "C6", alphabet : "v"},
    {note :"D6", sound1 :"/D6.wav", sound2 : "/Rhodes-D6.wav", sound3 : "/sound3/D6-stage-grand.wav" , sound4 : "/sound4/D6-electric.wav" ,sustain:"/sustain/D6.wav",  label : "D6", alphabet : "b"},
    {note :"E6", sound1 :"/E6.wav", sound2 : "/Rhodes-E6.wav", sound3 : "/sound3/E6-stage-grand.wav" , sound4 : "/sound4/E6-electric.wav" ,sustain:"/sustain/E6.wav",  label : "E6", alphabet : "n"},
    {note :"F6", sound1 :"/F6.wav", sound2 : "/Rhodes-F6.wav", sound3 : "/sound3/F6-stage-grand.wav" , sound4 : "/sound4/F6-electric.wav" ,sustain:"/sustain/F6.wav",  label : "F6", alphabet : "m"},
    {note :"G6", sound1 :"/G6.wav", sound2 : "/Rhodes-G6.wav", sound3 : "/sound3/G6-stage-grand.wav" , sound4 : "/sound4/G6-electric.wav" ,sustain:"/sustain/G6.wav",  label : "G6", alphabet : ","},
    {note :"A6", sound1 :"/A6.wav", sound2 : "/Rhodes-A6.wav", sound3 : "/sound3/A6-stage-grand.wav" , sound4 : "/sound4/A6-electric.wav" ,sustain:"/sustain/A6.wav",  label : "A6", alphabet : "."},
    {note :"B6", sound1 :"/B6.wav", sound2 : "/Rhodes-B6.wav", sound3 : "/sound3/B6-stage-grand.wav" , sound4 : "/sound4/B6-electric.wav" ,sustain:"/sustain/B6.wav",  label : "B6", alphabet : "1"},
    {note :"C7", sound1 :"/C7.wav", sound2 : "/Rhodes-C7.wav", sound3 : "/sound3/C7-stage-grand.wav" , sound4 : "/sound4/C7-electric.wav" ,sustain:"/sustain/C7.wav",  label : "C7", alphabet : "2"},
  ];
  const blackKeys = [
    {note :"C#4", sound1:'/C-sharp4.wav', sound2 : "/Rhodes-CSharp4.wav", sound3 : "/sound3/C4-sharp-stage-grand.wav" , sound4 : "/sound4/C4-sharp-electric.wav" ,sustain:"/sustain/C4-sharp.wav",  label : "c#4" , alphabet : "q"}, 
    {note :"D#4", sound1: "/D-sharp4.wav", sound2 : "/Rhodes-Dsharp4.wav", sound3 : "/sound3/D4-sharp-stage-grand.wav" , sound4 : "/sound4/D4-sharp-electric.wav" ,sustain:"/sustain/D4-sharp.wav",  label :'D#4', alphabet : "w"},  
    null, 
    {note :"F#4", sound1 : "/F-sharp4.wav", sound2 : "/Rhodes-FSharp4.wav", sound3 : "/sound3/F4-sharp-stage-grand.wav" , sound4 : "/sound4/F4-sharp-electric.wav" ,sustain:"/sustain/F4-sharp.wav",  label: "F#4", alphabet : "e"}, 
    {note :"G#4", sound1 : "/G-sharp4.wav", sound2 : "/Rhodes-GSharp4.wav", sound3 : "/sound3/G4-sharp-stage-piano.wav"  , sound4 : "/sound4/G4-sharp-electric.wav" ,sustain:"/sustain/G4-sharp.wav",  label : "G#4", alphabet : "r"}, 
    {note:"A#4", sound1 : "/A-sharp4.wav", sound2 : "/Rhodes-ASharp4.wav", sound3 : "/sound3/A4-sharp-stage-grand.wav" , sound4 : "/sound4/A4-sharp-electric.wav" ,sustain:"/sustain/A4-sharp.wav",  label : "A#4" , alphabet : "t"},
    {note :"C#5", sound1 :'/C-sharp5.wav', sound2 : '/Rhodes-CSharp5.wav', sound3 : "/sound3/C5-sharp-stage-grand.wav" , sound4 : "/sound4/C5-sharp-electric.wav" ,sustain:"/sustain/C5-sharp.wav",  label : "C#5", alphabet : "y"}, 
    {note :"D#5", sound1 :'/D-sharp5.wav', sound2 : "/Rhodes-Dsharp5.wav", sound3 : "/sound3/D5-sharp-stage-grand.wav" , sound4 : "/sound4/D5-sharp-electric.wav" ,sustain:"/sustain/D5-sharp.wav",  label : "D#5", alphabet : "u"}, 
    null, 
    {note:"F#5", sound1 : "/F-sharp5.wav", sound2 : "/Rhodes-FSharp5.wav", sound3 : "/sound3/F5-sharp-grand-piano.wav" , sound4 : "/sound4/F5-sharp-electric.wav" ,sustain:"/sustain/F5-sharp.wav",  label: "F#5", alphabet : "i" }, 
    {note:"G#5", sound1 : "/G-sharp5.wav", sound2 : "/Rhodes-GSharp5.wav", sound3 : "/sound3/G5-sharp-grand-piano.wav" , sound4 : "/sound4/G5-sharp-electric.wav" ,sustain:"/sustain/G5-sharp.wav",   label : "G#5", alphabet : "o"}, 
    {note:"A#5", sound1 : "/A-sharp5.wav", sound2 : "/Rhodes-ASharp5.wav", sound3 : "/sound3/A5-sharp-stage-grand.wav" , sound4 : "/sound4/A5-sharp-electric.wav" ,sustain:"/sustain/A5-sharp.wav",  label: "A#5", alphabet : "p"},
    {note:"C#6", sound1 : "/C-sharp6.wav", sound2 : '/Rhodes-CSharp6.wav', sound3 : "/sound3/C6-sharp-grand-piano.wav" , sound4 : "/sound4/C6-sharp-electric.wav" ,sustain:"/sustain/C6-sharp.wav",  label :"C#6", alphabet : "[" }, 
    {note:"D#6", sound1 : "/D-sharp6.wav", sound2 : "/Rhodes-Dsharp6.wav", sound3 : "/sound3/D6-sharp-grand-piano.wav" , sound4 : "/sound4/D6-sharp-electric.wav" ,sustain:"/sustain/D6-sharp.wav",  label : "D#6" , alphabet : "]"}, 
    null, 
    {note:"F#6", sound1 : "/F-sharp6.wav", sound2 : "/Rhodes-FSharp6.wav", sound3 : "/sound3/F6-sharp-grand-piano.wav" , sound4 : "/sound4/F6-sharp-electric.wav" ,sustain:"/sustain/F6-sharp.wav",  label : "F#6", alphabet : "3"}, 
    {note:"G#6", sound1 : "/G-sharp6.wav",  sound2 : "/Rhodes-GSharp6.wav", sound3 : "/sound3/G6-sharp-grand-piano.wav" , sound4 : "/sound4/G6-sharp-electric.wav" ,sustain:"/sustain/G6-sharp.wav",  label : "G#6", alphabet : "4"}, 
    {note : "A#6", sound1 : "/A-sharp6.wav", sound2 : "/Rhodes-ASharp6.wav", sound3 : "/sound3/A6-sharp-stage-grand.wav" , sound4 : "/sound4/A6-sharp-electric.wav" ,sustain:"/sustain/A6-sharp.wav",  label :"A#6" , alphabet : "5" }
  ];
  const playSound = (whiteKey, index, label) => {
    if (activateTimer) return;
    setActiveKey((prevKeys) => [...prevKeys, index]);
    setDisplayNotes((prevNotes) => [...prevNotes, label]);
  
    if (isRecording  && whiteKey) {
      setRecordedNotes((prev) => [...prev, { whiteKey, timestamp: Date.now() }]);
    }
  
     const soundToPlay = whiteKey?.[selectedSound];
     if (!soundToPlay) {
    console.warn('Skipped playing sound: missing whiteKey or selectedSound');
    return;
  }
    const audio = new Audio(soundToPlay);
  
    const stopSound = () => {
      audio.pause();
      audio.currentTime = 0;
      setActiveKey((prevKeys) => prevKeys.filter((i) => i !== index));
      setDisplayNotes((prevNotes) => prevNotes.filter((i) => i !== label));
    };
  
      audio.play();
      setTimeout(stopSound, 800);
    
  };
const playSoundTwo = (blackKey, index , label ) => {
  if(activateTimer) return;
  setActiveKeyTwo((preKeys)=> [...preKeys, index]);
  setDisplayNotesTwo((preKeys) => [...preKeys , label]);
    // 🛡️ Only record if blackKey exists
  if (isRecording && blackKey) {
    setRecordedNotes(prev => [...prev, { blackKey, timestamp: Date.now() }]);
  }

  const soundToPlay = blackKey?.[selectedSound];
  if (!soundToPlay) {
    console.warn('Skipped playing sound: missing blackKey or selectedSound');
    return;
  }

  const audio = new Audio(soundToPlay);
  const stopSound = () => {
    audio.pause();
    audio.currentTime = 0;
    setActiveKeyTwo((prevKeys) => prevKeys.filter((i) => i !== index));
    setDisplayNotesTwo((prevNotes) => prevNotes.filter((i) => i !== label));
  };
 
    audio.play();
    setTimeout(stopSound, 800);
  
}
const startRecording = () => {
  setIsMetroPlaying(false)
  setActivateTimerForRecording(true);
  setRecordedNotes([]);
  setIsRecording(true);
  setDisableSelect(true)
  const start = Date.now();
  setStartTime(start);
};
const stopRecording = () => {
  setIsMetroPlaying(false)
  setIsRecording(false);
  setDisableSelect(false)
  setActivateTimer(false);
  setActivateTimerForRecording(false);
  setTimeWhileRecording(120)
  const stopTime = Date.now();
  const elapsed = stopTime - startTime;
  const elapsedMsToSeconds = Math.floor(elapsed/1000);
  setTimeLeft(elapsedMsToSeconds)
  console.log("Recording stopped.", elapsedMsToSeconds);
}
// Track which keys are currently pressed down
const pressedKeys = new Set();
const handleKeyDown = (event) => {

  const key = event.key;

  if (pressedKeys.has(key)) return;
  pressedKeys.add(key);
  if (activateTimer) return;

  const note = keyMap[event.key];
  if (!note) return;
  console.log("value of active key", note);
  setDisplayNotesThree((prev) => [...prev, note]);

  const whiteKey = whiteKeys.find((k) => k?.note === note);

  // 🛡️ Only record if the whiteKey actually exists
  if (isRecording && whiteKey) {
    setRecordedNotes(prev => [...prev, { whiteKey, timestamp: Date.now() }]);
  }

  console.log("here the recorded Notes", recordedNotes);
  console.log(whiteKey);

  if (whiteKey) {
    const audio = new Audio(whiteKey[selectedSound]);
     
      audio.play();
      setActiveKeyThree((prev) => [...prev, note]);
      setTimeout(() => {
        setActiveKeyThree([]);
        setDisplayNotesThree([]);
      }, 800);
    return;
  }

  // Filter out undefined
  const blackKey = blackKeys.filter(Boolean).find((k) => k.note === note);

  // 🛡️ Only record if the blackKey actually exists
  if (isRecording && blackKey) {
    setRecordedNotes(prev => [...prev, { blackKey, timestamp: Date.now() }]);
  }

  console.log("here the recorded notes", recordedNotes);

  if (blackKey) {
    const audio = new Audio(blackKey[selectedSound]);
    setActiveKeyFour((prev) => [...prev, note]);
    
      audio.play();
      setTimeout(() => {
        setActiveKeyFour([]);
        setDisplayNotesThree([]);
      }, 600);
    return;
  }

  console.warn(`Note ${note} not found in whiteKeys or blackKeys`);
};

const handleKeyUp = (event) => {
  // Remove this key from our pressed keys set when released
  pressedKeys.delete(event.key);
};
const playRecording = () => {
  if (!recordedNotes || recordedNotes.length === 0) return;
  setDisableSelect(true);
  setActivateTimer(true); // Start the timer
  setIsMetroPlaying(false)
  const firstNoteTime = recordedNotes[0].timestamp;
  const recStart = startTime;
  console.log("start value", recStart);
  const delayInPiano = firstNoteTime - recStart;

  recordedNotes.forEach((key, index) => {
    const delay = key.timestamp - firstNoteTime + delayInPiano;
    console.log(`Delay for note ${index}:`, delay);

    setTimeout(() => {
      // Safely get the sound based on whiteKey or blackKey
      const sound = key.whiteKey?.[selectedSound] || key.blackKey?.[selectedSound];

      // If sound is null or undefined, skip this note
      if (!sound) {
        console.warn(`Skipped note ${index}: missing sound`);
        return;
      }

      // Play the sound
      const audio = new Audio(sound);
      audio.play();
      console.log("Played note:", key.label);

      // Highlight the key element if it exists
      const keyElement = document.querySelector(
        key.whiteKey
          ? `[data-white-key="${key.whiteKey.label}"]`
          : key.blackKey
          ? `[data-black-key="${key.blackKey.label}"]`
          : null
      );
      console.log("Key element found:", keyElement);

      if (keyElement) {
        keyElement.classList.add('active');
        setTimeout(() => {
          keyElement.classList.remove('active');
        }, 300);
      }
    }, delay);
  });

  const totalPlaybackTime =
    recordedNotes[recordedNotes.length - 1].timestamp - firstNoteTime + delayInPiano;
  const totalTime = Math.floor(totalPlaybackTime / 1000);
  setTimeLeft(totalTime);

  setTimeout(() => {
    setActivateTimer(false);
  }, totalPlaybackTime);
  setTimeout(() => {
    setDisableSelect(false);
    setRecordedNotes([]);
  }, totalPlaybackTime);
};

function metroShow() {
  if (activateTimer || activateTimerForRecording) return;
  const newState = !isMetroPlaying;
  setIsMetroPlaying(newState);
  if (newState) {
    metroLoop();
  } else {
    clearInterval(intervalId);
    setIntervalId(null);
    currentBeatRef.current = 1;
  }
}

function tick() {
   if (activateTimer || activateTimerForRecording) return;
  const firstRef = audioRef;
  const secondRef = audioRefTwo;
  if (barLength > 1 && currentBeatRef.current === barLength) {
    secondRef.current.currentTime = 0;
    secondRef.current.play();
  } else {
    firstRef.current.currentTime = 0;
    firstRef.current.play();
  }
  currentBeatRef.current = currentBeatRef.current < barLength ? currentBeatRef.current + 1 : 1;
}
function metroLoop() {
  if (intervalId) {
    clearInterval(intervalId)
  }
  const intervalTime = (60/bpm) * 1000; 
  const newIntervalId = setInterval(() => {
    tick();
  } , intervalTime
); 
setIntervalId(newIntervalId)}
useEffect(() => {
   if (isMetroPlaying) {
    metroLoop();
  } else {
    clearInterval(intervalId);
  }
   return ()=> clearInterval(intervalId);
}, [bpm , audioRef , audioRefTwo , isMetroPlaying]);
function prevClick() {
  // Pause the audio
  if (audioRef.current) {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  }
  if (audioRefTwo.current) {
    audioRefTwo.current.pause();
    audioRefTwo.current.currentTime = 0;
  }
  // Reset current beat
  currentBeatRef.current = 1;
  // Clear interval
  clearInterval(intervalId);
  setIntervalId(null);
// Decrease bpm, ensuring it stays within limits
  setBpm((prevBpm) => Math.max(prevBpm - 1, 60));
}
function forwardClick() {
  // Pause the audio
  if (audioRef.current) {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  }
  if (audioRefTwo.current) {
    audioRefTwo.current.pause();
    audioRefTwo.current.currentTime = 0;
  }
 // Reset current beat
  currentBeatRef.current = 1;
    // Clear interval
  clearInterval(intervalId);
  setIntervalId(null);
// Reset bars dynamically
  // Increase bpm, ensuring it stays within limits
  setBpm((prevBpm) => Math.min(prevBpm + 1, 180));
}
function handleSustain() {
 
  setSustainNotes((prev) => !prev)
  setSelectedSound((prevSound) => (prevSound === "sound1" || prevSound === "sound2" || prevSound === "sound3" || prevSound === "sound4" ? "sustain" : "sound1"));
}
useEffect(() => {
  window.addEventListener('keydown', handleKeyDown);
  window.addEventListener('keyup', handleKeyUp);
  
  return () => {
    window.removeEventListener('keydown', handleKeyDown);
    window.removeEventListener('keyup', handleKeyUp);
  };
}, [selectedSound, sustainNotes, isRecording , activateTimer]);
useEffect(() => {
console.log("Active Key updated to:", activeKey); // Logs after state updates
}, [activeKey, activeKeyTwo]);

 useEffect(() => {
    const isMobile = window.innerWidth <= 640;

    if (fullScreen && isMobile) {
      document.body.classList.add("locked");
      document.documentElement.classList.add("locked"); // html tag
    } else {
      document.body.classList.remove("locked");
      document.documentElement.classList.remove("locked");
    }

    // Cleanup when component unmounts or fullScreen changes
    return () => {
      document.body.classList.remove("locked");
      document.documentElement.classList.remove("locked");
    };
  }, [fullScreen]);


useEffect(() => {
  let timer;
  if (isRecording) {
      timer = setTimeout(() => {
          setActivateTimerForRecording(false);
          setDisableSelect(false)
          setTimeWhileRecording(120)
          stopRecording();
          alert("Recording stopped after 10 sec");
      }, 120000);
  }
  return () => clearTimeout(timer);
}, [isRecording]);
useEffect(() => {
  if (!activateTimer ||timeLeft === 0) return; // Stop the timer at 0
  const timer = setInterval(() => {
    setTimeLeft((prevTime) => prevTime - 1);
  }, 1000);
  return () => clearInterval(timer); // Cleanup on component unmount
}, [activateTimer,timeLeft]);
useEffect(() => {
  if (!activateTimerForRecording || timeWhileRecording === 0) return ;
  const timer = setInterval(() => {
     setTimeWhileRecording((val) => val - 1)
  }, 1000);
  return () => clearInterval(timer);
}, [activateTimerForRecording , timeWhileRecording]);
 const formatTime = (time) => { 
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};
useEffect(() => {
  if (displayNotes.length === 0) {
    setScreenDisplay('press key')
  } else if (displayNotes.length === 1) {
    setScreenDisplay(displayNotes[0])
  } else {
    const  chordName = detectChord(displayNotes)
    setScreenDisplay( chordName ||' random harmony')
  }
}, [displayNotes])
useEffect(() => {
  if (displayNotesTwo.length === 0) {
    setScreenDisplay('press key')
  } else if (displayNotesTwo.length === 1) {
    setScreenDisplay(displayNotesTwo[0])
  } else {
    setScreenDisplay('harmony')
  }
}, [displayNotesTwo])
useEffect(() => {
  if (displayNotesThree.length === 0) {
    setScreenDisplay('press key')
  } else if (displayNotesThree.length === 1) {
    setScreenDisplay(displayNotesThree[0])
  } else {
    const chord = detectChord(displayNotesThree)
    setScreenDisplay( chord ||'random harmony')
  }
}, [displayNotesThree])
function fullScreenPiano() {
  setFullScreen(true)
}

const loadSoundPack = async (soundKey) => {
  // Check if this sound pack has already been loaded
  if (loadedSoundPacks.has(soundKey)) {
    console.log(`Sound pack '${soundKey}' is already loaded. No need to load again.`);
    return; // Exit the function early
  }

  setIsSoundPackLoading(true);

 

  // Logic to get allPackPaths
  const allPackPaths = [
    ...whiteKeys.flatMap(key => key[soundKey]),
    ...blackKeys.flatMap(key => key ? key[soundKey] : []),
  ];

  const loadingPromises = allPackPaths.map(path => {
    return new Promise(resolve => {
      const audio = new Audio(path);
      audio.addEventListener('canplaythrough', () => resolve(), { once: true });
      audio.addEventListener('error', () => {
        console.warn(`Failed to load: ${path}`);
        resolve();
      }, { once: true });
    });
  });

  try {
    await Promise.all(loadingPromises);
    console.log(`Sound pack '${soundKey}' is ready to play.`);

    // Add the soundKey to the Set of loaded sound packs
    setLoadedSoundPacks(prevSet => new Set(prevSet.add(soundKey)));

  } catch (error) {
    console.error('Error loading sound pack:', error);
  } finally {
    setIsSoundPackLoading(false);
  }
};

 useEffect(() => {
  const allSoundPaths = [
  ...whiteKeys.flatMap(key => {
    // Check if the 'sound1' key exists and is a string
    if (typeof key.sound1 === 'string' && key.sound1.endsWith('.wav')) {
      return key.sound1;
    }
    return []; // Return an empty array if the sound isn't found
  }),
  ...blackKeys.flatMap(key => {
    // Handle the case where the key might be null
    if (key && typeof key.sound1 === 'string' && key.sound1.endsWith('.wav')) {
      return key.sound1;
    }
    return [];
  })
];

  // Log the array to the console to check its contents
  console.log('All Sound Paths:', allSoundPaths);

  if (allSoundPaths.length === 0) {
    console.warn('No sound paths found. Check your key data structures.');
    // You might want to handle this case, maybe set isLoaded(true) to show the UI anyway
    // or display a specific error message.
    setIsLoaded(true); 
    return;
  }
  const loadingPromises = allSoundPaths.map(path => {
  return new Promise(resolve => {
    const audio = new Audio(path);
    audio.addEventListener('canplaythrough', () => {
      resolve({ path, status: 'loaded' });
    }, { once: true });

    // Handle error case: The browser couldn't load the file
    audio.addEventListener('error', () => {
      console.warn(`Failed to load sound file: ${path}`);
      resolve({ path, status: 'error' }); // Resolve the promise so Promise.all doesn't fail
    }, { once: true });
  });
});

Promise.all(loadingPromises)
  .then(results => {
    // You can now check the status of each file if needed
    const successfulLoads = results.filter(r => r.status === 'loaded');
    console.log(`${successfulLoads.length} out of ${results.length} sounds loaded successfully.`);
    setIsLoaded(true);
     setLoadedSoundPacks(prevSet => new Set(prevSet.add('sound1')));
  })
  .catch(error => {
    // This catch block would only run if something fundamentally goes wrong with Promise.all itself
    console.error('An unhandled error occurred:', error);
  });
   
  }, []);
    // This part is the same as before, but it uses the new consolidated array
    
   if (!isLoaded) {
     return (
   <LoaderOverlay/>
  );
  }

  return (
    <main className={`w-full h-[100svh] md:h-[100dvh]  relative ${fullScreen ? "overflow-hidden" : ""}     flex flex-col   justify-center items-center  `}>
        <AnimatePresence>
      {/* The loader renders only if isSoundPackLoading is true */}
      {isSoundPackLoading && (
        <LoaderOverlay isLoaded={isLoaded} fullScreen={fullScreen} /> // Use a dedicated component for the loader
      )}
    </AnimatePresence>

     <div ref={pianoRef} className={` ${theme.keyColor} ${fullScreen ? "rotate-piano " : ""} rounded-xl w-[95%] max-w-[1600px] max-h-[1000px]  2xl:w-5/6 h-[30%] xl:h-5/6 md:h-2/4 shadow-2xl  flex flex-col overflow-hidden  `}>
     <div className='h-[40%] w-full flex'>
        <div className='w-1/3 flex pl-1 gap-1 md:gap-0 '>
        <div className='w-1/2 h-full   flex flex-col md:p-2 lg:p-4 md:gap-2 py-2 md:py-4  '>
        <div className='flex  w-full h-1/2 p-1 lg:p-1 gap-1 md:gap-2 justify-center items-center '>
        <Tooltip showArrow content="Click on Record , To Listen Back What You Have Played : )"  classNames={{
    base: "bg-purple-500 text-white",
  }} placement='bottom'>
       <button  onClick={startRecording} className={` ${isRecording ? " scale-90 transition ease-in" : "scale-100"} w-1/2 h-full md:w-1/2 shadow-2xl text-center text-white flex justify-center items-center bg-[#941919] md:h-full rounded-lg md:rounded-xl p-2`}>
       <h1 className={`lg:text-base ${fullScreen ? "text-[10px]" : "text-[6px]"}  md:text-[12px]`}>Record</h1>
       </button>
       </Tooltip>
       <Tooltip showArrow content="Stop The Recording Any Time You Want Or It Will Stop After 2 min :)"  classNames={{
    base: "bg-purple-500 text-white",
  }} placement='bottom'>
       <button onClick={stopRecording}  className={` rounded-lg  lg:w-1/2 lg:h-full  shadow-2xl text-center w-1/2 h-full text-white flex justify-center items-center bg-gray-600 xl:rounded-xl p-2 md:w-1/2 md:h-full`}>
       <h1 className={`lg:text-base ${fullScreen ? "text-[10px]" : "text-[6px]"} md:text-[12px]`}>Stop</h1>
       </button>
       </Tooltip>
       </div>
       <Tooltip showArrow content="The Play Button Will Play Only Work After Recording:)"  classNames={{
    base: "bg-purple-500 text-white",
  }} placement='bottom'>
       <button onClick={playRecording} className={`h-1/2 w-full shadow-2xl text-center text-white flex justify-center items-center ${isRecording || recordedNotes.length === 0 ? "bg-gray-700" : "bg-blue-500"}  rounded-xl`}>
       <h1 className={`lg:text-xl ${fullScreen ? "text-[10px]" : "text-[6px]"}  md:text-[12px]`}>Play</h1>
       </button>
       </Tooltip>
        </div>
        <div className='w-1/2  flex flex-col md:p-2 lg:p-4 md:gap-2 py-2 md:py-2 gap-1'>
           <ToneDropdown setSustainNotes={setSustainNotes} disableSelect={disableSelect} selectedSound={selectedSound} setSelectedSound={setSelectedSound} fullScreen={fullScreen} loadSoundPack={loadSoundPack} />

              <Tooltip showArrow content="Sustain The Keys Longer :)"  classNames={{
    base: "bg-purple-500 text-white",
  }} placement='bottom'>
              <button  disabled={disableSelect}   onClick={handleSustain} className={`h-1/2 w-full bg-gray-800 transition-all duration-500 ease-in-out ${theme.name === "Snow White" ? "" :" bg-opacity-70"} ${sustainNotes && !disableSelect ? "scale-90 bg-green-500" : "scale-100"} rounded-xl text-center text-white flex justify-center items-center`}>
              <h1 className={`lg:text-xl ${fullScreen ? "text-[10px]" : "text-[6px] md:text-sm"} `}>Sustain</h1>
              </button>
              </Tooltip>
        </div>
        </div>
        <div className='w-1/3 shadow-2xl md:p-6 p-2 '>
        <div className='bg-black h-full w-full flex justify-center items-center select-none'>
          <h1 className='text-white md:text-2xl'>{activateTimer ? "...playing" : activateTimerForRecording ? formatTime(timeWhileRecording) : ""}</h1>
          <h1 className='text-white text-[8px] md:text-2xl'>{!activateTimer && !activateTimerForRecording && !isMetroPlaying && screenDisplay}</h1>
        {!activateTimerForRecording && !activateTimer && isMetroPlaying && <div className='w-full h-full flex flex-col justify-center items-center '>
          <div className='flex justify-center items-center w-full h-full gap-4  md:gap-8'>
            <button onClick={forwardClick} className='w-[20px] h-[20px] md:w-[45px] md:h-[45px] shadow-xl p-1 md:p-2 flex justify-center bg-slate-500 bg-opacity-80 rounded-md md:rounded-xl items-center'><h1 className='font-bold text-base md:text-4xl '>+</h1> </button>
          <h1 className='text-white text-center text-lg  md:text-5xl '>{bpm}</h1>
          <button onClick={prevClick} className='w-[20px] h-[20px] md:w-[45px] md:h-[45px] shadow-xl p-1 md:p-4 flex justify-center bg-slate-500 rounded-md md:rounded-xl items-center'><h1 className='font-bold text-base md:text-4xl'>-</h1></button>
       
          </div> 
          </div>}
        </div>
        </div>
        <div className='w-1/3 h-full flex justify-center items-center md:p-2   '>
         <div className={`w-1/2  h-3/4 flex  shadow-xl ${theme.name === "Snow White" ? "" :" bg-opacity-70"} bg-gray-800  rounded-2xl`}>
         <Tooltip showArrow content="Enjoy The Metronome While Playing The Piano :)"  classNames={{
    base: "bg-purple-500 text-white",
  }} placement='bottom'>
        <button onClick={metroShow} className='w-full h-full flex flex-col gap-6 justify-center items-center'>
        <h1 className={`text-white lg:text-2xl ${fullScreen ? "text-[10px]" : "md:text-sm text-[6px] "} text-center w-full`}>{isMetroPlaying ? "Stop" : "Metronomme"}</h1>
        </button>
          </Tooltip>
         </div> 
        
         <div className={` h-full w-1/2 md:p-2 p-1 flex items-center `}>
         <Tooltip showArrow content="Random Shuffle Your Fav. Theme"  classNames={{
    base: "bg-purple-500 text-white",
  }} placement='bottom'>
         <button onClick={randomShuffle} className='w-full h-3/4 bg-gray-800 rounded-2xl flex justify-center items-center'>
         <h1 className={` ${fullScreen ? "text-[10px]" : "md:text-sm text-[6px] lg:text-2xl "}  text-white`}>{theme.name}</h1>
         </button>
         </Tooltip>
         </div>
         {fullScreen && <div className='h-full w-1/2 md:p-2 p-1 flex items-center justify-center '>
          <button onClick={()=>setFullScreen(false)} className='h-3/4 w-full bg-red-700 rounded-xl text-white font-bold text-[10px]'>
           Close
          </button>
          </div>}
        </div>
     </div> 
     <div className='h-[60%] w-full  relative flex'>
     <div className='w-[5%] h-full  flex items-center justify-center hover:bg-blue-500'>
<button onClick={()=>scroll(-300)} className='rounded-lg w-full h-2/4 flex justify-center items-center'>
<img src="back-forward.png" alt="" className='w-[30px] h-[30px]' />
</button>
</div>
<div className='relative w-[90%] h-full flex overflow-x-auto scroll-smooth piano-container bg-white' ref={scrollPiano}>
     <div className='flex justify-center gap-0'>
     {whiteKeys.map((key, index) => 
    <div data-white-key={key.label}
    onClick={()=>playSound(key,index , key.label)} className={`md:w-[70px] ${fullScreen ? "w-[50px]" : "w-[45px]  "} h-full shadow-2xl z-10 ${activeKey.includes(index) || activeKeyThree.includes(key.note)    ? ` ${theme.activeKeyColor}  border-gray-300 scale-in` : "bg-white border border-gray-300"}  flex flex-col text-xs md:text-xl  items-end justify-end md:gap-20`  } key={index}> <div className='flex justify-center items-center w-full text-gray-600 select-none '>{key.alphabet} </div> <div className='flex w-full justify-center items-center select-none'>{key.label} </div></div>
    )}
     </div>
     <div className='flex gap-3  md:gap-6 absolute top-0 left-[20px]  md:left-[38px] h-1/2'>
{blackKeys.map((key, index) => 
key ? <div data-black-key={key.label} onClick={()=>playSoundTwo(key,index , key.label )} className={` ${fullScreen ? "w-[40px]" : "w-[35px]  "}  md:w-[50px] text-white ${activeKeyTwo.includes(index) || activeKeyFour.includes(key.note) ? "bg-blue-400  border-gray-300 scale-in" : "bg-gray-700"} z-20 py-6 gap-10 text-[10px] md:text-base   shadow-2xl rounded-b-xl flex flex-col ${["D#4" , "D#5", "D#6"].includes(key.label)? "mr-[34px] md:mr-0" : ""} items-end justify-end ${["A#4", "A#5"].includes(key.label) ? "mr-[42px] md:mr-[48px]" : "" }  ${["A#6"].includes(key.label)? "mr-[24px] md:mr-[48px]": ""}`} key={index}> <div className='w-full flex justify-center text-gray-400 select-none'>{key.alphabet}</div> <div className='w-full flex justify-center text-gray-300 select-none'>{key.label}</div></div> : <div className='w-0 md:w-[50px] h-[60%] bg-transparent  z-0' key={index}></div>
)}
     </div>
     </div>
     <div className='w-[5%] h-full  flex justify-center items-center hover:bg-blue-500'>
     <button onClick={()=>scroll(300)} className='rounded-lg w-full h-2/4   flex justify-center items-center'>
     <img src="fast-forward.png" alt="" className='w-[30px] h-[30px]' />
</button>
</div>
 </div>
 </div>
 <div>
  <audio ref={audioRef} className='hidden' src="/Classic.wav"></audio>
  <audio ref={audioRefTwo} className='hidden' src='/ClassicSecond.wav'></audio>
 </div>
 {!fullScreen && <div className=' sm:hidden h-[100px] w-[250px] bg-blue-500 rounded-xl absolute bottom-10'>
  <button onClick={fullScreenPiano} className = 'w-full h-full'>
  <h1 className='text-xl text-white'>Fullscreen</h1>
  </button>
 </div>}
</main>
  )
}
export default Paino