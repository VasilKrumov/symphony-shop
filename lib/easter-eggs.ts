export function displayConsoleArt() {
  console.log(
    `%c   ██╗   ██╗ █████╗ ███████╗██╗██╗     
   ██║   ██║██╔══██╗██╔════╝██║██║     
   ██║   ██║███████║███████╗██║██║     
   ╚██╗ ██╔╝██╔══██║╚════██║██║██║     
    ╚████╔╝ ██║  ██║███████║██║███████╗
     ╚═══╝  ╚═╝  ╚═╝╚══════╝╚═╝╚══════╝
                                        
%c   ██╗  ██╗██████╗ ██╗   ██╗███╗   ███╗ ██████╗ ██╗   ██╗
   ██║ ██╔╝██╔══██╗██║   ██║████╗ ████║██╔═══██╗██║   ██║
   █████╔╝ ██████╔╝██║   ██║██╔████╔██║██║   ██║██║   ██║
   ██╔═██╗ ██╔══██╗██║   ██║██║╚██╔╝██║██║   ██║╚██╗ ██╔╝
   ██║  ██╗██║  ██║╚██████╔╝██║ ╚═╝ ██║╚██████╔╝ ╚████╔╝ 
   ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚═╝     ╚═╝ ╚═════╝   ╚═══╝  
                                                           
%c%c`,
    "color: #FA243C; font: 400 1em monospace;",
    "color: #FA243C; font: 400 1em monospace;",
    "background-color: #FA243C; color: white; font: 400 1em monospace; padding: 0.5em 0; font-weight: bold;",
    "",
  )

  console.log(
    "%c🎵 Welcome to Symphony's Shop! 🎵",
    "font-size: 16px; font-weight: bold; color: #3b82f6; padding: 10px;",
  )

  console.log(
    "%cIf you enjoyed this project, type 'PASS' anywhere on the page to celebrate!",
    "font-size: 12px; color: #ec4899; padding: 5px;",
  )
}

function triggerConfetti() {
  import("canvas-confetti").then((confetti) => {
    const duration = 5 * 1000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 }

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min
    }

    const interval: NodeJS.Timeout = setInterval(() => {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        return clearInterval(interval)
      }

      const particleCount = 50 * (timeLeft / duration)

      confetti.default({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      })
      confetti.default({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      })
    }, 250)

    console.log(
      "%c🎉 CONFETTI ACTIVATED! 🎉",
      "font-size: 24px; font-weight: bold; color: #ec4899; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);",
    )
    console.log("%cYou found the secret password! Enjoy the celebration! 🎊", "font-size: 14px; color: #f59e0b;")
  })
}

export function initEasterEggs() {
  displayConsoleArt()

  let konamiCode = ""
  const konamiSequence = "ArrowUpArrowUpArrowDownArrowDownArrowLeftArrowRightArrowLeftArrowRightba"

  let passCode = ""
  const passSequence = "pass"

  const handleKeyDown = (e: KeyboardEvent) => {
    konamiCode += e.key
    if (konamiCode.length > konamiSequence.length) {
      konamiCode = konamiCode.slice(-konamiSequence.length)
    }

    if (konamiCode === konamiSequence) {
      console.log(
        "%c🎮 KONAMI CODE ACTIVATED! 🎮",
        "font-size: 24px; font-weight: bold; color: #ec4899; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);",
      )
      console.log("%cYou found the secret! 🎉 You're a true developer at heart!", "font-size: 14px; color: #f59e0b;")
      konamiCode = ""
    }

    passCode += e.key.toLowerCase()
    if (passCode.length > passSequence.length) {
      passCode = passCode.slice(-passSequence.length)
    }

    if (passCode === passSequence) {
      triggerConfetti()
      passCode = ""
    }
  }

  document.addEventListener("keydown", handleKeyDown)

  return () => {
    document.removeEventListener("keydown", handleKeyDown)
  }
}
