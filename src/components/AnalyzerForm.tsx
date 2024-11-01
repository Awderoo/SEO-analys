import React from 'react';
import { Search, Globe } from 'lucide-react';
import { useForm } from 'react-hook-form';

interface AnalyzerFormProps {
  onAnalyze: (url: string) => void;
  isAnalyzing: boolean;
}

export function AnalyzerForm({ onAnalyze, isAnalyzing }: AnalyzerFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data: { url: string }) => {
    onAnalyze(data.url);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-3xl">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Globe className="h-5 w-5 text-gray-400" />
        </div>
        <input
          {...register("url", {
            required: "URL is required",
            pattern: {
              value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
              message: "Please enter a valid URL"
            }
          })}
          type="url"
          placeholder="Enter website URL to analyze (e.g., https://example.com)"
          className="block w-full pl-12 pr-32 py-4 rounded-xl border-2 border-indigo-100 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all bg-white/50 backdrop-blur-sm"
        />
        <div className="absolute inset-y-0 right-2 flex items-center">
          <button
            type="submit"
            disabled={isAnalyzing}
            className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Search className="h-4 w-4" />
            {isAnalyzing ? 'Analyzing...' : 'Analyze'}
          </button>
        </div>
      </div>
      {errors.url && (
        <p className="mt-2 text-red-500 text-sm">{errors.url.message as string}</p>
      )}
    </form>
  );
}