import { Shield, File, Cloud, Share2, Settings, Zap } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const features = [
  {
    icon: Shield,
    title: "Enterprise-Grade Security",
    description: "Secure access with OAuth (Google & GitHub), 2FA, and encrypted storage. Your data is protected by industry-leading security standards.",
    color: "from-blue-500 to-cyan-400"
  },
  {
    icon: File,
    title: "Intelligent File Management",
    description: "Upload any file type with drag-and-drop ease. Organize with grid views, powerful search, and instant previews for documents and media.",
    color: "from-purple-500 to-pink-400"
  },
  {
    icon: Cloud,
    title: "Seamless Cloud Integration",
    description: "Import directly from Google Drive and enjoy lightning-fast global access via CloudFront CDN and AWS S3 storage.",
    color: "from-emerald-500 to-teal-400"
  },
  {
    icon: Share2,
    title: "Advanced Sharing Controls",
    description: "Share securely with granular permissions. Control who views or edits your files with role-based access and real-time activity logs.",
    color: "from-orange-500 to-red-400"
  },
  {
    icon: Settings,
    title: "Comprehensive Admin Tools",
    description: "Manage users, monitor storage usage, and control system-wide settings from a powerful, centralized dashboard.",
    color: "from-fuchsia-500 to-purple-400"
  },
  {
    icon: Zap,
    title: "Lightning Fast Performance",
    description: "Experience zero latency with optimized global content delivery, ensuring your files are always available when you need them.",
    color: "from-yellow-500 to-amber-400"
  }
];

export function Features() {
  return (
    <section id="features" className="py-24 px-6 bg-slate-900/50 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4 bg-linear-to-r from-slate-100 to-blue-100 bg-clip-text text-transparent">
            Powerful Features
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Everything you need to manage, secure, and share your files with confidence
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="group relative bg-linear-to-br from-slate-800 to-slate-900 border-slate-700 hover:border-blue-500/50 transition-all duration-500 hover:shadow-xl hover:shadow-blue-500/20 hover:-translate-y-1"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <CardHeader>
                  <div className={`w-14 h-14 rounded-xl bg-linear-to-br ${feature.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <CardTitle className="text-xl text-slate-100">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-slate-400 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
