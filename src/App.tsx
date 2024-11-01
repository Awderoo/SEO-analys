import React, { useState } from 'react';
import { Activity } from 'lucide-react';
import { AnalyzerForm } from './components/AnalyzerForm';
import { ResultsCard } from './components/ResultsCard';
import type { SEOAnalysis } from './types/seo';

function App() {
  const [analysis, setAnalysis] = useState<SEOAnalysis | null>(null);

  const handleAnalyze = async (url: string) => {
    setAnalysis({
      url,
      status: 'analyzing',
      results: undefined
    });

    // Simulated API call - replace with actual API integration
    setTimeout(() => {
      setAnalysis({
        url,
        status: 'complete',
        results: {
          performance: {
            score: 85,
            metrics: {
              lcp: 2.5,
              fid: 100,
              cls: 0.1
            }
          },
          seo: {
            score: 92,
            issues: [
              {
                type: 'meta',
                severity: 'medium',
                message: 'Meta description could be more descriptive'
              },
              {
                type: 'heading',
                severity: 'low',
                message: 'Consider adding more heading structure'
              }
            ]
          },
          security: {
            https: true,
            sslCertificate: {
              valid: true,
              expiryDate: '2024-12-31'
            }
          }
        }
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Activity className="h-10 w-10 text-indigo-600" />
            <h1 className="text-4xl font-bold text-gray-900">SEO Analyzer</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Analyze your website's SEO performance, speed metrics, and security in seconds.
          </p>
        </div>

        <div className="flex flex-col items-center gap-12">
          <AnalyzerForm 
            onAnalyze={handleAnalyze}
            isAnalyzing={analysis?.status === 'analyzing'}
          />

          {analysis?.status === 'analyzing' && (
            <div className="flex items-center gap-3">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-600" />
              <p className="text-gray-600">Analyzing your website...</p>
            </div>
          )}

          {analysis?.status === 'complete' && analysis.results && (
            <ResultsCard results={analysis.results} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;