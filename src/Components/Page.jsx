import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ASSETS
import jumpscaresound from "/myinstants.mp3";
import stardewValleyBackground from "/StardewValleyBackground.png";
import stardewWinningPicture from "/stardew.jpg";
import stardewMusic from "/StardewValley.mp3";
import dancingGifUrl from "/giphy.gif";
import celebrationMusic from "/celebrationmusic.mp3";

// TYPEWRITER COMPONENT
const TypewriterText = ({ text }) => {
    const [displayedText, setDisplayedText] = useState("");
    useEffect(() => {
        let i = 0;
        const timer = setInterval(() => {
            setDisplayedText((prev) => prev + text.charAt(i));
            i++;
            if (i >= text.length) clearInterval(timer);
        }, 40); // Speed of typing
        return () => clearInterval(timer);
    }, [text]);

    return <span>{displayedText}</span>;
};

export default function ValentineRequest() {
    const questions = [
        "do you love me?",
        "but do you love Israel? ",
        "Are you free on Saturday Evening?",
        "Will you be my valentine?",
    ];

    const treeImages = ["/tree1.jpg", "/Netenyahu.png", "/tree2.jpg", "/tree3.jpg"];

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
    const [isAccepted, setIsAccepted] = useState(false);
    const [showScare, setShowScare] = useState(false);
    const [hasStarted, setHasStarted] = useState(false);

    const bgAudioRef = useRef(null);
    const winAudioRef = useRef(null);
    const scareAudioRef = useRef(null);

    useEffect(() => {
        if (isAccepted) {
            if (bgAudioRef.current) bgAudioRef.current.pause();
            if (winAudioRef.current) {
                winAudioRef.current.volume = 1.0;
                winAudioRef.current.play().catch((e) => console.error("Win audio failed:", e));
            }
        }
    }, [isAccepted]);

    const startExperience = () => {
        setHasStarted(true);
        setTimeout(() => {
            if (bgAudioRef.current) {
                bgAudioRef.current.play().catch((e) => console.error("BG Music error:", e));
            }
        }, 50);
    };

    const handleNoInteraction = (e) => {
        if (e.type === "touchstart") e.preventDefault();
        if (scareAudioRef.current) {
            scareAudioRef.current.currentTime = 0;
            scareAudioRef.current.play();
        }
        setShowScare(true);
        setTimeout(() => setShowScare(false), 450);

        const padding = 120;
        const newX = (Math.random() - 0.5) * (window.innerWidth - padding);
        const newY = (Math.random() - 0.5) * (window.innerHeight - padding);
        setNoButtonPos({ x: newX, y: newY });
    };

    const handleYesClick = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion((prev) => prev + 1);
            setNoButtonPos({ x: 0, y: 0 });
        } else {
            setIsAccepted(true);
        }
    };

    // 1. ENTRY SCREEN FIX
    if (!hasStarted) {
        return (
            <div
                style={{
                    backgroundColor: "black",
                    height: "100dvh",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "20px",
                    color: "white",
                    textAlign: "center",
                }}
            >
                <div
                    style={{
                        maxWidth: "600px",
                        fontSize: "1.2rem",
                        lineHeight: "1.6",
                        fontFamily: "monospace", // Makes it look more like a game
                        marginBottom: "30px",
                        minHeight: "150px", // Prevents button from jumping around
                    }}
                >
                    <TypewriterText text="Ehda! Hi Baby! I didn't see you there! I missed you a lot. Like..A LOT. thank you loving me in  ways I could'nt have possibly imagined. I love you more than there are stars in the universe and more than there are kabary in madinat nasr. press Enter (suspicious reasons)" />
                </div>
                <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 6 }} // Wait for typing to finish or nearly finish
                    onClick={startExperience}
                    style={{
                        padding: "15px 40px",
                        borderRadius: "50px",
                        border: "none",
                        background: "#ff4d6d",
                        color: "white",
                        fontWeight: "bold",
                        cursor: "pointer",
                        fontSize: "1.2rem",
                    }}
                >
                    Enter
                </motion.button>
            </div>
        );
    }

    // 2. SUCCESS SCREEN
    if (isAccepted) {
        return (
            <div
                style={{
                    backgroundColor: "#1a1a1a",
                    height: "100dvh",
                    width: "100vw",
                    position: "fixed",
                    top: 0,
                    left: 0,
                    overflow: "hidden",
                }}
            >
                <audio ref={winAudioRef} loop src={celebrationMusic} />
                <motion.img
                    src={dancingGifUrl}
                    style={{ width: "150px", borderRadius: "15px", position: "absolute", top: 0, left: 0, zIndex: 5 }}
                    animate={{
                        x: [0, window.innerWidth - 150, 0, window.innerWidth - 150, 0],
                        y: [0, window.innerHeight - 150, window.innerHeight / 2, 0, window.innerHeight - 150],
                    }}
                    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                />
                <div
                    style={{
                        height: "100%",
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        position: "relative",
                        zIndex: 10,
                        pointerEvents: "none",
                    }}
                >
                    <motion.h1
                        animate={{ scale: [1, 1.1, 1], filter: ["hue-rotate(0deg)", "hue-rotate(360deg)"] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        style={{ color: "#ff4d6d", fontSize: "2.5rem", marginBottom: "20px", padding: "0 10px", textShadow: "0 0 20px black" }}
                    >
                        YAY! THANK YOU I LOVE YOU SM! 💖
                    </motion.h1>
                    <motion.img
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        src={stardewWinningPicture}
                        style={{ width: "80%", maxWidth: "350px", borderRadius: "20px", boxShadow: "0 0 40px rgba(0,0,0,0.8)" }}
                    />
                </div>
            </div>
        );
    }

    // 3. MAIN INTERACTION SCREEN
    return (
        <div style={{ height: "100dvh", width: "100vw", overflow: "hidden", position: "fixed", top: 0, left: 0 }}>
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundImage: `url(${stardewValleyBackground})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    zIndex: -1,
                }}
            />
            <audio ref={bgAudioRef} loop src={stardewMusic} />
            <audio ref={scareAudioRef} src={jumpscaresound} />
            <AnimatePresence>
                {showScare && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{ position: "fixed", inset: 0, zIndex: 1000, backgroundColor: "black", display: "flex", justifyContent: "center", alignItems: "center" }}
                    >
                        <img src={treeImages[currentQuestion]} alt="Scare" style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} />
                    </motion.div>
                )}
            </AnimatePresence>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", zIndex: 1 }}>
                <motion.h1
                    key={currentQuestion}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ fontSize: "2.2rem", color: "white", textShadow: "3px 3px 0px #000", textAlign: "center", padding: "0 20px", marginBottom: "40px" }}
                >
                    {questions[currentQuestion]}
                </motion.h1>
                <div style={{ display: "flex", gap: "20px", position: "relative" }}>
                    <button
                        onClick={handleYesClick}
                        style={{ padding: "15px 35px", fontSize: "1.2rem", borderRadius: "12px", border: "none", background: "#4caf50", color: "white", fontWeight: "bold", cursor: "pointer", zIndex: 10 }}
                    >
                        Yes!
                    </button>
                    <motion.button
                        animate={{ x: noButtonPos.x, y: noButtonPos.y }}
                        onMouseEnter={handleNoInteraction}
                        onTouchStart={handleNoInteraction}
                        transition={{ type: "spring", stiffness: 600, damping: 20 }}
                        style={{ padding: "15px 35px", fontSize: "1.2rem", borderRadius: "12px", border: "none", background: "#f44336", color: "white", fontWeight: 'bold', cursor: 'pointer' }}
                    >
                        No
                    </motion.button>
                </div>
            </div>
        </div>
    );
}