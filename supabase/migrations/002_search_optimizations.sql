-- 002_search_optimizations.sql
-- Complements 001_initial_schema.sql: trigram, vector updates, view for gallery.

-- Enable pg_trgm for fuzzy search fallback
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- Trigram index for fuzzy title search
CREATE INDEX IF NOT EXISTS idx_prompts_title_trgm ON public.prompts USING GIN(title gin_trgm_ops);

-- Composite index for the hot gallery query (published + type + category)
CREATE INDEX IF NOT EXISTS idx_prompts_gallery ON public.prompts(status, type, category) WHERE status = 'published';

-- Increment download counter atomically
CREATE OR REPLACE FUNCTION public.increment_download(prompt_id TEXT)
RETURNS VOID AS $$
  UPDATE public.prompts SET download_count = download_count + 1 WHERE id = prompt_id;
$$ LANGUAGE sql SECURITY DEFINER;

-- Toggle favorite and keep counter in sync
CREATE OR REPLACE FUNCTION public.toggle_favorite(p_user UUID, p_prompt TEXT)
RETURNS BOOLEAN AS $$
DECLARE
  existed BOOLEAN;
BEGIN
  SELECT EXISTS(SELECT 1 FROM public.favorites WHERE user_id = p_user AND prompt_id = p_prompt) INTO existed;
  IF existed THEN
    DELETE FROM public.favorites WHERE user_id = p_user AND prompt_id = p_prompt;
    UPDATE public.prompts SET favorite_count = GREATEST(favorite_count - 1, 0) WHERE id = p_prompt;
    RETURN FALSE;
  ELSE
    INSERT INTO public.favorites(user_id, prompt_id) VALUES (p_user, p_prompt);
    UPDATE public.prompts SET favorite_count = favorite_count + 1 WHERE id = p_prompt;
    RETURN TRUE;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
