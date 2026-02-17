import { UserPlus, Upload, Link2 } from 'lucide-react';

const steps = [
  {
    number: 1,
    icon: UserPlus,
    title: "Create an account",
    description: "Sign up for free in seconds. No credit card required to get started with 500MB of secure storage.",
    color: "from-blue-500 to-indigo-500"
  },
  {
    number: 2,
    icon: Upload,
    title: "Upload your files",
    description: "Drag and drop your documents, images, and videos. We support all major file types with high-speed upload.",
    color: "from-purple-500 to-pink-500"
  },
  {
    number: 3,
    icon: Link2,
    title: "Share & Access",
    description: "Generate secure links, set expiration dates, and access your files from any device, anywhere in the world.",
    color: "from-emerald-500 to-cyan-500"
  }
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-6 bg-linear-to-br from-slate-900 to-blue-950/50 relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4 bg-linear-to-r from-slate-100 to-blue-100 bg-clip-text text-transparent">
            How it works
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Get started with MyStore in three simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connection Lines */}
          <div className="hidden md:block absolute top-24 left-1/6 right-1/6 h-0.5 bg-linear-to-r from-blue-500/30 via-indigo-500/30 to-blue-500/30" />
          
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative">
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-6">
                    <div className={`w-20 h-20 rounded-full bg-linear-to-br ${step.color} flex items-center justify-center shadow-xl relative z-10`}>
                      <Icon className="w-10 h-10 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-lg z-20">
                      {step.number}
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-3 text-slate-100">
                    {step.title}
                  </h3>
                  
                  <p className="text-slate-400 leading-relaxed max-w-sm">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
