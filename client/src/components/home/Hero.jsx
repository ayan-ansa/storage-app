import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Hero() {
  return (
    <section className="pt-32 pb-20 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-br from-blue-500/10 via-transparent to-indigo-500/10 pointer-events-none" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}} />
      
      <div className="max-w-7xl mx-auto relative">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block mb-6 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-300 font-semibold text-sm animate-fade-in">
            ☁️ Your Personal Cloud Storage Solution
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            <span className="bg-linear-to-r from-slate-100 via-blue-100 to-indigo-100 bg-clip-text text-transparent">
              Store Everything.
            </span>
            <br />
            <span className="bg-linear-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Access Anywhere.
            </span>
          </h1>
          
          <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            MyStore is your secure, intelligent file management platform. Upload, organize, and share your files with enterprise-grade security and lightning-fast performance.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{animationDelay: '0.3s'}}>
            <Button size="lg" className="bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-lg px-8 py-6 shadow-xl shadow-blue-500/40 hover:shadow-blue-500/60 hover:scale-105 transition-all">
              Start Free Trial
            </Button>
            <Button size="lg" variant="outline" className="bg-slate-800 text-slate-200 border-slate-700 hover:border-blue-500 text-lg px-8 py-6 hover:scale-105 transition-all">
              Watch Demo
            </Button>
          </div>

          <div className="mt-12 flex items-center justify-center gap-8 text-sm text-slate-400 animate-fade-in" style={{animationDelay: '0.4s'}}>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-emerald-400" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-emerald-400" />
              <span>500MB free storage</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
