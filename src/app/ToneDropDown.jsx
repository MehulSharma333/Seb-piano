import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";

export default function ToneDropdown({
  disableSelect,
  selectedSound,
  setSelectedSound,
  fullScreen,
  setSustainNotes
}) {
  
  const [open, setOpen] = useState(false);
  const tones = [
    { key: "sound1", label: "Grand Piano" },
    { key: "sound2", label: "Rhodes" },
    { key: "sound3", label: "Stage Grand" },
    { key: "sound4", label: "Electric" },
  ];


 function toggleDropdown() {
  if (disableSelect) return ;
  setOpen((prev) => !prev);
  setSustainNotes(false);
 }


  return (
    <div className="h-1/2 w-full rounded-lg md:rounded-xl  flex">
      <div className="relative w-full h-full">
        {/* Trigger Button */}
        <button
          disabled={disableSelect}
          onClick={toggleDropdown}
          className={`flex items-center justify-between bg-black text-white w-full h-full rounded-2xl
            p-1 md:p-2  outline-none cursor-pointer
            ${fullScreen ? "text-[12px]" : "text-[6px] md:text-base"}
          `}
        >
          <span>
            {tones.find((t) => t.key === selectedSound)?.label || "Select Tone"}
          </span>
          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.25 }}
            className="ml-2"
          >
            <ChevronDown className="w-4 h-4 md:w-5 md:h-5" />
          </motion.span>
        </button>

        {/* Dropdown List */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="absolute left-0 mt-2 w-full bg-black rounded-lg  shadow-lg z-50 "
            >
              {tones.map((tone) => (
                <div
                  key={tone.key}
                  onClick={() => {
                    setSelectedSound(tone.key);
                    setOpen(false);
                  }}
                  className={`md:px-4 px-2 py-2 cursor-pointer text-xs md:text-sm transition-colors duration-200 text-white 
                    ${selectedSound === tone.key ? "bg-gray-800" : "hover:bg-gray-700"}
                    
                  `}
                >
                  {tone.label}
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
