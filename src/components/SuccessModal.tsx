/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Mail, Sparkles, Trophy, HandMetal } from 'lucide-react';
import { IdeaSubmission } from '../types';

interface SuccessModalProps {
  isOpen: boolean;
  submission: IdeaSubmission | null;
  onClose: () => void;
}

interface Particle {
  x: number;
  y: number;
  color: string;
  size: number;
  speedX: number;
  speedY: number;
  rotation: number;
  rotationSpeed: number;
  gravity: number;
  opacity: number;
}

export default function SuccessModal({ isOpen, submission, onClose }: SuccessModalProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Self-contained physics-based Canvas Confetti System
  useEffect(() => {
    if (!isOpen || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions to full viewport
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    // Create 130 confetti particles
    const colors = ['#f97316', '#f59e0b', '#3b82f6', '#ec4899', '#ffffff', '#10b981'];
    const particles: Particle[] = [];

    for (let i = 0; i < 130; i++) {
      // Launch from left & right bottoms
      const fromLeft = Math.random() > 0.5;
      particles.push({
        x: fromLeft ? 20 : canvas.width - 20,
        y: canvas.height - 20,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 8 + 6,
        speedX: (fromLeft ? 1 : -1) * (Math.random() * 12 + 8),
        speedY: -(Math.random() * 16 + 12),
        rotation: Math.random() * 360,
        rotationSpeed: Math.random() * 10 - 5,
        gravity: 0.45,
        opacity: 1
      });
    }

    let animationId: number;
    let frames = 0;

    const renderLoop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;

      particles.forEach((p) => {
        if (p.opacity > 0 && p.y < canvas.height + 50) {
          alive = true;
          p.x += p.speedX;
          p.y += p.speedY;
          p.speedY += p.gravity;
          p.speedX *= 0.98; // Friction
          p.rotation += p.rotationSpeed;
          p.opacity = Math.max(0, p.opacity - 0.008); // Slow fade out

          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.opacity;
          
          // Draw rectangle or circle
          if (p.size % 2 === 0) {
            ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 1.5);
          } else {
            ctx.beginPath();
            ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
            ctx.fill();
          }
          
          ctx.restore();
        }
      });

      frames++;
      // Stop looping after 300 frames if all faded
      if (alive && frames < 350) {
        animationId = requestAnimationFrame(renderLoop);
      }
    };

    renderLoop();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto">
        
        {/* Confetti canvas overlaying the viewport */}
        <canvas
          ref={canvasRef}
          className="fixed inset-0 pointer-events-none z-10"
        />

        {/* Glass backdrop overlay */}
        <motion.div
          id="success-backdrop"
          className="fixed inset-0 bg-black/90 backdrop-blur-md z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        {/* Modal Container */}
        <motion.div
          id="success-modal-card"
          className="relative z-20 glass-panel p-6 sm:p-10 rounded-[24px] border border-white/10 max-w-lg w-full text-center overflow-hidden shadow-2xl"
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 30 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
        >
          {/* Top glowing ambient dot */}
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-40 h-40 rounded-full bg-brand-orange/20 blur-[50px] pointer-events-none" />

          {/* Success checklist animated checkmark circle */}
          <div className="relative flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-tr from-brand-orange to-brand-amber mx-auto mb-8 shadow-xl shadow-brand-orange/20">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            >
              <Check className="w-10 h-10 text-black stroke-[3px]" />
            </motion.div>
          </div>

          {/* Congratulations Title */}
          <h3 className="text-2xl sm:text-3xl font-black text-white mb-2 tracking-tight uppercase">
            Proposal Transmitted!
          </h3>

          <div className="flex items-center justify-center gap-1.5 text-brand-orange text-xs font-mono font-bold uppercase tracking-wider mb-6">
            <Sparkles className="w-4 h-4 animate-pulse" />
            <span>Design Locked Successfully</span>
          </div>

          {/* Idea Submission Title Summary */}
          {submission && (
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-left mb-6 max-w-sm mx-auto flex items-start gap-3">
              <div className="mt-1 flex-shrink-0 w-8 h-8 rounded-lg bg-brand-orange/10 border border-brand-orange/20 flex items-center justify-center text-brand-orange">
                <Trophy className="w-4 h-4" />
              </div>
              <div className="overflow-hidden">
                <span className="text-[10px] font-mono uppercase text-white/40 font-bold block">
                  Concept Title
                </span>
                <span className="text-white text-sm font-bold truncate block">
                  {submission.ideaTitle}
                </span>
                <span className="text-white/50 text-xs truncate block font-light">
                  by {submission.fullName} ({submission.semester} ECE)
                </span>
              </div>
            </div>
          )}

          {/* Premium Thank You Statement */}
          <p className="text-white/55 text-xs sm:text-sm font-light leading-relaxed mb-8 max-w-sm mx-auto">
            Thank you for sharing your idea! Every submission helps us create an unforgettable orientation experience for our new students. If your idea is shortlisted, PULSE CEA may contact you to join the organizing team.
          </p>

          {/* Close Action Button */}
          <button
            id="close-success-modal"
            onClick={onClose}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-brand-orange to-brand-amber text-black font-extrabold uppercase tracking-widest text-xs hover:scale-[1.01] hover:shadow-lg hover:shadow-brand-orange/20 transition-all duration-300 shadow-md cursor-pointer"
          >
            Done, Return to Hub
          </button>

          {/* Micro Footer info */}
          <div className="mt-5 flex items-center justify-center gap-1 text-[10px] text-white/30 font-mono font-semibold">
            <Mail className="w-3.5 h-3.5" />
            <span>A confirmation will load in your sheet</span>
          </div>

        </motion.div>

      </div>
    </AnimatePresence>
  );
}
