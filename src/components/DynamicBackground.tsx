'use client';

import { useEffect, useRef } from 'react';

const DynamicBackground = ({ children }: { children: React.ReactNode }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Initial size
    updateCanvasSize();

    // Update on resize
    window.addEventListener('resize', updateCanvasSize);

    // Animation variables
    let particles: { x: number; y: number; size: number; speed: number; color: string; opacity: number }[] = [];
    const particleCount = 30; // Reduced from 50
    
    // Create particles
    const createParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5, // Smaller particles
          speed: Math.random() * 0.5 + 0.1, // Slower movement
          color: i % 3 === 0 ? '#00ff88' : i % 3 === 1 ? '#ff9900' : '#00aaff',
          opacity: Math.random() * 0.3 + 0.1 // Lower opacity
        });
      }
    };

    // Draw function
    const draw = () => {
      if (!ctx || !canvas) return;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw particles
      particles.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color + Math.floor(particle.opacity * 255).toString(16).padStart(2, '0');
        ctx.fill();
        
        // Move particles
        particle.y -= particle.speed;
        
        // Reset particles that go off screen
        if (particle.y < -10) {
          particle.y = canvas.height + 10;
          particle.x = Math.random() * canvas.width;
        }
      });
      
      // Draw candlestick chart overlay - only in bottom 30% of screen
      if (window.innerHeight > 600) { // Only draw chart if screen is tall enough
        drawCandlestickChart(ctx, canvas);
      }
      
      requestAnimationFrame(draw);
    };
    
    // Draw candlestick chart
    const drawCandlestickChart = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
      // Only draw in bottom 30% of screen
      const chartStartY = canvas.height * 0.7;
      const chartHeight = canvas.height * 0.3;
      const chartWidth = canvas.width;
      const candleCount = 20;
      const candleWidth = chartWidth / candleCount;
      
      // Draw grid lines with very subtle opacity
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;
      
      // Horizontal grid lines
      for (let i = 0; i < 5; i++) {
        const y = chartStartY + (i * chartHeight / 4);
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(chartWidth, y);
        ctx.stroke();
      }
      
      // Generate random candlestick data
      const now = Date.now();
      const seed = Math.floor(now / 10000); // Change seed every 10 seconds
      const random = (i: number) => {
        // Deterministic random based on seed and index
        return ((Math.sin(seed + i * 100) + 1) / 2);
      };
      
      // Draw candlesticks
      for (let i = 0; i < candleCount; i++) {
        const x = i * candleWidth;
        
        // Generate values based on seed for consistency
        const open = 50 + random(i) * 50;
        const close = 50 + random(i + 0.5) * 50;
        const high = Math.max(open, close) + random(i + 0.25) * 20;
        const low = Math.min(open, close) - random(i + 0.75) * 20;
        
        // Map to chart coordinates
        const yOpen = chartStartY + chartHeight * (1 - open / 100);
        const yClose = chartStartY + chartHeight * (1 - close / 100);
        const yHigh = chartStartY + chartHeight * (1 - high / 100);
        const yLow = chartStartY + chartHeight * (1 - low / 100);
        
        // Draw candlestick
        const isUp = close > open;
        const candleColor = isUp ? 'rgba(0, 255, 136, 0.5)' : 'rgba(255, 82, 82, 0.5)';
        
        // Draw wick
        ctx.beginPath();
        ctx.moveTo(x + candleWidth / 2, yHigh);
        ctx.lineTo(x + candleWidth / 2, yLow);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.stroke();
        
        // Draw body
        ctx.fillStyle = candleColor;
        ctx.fillRect(
          x + candleWidth * 0.2,
          Math.min(yOpen, yClose),
          candleWidth * 0.6,
          Math.abs(yClose - yOpen)
        );
      }
      
      // Draw moving average line
      ctx.beginPath();
      ctx.moveTo(0, chartStartY + chartHeight * 0.5);
      
      for (let i = 0; i < candleCount; i++) {
        const x = i * candleWidth + candleWidth / 2;
        // Create a smooth curve using sine wave
        const y = chartStartY + chartHeight * (0.5 + 0.3 * Math.sin((now / 5000) + i / 3));
        
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      
      ctx.strokeStyle = 'rgba(255, 165, 0, 0.5)';
      ctx.lineWidth = 2;
      ctx.stroke();
    };
    
    // Initialize
    createParticles();
    draw();

    // Cleanup
    return () => {
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background image with overlay */}
      <div 
        ref={backgroundRef}
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: 'url(/images/new_background.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          filter: 'brightness(0.3) contrast(1.2)'
        }}
      />
      
      {/* Canvas for animated elements */}
      <canvas 
        ref={canvasRef}
        className="fixed inset-0 z-10 pointer-events-none"
        style={{ opacity: 0.6 }}
      />
      
      {/* Grid overlay - much more subtle */}
      <div 
        className="fixed inset-0 z-20 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 30, 60, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 30, 60, 0.05) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
          opacity: 0.3
        }}
      />
      
      {/* Content */}
      <div className="relative z-30">
        {children}
      </div>
    </div>
  );
};

export default DynamicBackground;
