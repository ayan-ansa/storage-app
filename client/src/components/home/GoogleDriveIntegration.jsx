import { Check, Cloud } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function GoogleDriveIntegration() {
  const files = [
    { type: 'DOC', name: 'Project_Specs.doc', status: 'Ready', color: 'bg-blue-500/10 border-blue-500/30', checked: true },
    { type: 'XLS', name: 'Q4_Budget.xlsx', status: 'Ready', color: 'bg-emerald-500/10 border-emerald-500/30', checked: true },
    { type: 'PDF', name: 'Old_Report.pdf', status: 'Skipped', color: 'bg-rose-500/10 border-rose-500/30', checked: false }
  ];

  return (
    <section className="py-24 px-6 bg-linear-to-br from-blue-950/50 to-indigo-950/50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto relative">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-linear-to-r from-slate-100 to-blue-100 bg-clip-text text-transparent">
              Seamless integration with your favorite tool
            </h2>
            <p className="text-lg text-slate-400 mb-8 leading-relaxed">
              Connect MyStore with your existing workflow. Securely import specific files from Google Drive with complete control. No auto-syncing—<span className="font-semibold text-slate-200">you choose exactly what to transfer</span>.
            </p>

            <div className="space-y-4">
              {[
                'Selective Google Drive Import',
                'User Consent Required',
                'Download selected file to our servers',
                'Access, Share & Manage'
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Check className="w-6 h-6 text-blue-400 shrink-0" />
                  <span className="text-slate-300 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <Card className="bg-slate-800 border-slate-700 shadow-2xl">
            <CardHeader className="border-b border-slate-700">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                  <Cloud className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-100">Google Drive Import</h3>
                  <p className="text-sm text-slate-400">Select files • No auto-sync</p>
                </div>
                <div className="ml-auto w-3 h-3 bg-amber-400 rounded-full animate-pulse" />
              </div>
            </CardHeader>

            <CardContent className="pt-6">
              <div className="space-y-3">
                {files.map((file, i) => (
                  <div key={i} className={`flex items-center gap-3 p-3 rounded-lg border ${file.color} transition-all hover:shadow-md`}>
                    <input
                      type="checkbox"
                      checked={file.checked}
                      readOnly
                      className="w-5 h-5 rounded accent-blue-600"
                    />
                    <div className={`px-2 py-1 text-xs font-bold rounded ${
                      file.type === 'DOC' ? 'bg-blue-500/20 text-blue-300' :
                      file.type === 'XLS' ? 'bg-emerald-500/20 text-emerald-300' :
                      'bg-rose-500/20 text-rose-300'
                    }`}>
                      {file.type}
                    </div>
                    <span className="text-sm font-medium text-slate-200 grow">{file.name}</span>
                    <span className="text-xs text-slate-400">{file.status}</span>
                  </div>
                ))}
              </div>

              <Button className="w-full mt-6 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl">
                Import 2 Selected Files
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
