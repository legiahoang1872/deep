export interface Quote {
  quote: string;
  mood: string;
  generated_at: string;
  cached?: boolean;
  fallback?: boolean;
}

export interface ApiResponse {
  quote: string;
  mood: string;
  generated_at: string;
  cached?: boolean;
  fallback?: boolean;
  error?: string;
}

export interface MoodOption {
  id: string;
  label: string;
  emoji: string;
}