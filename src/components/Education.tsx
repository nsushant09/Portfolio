import { motion } from 'framer-motion';
import { EDUCATION } from '../constants/data';
import { GraduationCap, MapPin, Calendar } from 'lucide-react';

export const Education = () => {
    return (
        <section className="py-20 px-6 bg-[#0a0a0a]" id="education">
            <div className="max-w-6xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl font-bold mb-12 flex items-center gap-3"
                >
                    <GraduationCap className="text-purple-500" size={32} />
                    Education
                </motion.h2>

                <div className="grid md:grid-cols-2 gap-8">
                    {EDUCATION.map((edu, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-zinc-900/50 p-8 rounded-2xl border border-zinc-800 hover:border-purple-500/50 transition-colors group"
                        >
                            <h3 className="text-2xl font-bold mb-2 group-hover:text-purple-400 transition-colors">
                                {edu.institution}
                            </h3>
                            <div className="text-xl text-white mb-4">{edu.degree}</div>

                            <div className="flex flex-col gap-2 text-zinc-400 text-sm mb-4">
                                <div className="flex items-center gap-2">
                                    <MapPin size={16} />
                                    <span>{edu.location}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar size={16} />
                                    <span>{edu.date}</span>
                                </div>
                            </div>

                            {edu.description && (
                                <p className="text-zinc-500 text-sm mt-4 pt-4 border-t border-zinc-800/50">
                                    {edu.description}
                                </p>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
