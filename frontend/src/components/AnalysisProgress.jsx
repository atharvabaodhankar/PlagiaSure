import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle, Loader2, AlertCircle, Zap, Search, Save } from 'lucide-react';
import { cn } from '../lib/utils';

const AnalysisProgress = ({ reportId, onComplete, onError }) => {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState('initializing');
  const [message, setMessage] = useState('Starting analysis...');
  const [error, setError] = useState(null);
  const eventSourceRef = useRef(null);

  useEffect(() => {
    if (!reportId) return;

    // Create EventSource for SSE
    const token = localStorage.getItem('auth_token');
    const eventSource = new EventSource(
      `${import.meta.env.VITE_API_URL || 'http://localhost:5001'}/api/reports/progress/${reportId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    eventSourceRef.current = eventSource;

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        
        setProgress(data.progress || 0);
        setStage(data.stage || 'processing');
        setMessage(data.message || 'Processing...');

        if (data.error) {
          setError(data.message);
          if (onError) onError(data);
          eventSource.close();
        }

        if (data.stage === 'completed') {
          if (onComplete) onComplete(data);
          setTimeout(() => {
            eventSource.close();
          }, 2000);
        }
      } catch (err) {
        console.error('Error parsing progress data:', err);
      }
    };

    eventSource.onerror = (err) => {
      console.error('EventSource error:', err);
      setError('Connection lost. Please refresh the page.');
      if (onError) onError({ message: 'Connection lost' });
      eventSource.close();
    };

    // Cleanup on unmount
    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
    };
  }, [reportId, onComplete, onError]);

  const getStageIcon = () => {
    if (error) return <AlertCircle className="h-6 w-6 text-red-500" />;
    if (stage === 'completed') return <CheckCircle className="h-6 w-6 text-green-500" />;
    if (stage === 'ai_detection') return <Zap className="h-6 w-6 text-blue-500 animate-pulse" />;
    if (stage === 'plagiarism_detection') return <Search className="h-6 w-6 text-purple-500 animate-pulse" />;
    if (stage === 'saving') return <Save className="h-6 w-6 text-green-500 animate-pulse" />;
    return <Loader2 className="h-6 w-6 text-[#3282B8] animate-spin" />;
  };

  const getStageColor = () => {
    if (error) return 'from-red-500 to-red-600';
    if (stage === 'completed') return 'from-green-500 to-green-600';
    if (stage === 'ai_detection') return 'from-blue-500 to-blue-600';
    if (stage === 'plagiarism_detection') return 'from-purple-500 to-purple-600';
    if (stage === 'saving') return 'from-green-500 to-emerald-600';
    return 'from-[#3282B8] to-[#52DE97]';
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="relative">
            <div className={cn(
              "p-4 rounded-full bg-gradient-to-br",
              error ? "from-red-100 to-red-200" :
              stage === 'completed' ? "from-green-100 to-green-200" :
              "from-blue-100 to-blue-200"
            )}>
              {getStageIcon()}
            </div>
            {!error && stage !== 'completed' && (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#52DE97] rounded-full animate-pulse"></div>
            )}
          </div>
        </div>
        
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          {error ? 'Analysis Failed' :
           stage === 'completed' ? 'Analysis Complete!' :
           'Analyzing Document'}
        </h3>
        
        <p className="text-gray-600">
          {message}
        </p>
      </div>

      {/* Progress Bar */}
      {!error && (
        <div className="space-y-4">
          <div className="relative">
            <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={cn(
                  "h-full bg-gradient-to-r transition-all duration-500 ease-out",
                  getStageColor()
                )}
                style={{ width: `${progress}%` }}
              >
                <div className="h-full w-full bg-white opacity-20 animate-pulse"></div>
              </div>
            </div>
            <div className="absolute -top-8 right-0 text-sm font-bold text-gray-700">
              {Math.round(progress)}%
            </div>
          </div>

          {/* Stage Indicators */}
          <div className="grid grid-cols-4 gap-2 mt-6">
            <StageIndicator
              label="Initialize"
              active={progress >= 5}
              completed={progress > 20}
            />
            <StageIndicator
              label="AI Detection"
              active={progress >= 20}
              completed={progress > 50}
            />
            <StageIndicator
              label="Plagiarism"
              active={progress >= 50}
              completed={progress > 90}
            />
            <StageIndicator
              label="Complete"
              active={progress >= 90}
              completed={progress === 100}
            />
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      {/* Completion Message */}
      {stage === 'completed' && !error && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-700 text-sm font-medium">
            ✓ Analysis completed successfully! Redirecting...
          </p>
        </div>
      )}
    </div>
  );
};

const StageIndicator = ({ label, active, completed }) => {
  return (
    <div className="text-center">
      <div className={cn(
        "h-2 rounded-full mb-2 transition-all duration-300",
        completed ? "bg-green-500" :
        active ? "bg-blue-500 animate-pulse" :
        "bg-gray-200"
      )}></div>
      <p className={cn(
        "text-xs font-medium transition-colors",
        completed ? "text-green-600" :
        active ? "text-blue-600" :
        "text-gray-400"
      )}>
        {label}
      </p>
    </div>
  );
};

export default AnalysisProgress;