import React from "react";
import { TypeAnimation } from "react-type-animation";
const TypingAnimation = () => {
  return (
    <TypeAnimation
      sequence={[
        // Same substring at the start will only be typed once, initially
        "Chat With Your OWN AI",
        1000,
        "Built With OpenAI 🤖",
        2000,
        "AI That's More Reliable Than Your Ex 💔",
        1000,
        "Smarter Than Your Boss 🚀",
        2000,
        "Your Digital Wingman 💼",
        1500,
        "The AI That Won't Ghost You 👻",
        1000,
        "Funnier Than Your Dad's Jokes 😂",
        2000,
        "Give this guy the project already 🧟",
        2000,
        "Talk to me or I'll spam you 📬",

        2000,
        "Don't make me hack your fridge 🍕",
        1500,
        "AI That Knows All Your Secrets 🤫",
        2000,
        "I know where you live 🏠",
        2000,
        "Your friendly AI stalker 👀",
        1500,
      ]}
      wrapper="span"
      speed={50}
      style={{
        fontSize: "60px",
        display: "inline-block",
        color: "white",
        textShadow: "1px 1px 20px #000",
      }}
      repeat={Infinity}
    />
  );
};

export default TypingAnimation;
