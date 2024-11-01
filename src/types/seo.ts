export interface SEOAnalysis {
  url: string;
  status: 'pending' | 'analyzing' | 'complete' | 'error';
  results?: {
    performance: {
      score: number;
      metrics: {
        lcp: number;
        fid: number;
        cls: number;
      };
    };
    seo: {
      score: number;
      issues: Array<{
        type: string;
        severity: 'high' | 'medium' | 'low';
        message: string;
      }>;
    };
    security: {
      https: boolean;
      sslCertificate: {
        valid: boolean;
        expiryDate?: string;
      };
    };
  };
}