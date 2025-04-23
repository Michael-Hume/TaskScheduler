import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const SUPABASE_URL = 'https://rwmxdecnjqzhuffuerrq.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ3bXhkZWNuanF6aHVmZnVlcnJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUzNjMyODksImV4cCI6MjA2MDkzOTI4OX0.9oQXInN9SE8rCgqW76sJn9WAyX-QJ7mbUOb4mHpS0XY';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
