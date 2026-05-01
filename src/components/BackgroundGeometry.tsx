import { motion, useScroll, useTransform } from 'framer-motion';

export const BackgroundGeometry = () => {
  const { scrollYProgress } = useScroll();

  // Create complex transforms for various shapes scattered across the screen
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 1000]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 360]);

  const y2 = useTransform(scrollYProgress, [0, 1], [0, -1200]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [45, -180]);

  const y3 = useTransform(scrollYProgress, [0, 1], [0, 800]);
  const rotate3 = useTransform(scrollYProgress, [0, 1], [15, 90]);

  const y4 = useTransform(scrollYProgress, [0, 1], [0, -1500]);
  const rotate4 = useTransform(scrollYProgress, [0, 1], [90, 0]);

  const y5 = useTransform(scrollYProgress, [0, 1], [0, 1400]);
  const rotate5 = useTransform(scrollYProgress, [0, 1], [0, -120]);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <motion.div 
        style={{ y: y1, rotate: rotate1 }} 
        className="absolute top-[5%] -left-[10%] w-[30vw] h-[30vw] min-w-[300px] min-h-[300px] border border-zinc-800/80 bg-[#111]/30" 
      />
      
      <motion.div 
        style={{ y: y2, rotate: rotate2 }} 
        className="absolute bottom-[20%] -right-[5%] w-[40vw] h-[40vw] min-w-[400px] min-h-[400px] border border-zinc-800/50 bg-[#111]/20" 
      />

      <motion.div 
        style={{ y: y3, rotate: rotate3 }} 
        className="absolute top-[30%] left-[20%] w-[50vw] h-[50vw] min-w-[500px] min-h-[500px] border-[0.5px] border-zinc-900/80" 
      />

      <motion.div 
        style={{ y: y4, rotate: rotate4 }} 
        className="absolute top-[70%] left-[60%] w-[25vw] h-[25vw] min-w-[250px] min-h-[250px] border border-zinc-800/60 bg-[#111]/40" 
      />

      <motion.div 
        style={{ y: y5, rotate: rotate5 }} 
        className="absolute -top-[20%] right-[30%] w-[35vw] h-[35vw] min-w-[350px] min-h-[350px] border border-zinc-800/40" 
      />
    </div>
  );
};
