"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import confetti from "canvas-confetti";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function ValentinePage() {
  const [showLetter, setShowLetter] = useState(false);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [attempts, setAttempts] = useState(0);
  const [accepted, setAccepted] = useState(false);

  const moveNoButton = () => {
    // Increase distance every time user tries to reach "No"
    const distance = 250 + attempts * 120;
    const angle = Math.random() * Math.PI * 2;

    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;

    setAttempts((prev) => prev + 1);
    setNoPosition({ x, y });
  };

  const celebrateYes = () => {
    setAccepted(true);

    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
    });

    setTimeout(() => {
      confetti({ particleCount: 80, spread: 100, origin: { x: 0.2 } });
      confetti({ particleCount: 80, spread: 100, origin: { x: 0.8 } });
    }, 300);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-pink-200 via-pink-100 to-rose-200 flex items-center justify-center p-4">
      <Card className="max-w-xl w-full rounded-2xl shadow-xl bg-pink-50">
        <CardContent className="p-6 text-center space-y-6">
          {/* Teddy */}
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-7xl cursor-pointer"
            onClick={() => setShowLetter(true)}
          >
            🧸
          </motion.div>

          <p className="text-sm text-pink-700">Tap the teddy 💕</p>

          {/* Letter */}
          {showLetter && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-xl p-5 shadow-md"
            >
              {!accepted ? (
                <>
                  <p
                    className="font-[cursive] text-pink-800 text-lg leading-relaxed"
                    style={{ fontFamily: "'Comic Sans MS', cursive" }}
                  >
                    My love 💗,<br />
                    Every moment with you feels like a warm hug from this teddy.
                    You make my world softer, brighter, and full of smiles.
                    I just want you to know how deeply I love you and how special you are to me.
                  </p>

                  <p className="mt-4 text-xl font-semibold text-rose-600">
                    Will you be my Valentine? 💖
                  </p>

                  {/* Buttons */}
                  <div className="relative mt-6 flex justify-center gap-6">
                    {/* YES button */}
                    <Button
                      onClick={celebrateYes}
                      className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-xl"
                    >
                      Yes 💘
                    </Button>

                    {/* NO button that always escapes */}
                    <motion.div
                      animate={{ x: noPosition.x, y: noPosition.y }}
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                      onMouseEnter={moveNoButton}
                      onMouseDown={moveNoButton}
                      onTouchStart={moveNoButton}
                    >
                      <Button
                        variant="outline"
                        className="border-pink-400 text-pink-600 px-6 py-2 rounded-xl pointer-events-none select-none"
                      >
                        No 🙈
                      </Button>
                    </motion.div>
                  </div>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-4"
                >
                  <p className="text-2xl font-semibold text-rose-600">
                    YAYYY!! 💕🥰
                  </p>
                  <p className="text-pink-700">
                    You just made me the happiest person alive.
                  </p>
                </motion.div>
              )}
            </motion.div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
