import { useState } from 'react';
import { Check } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const plans = [
  {
    name: "Free",
    badge: "STARTER PLAN",
    badgeColor: "bg-emerald-500",
    icon: "🌱",
    description: "Personal users who want to try the platform",
    price: "Free",
    period: "",
    buttonText: "Get Started",
    buttonStyle: "bg-linear-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600",
    features: [
      "500 MB secure storage",
      "File upload limit: 100 MB per file",
      "Access from 1 device",
      "Standard download speed",
      "Basic email support"
    ],
    borderColor: "border-emerald-500/30"
  },
  {
    name: "Pro",
    badge: "MOST POPULAR",
    badgeColor: "bg-blue-500",
    icon: "⚡",
    description: "Students, freelancers, or small teams who need more space",
    price: "₹299",
    period: "/month",
    buttonText: "Subscribe Now",
    buttonStyle: "bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600",
    features: [
      "200 GB secure storage",
      "File upload limit: 2 GB per file",
      "Access from up to 3 devices",
      "Priority upload/download speed",
      "Email & chat support"
    ],
    borderColor: "border-blue-500/50",
    popular: true
  },
  {
    name: "Premium",
    badge: null,
    badgeColor: "",
    icon: "👑",
    description: "Professionals and creators handling large media files",
    price: "₹699",
    period: "/month",
    buttonText: "Subscribe Now",
    buttonStyle: "bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-900 hover:to-black",
    features: [
      "2 TB secure storage",
      "File upload limit: 10 GB per file",
      "Access from up to 3 devices",
      "Priority upload/download speed",
      "Priority customer support"
    ],
    borderColor: "border-slate-300/30"
  }
];

export function Pricing() {
  const [activeTab, setActiveTab] = useState('monthly');

  return (
    <section id="pricing" className="py-24 px-6 bg-slate-900/50 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold mb-4 bg-linear-to-r from-slate-100 to-blue-100 bg-clip-text text-transparent">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-8">
            Choose the perfect plan for your storage needs
          </p>

          <div className="inline-flex items-center gap-2 p-1 bg-slate-800 rounded-xl">
            <Button
              onClick={() => setActiveTab('monthly')}
              variant={activeTab === 'monthly' ? 'default' : 'ghost'}
              className={activeTab === 'monthly' ? 'bg-blue-600 hover:bg-blue-700' : 'text-slate-400 hover:text-slate-200'}
            >
              Monthly
            </Button>
            <Button
              onClick={() => setActiveTab('yearly')}
              variant={activeTab === 'yearly' ? 'default' : 'ghost'}
              className={activeTab === 'yearly' ? 'bg-blue-600 hover:bg-blue-700' : 'text-slate-400 hover:text-slate-200'}
            >
              Yearly
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative border-2 ${plan.borderColor} bg-slate-800 transition-all duration-500 hover:shadow-2xl ${
                plan.popular ? 'md:-translate-y-4 shadow-xl shadow-blue-500/20 border-blue-500/50' : 'hover:-translate-y-2'
              }`}
            >
              {plan.badge && (
                <div className={`absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 ${plan.badgeColor} text-white text-xs font-bold rounded-full shadow-lg`}>
                  {plan.badge}
                </div>
              )}

              <CardHeader className="text-center">
                <div className="text-5xl mb-3">{plan.icon}</div>
                <CardTitle className="text-2xl text-slate-100">{plan.name}</CardTitle>
                <CardDescription className="text-slate-400">{plan.description}</CardDescription>
              </CardHeader>

              <CardContent className="text-center">
                <div className="text-5xl font-bold text-slate-100 mb-1">
                  {plan.price}
                </div>
                {plan.period && (
                  <div className="text-slate-400">{plan.period}</div>
                )}

                <Button className={`w-full mt-6 ${plan.buttonStyle} shadow-lg hover:shadow-xl hover:scale-105 transition-all`}>
                  {plan.buttonText}
                </Button>

                <div className="mt-8 space-y-4 text-left">
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    What's Included
                  </div>
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="text-slate-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
