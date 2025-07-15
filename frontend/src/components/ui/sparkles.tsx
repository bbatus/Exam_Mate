import { useId, useMemo } from "react";
import { useEffect, useState } from "react";
import { Particles, initParticlesEngine } from "@tsparticles/react";
import type { Container, ISourceOptions } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import { cn } from "@/lib/utils";
import { motion, useAnimation } from "framer-motion";

type ParticlesProps = {
  id?: string;
  className?: string;
  background?: string;
  minSize?: number;
  maxSize?: number;
  speed?: number;
  particleColor?: string;
  particleDensity?: number;
};

export const SparklesCore = (props: ParticlesProps) => {
  const {
    id,
    className,
    background,
    minSize,
    maxSize,
    speed,
    particleColor,
    particleDensity,
  } = props;
  const [init, setInit] = useState(false);
  useEffect(() => {
    initParticlesEngine(async (engine: any) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);
  const controls = useAnimation();

  const particlesLoaded = async (container?: Container) => {
    if (container) {
      controls.start({
        opacity: 1,
        transition: {
          duration: 1,
        },
      });
    }
  };

  const generatedId = useId();
  
  const options: ISourceOptions = useMemo(
    () => ({
      background: {
        color: {
          value: background || "transparent",
        },
      },
      fullScreen: {
        enable: false,
        zIndex: 1,
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "push",
          },
          onHover: {
            enable: false,
            mode: "repulse",
          },
        },
        modes: {
          push: {
            quantity: 4,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
          },
        },
      },
      particles: {
        color: {
          value: particleColor || "#ffffff",
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "out",
          },
          random: false,
          speed: speed || 1,
          straight: false,
        },
        number: {
          density: {
            enable: true,
            value_area: particleDensity || 800,
          },
          value: particleDensity || 80,
        },
        opacity: {
          value: {
            min: 0.1,
            max: 1,
          },
          animation: {
            enable: true,
            speed: speed || 3,
            minimumValue: 0.1,
            sync: false,
          },
        },
        shape: {
          type: "circle",
        },
        size: {
          value: {
            min: minSize || 0.5,
            max: maxSize || 1,
          },
          animation: {
            enable: true,
            speed: speed || 20,
            minimumValue: minSize || 0.1,
            sync: false,
          },
        },
      },
      detectRetina: true,
    }),
    [background, particleColor, particleDensity, minSize, maxSize, speed]
  );

  return (
    <motion.div animate={controls} className={cn("opacity-0", className)}>
      {init && (
        <Particles
          id={id || generatedId}
          className={cn("h-full w-full")}
          particlesLoaded={particlesLoaded}
          options={options}
        />
      )}
    </motion.div>
  );
}; 