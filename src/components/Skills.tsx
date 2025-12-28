import { SKILLS_CATEGORIES } from '../constants/data';

export const Skills = () => {
  return (
    <section id="skills" className="py-24 px-6 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4">Technical Skills</h2>
        <p className="text-zinc-400 max-w-2xl mx-auto">
          Comprehensive expertise across modern mobile development stacks and cloud-native tools.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SKILLS_CATEGORIES.map((category, idx) => (
          <div 
            key={idx} 
            className="bg-[#111] border border-zinc-800 p-8 rounded-2xl hover:border-zinc-700 transition-all group"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-zinc-900 rounded-lg text-zinc-400 group-hover:text-white transition-colors">
                <category.icon size={20} />
              </div>
              <h3 className="font-semibold text-lg">{category.title}</h3>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {category.skills.map(skill => (
                <span 
                  key={skill} 
                  className="px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-lg text-xs font-medium text-zinc-400 hover:text-white hover:border-zinc-600 transition-all"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};