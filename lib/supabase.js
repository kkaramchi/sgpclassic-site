import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://bamerxmzzlolqzqnzidr.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJhbWVyeG16emxvbHF6cW56aWRyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkzMDc4OTAsImV4cCI6MjA5NDg4Mzg5MH0.smf-SL5q9oFqKv2JoNtIzl3a4zMWENGyrYCkze3RC3Q"
);
