import { Card, CardContent } from '@/components/ui/card';

export default function StatsCard({ title, value, icon: Icon, color, bgColor }) {
  return (
    <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <div className={`${bgColor} p-3 rounded-xl`}>
            <Icon className={`w-6 h-6 ${color}`} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-400">{title}</p>
            <p className="text-3xl font-bold text-white mt-1">{value}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}