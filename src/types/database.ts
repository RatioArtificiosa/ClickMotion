export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          plan: string;
          stripe_customer_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['profiles']['Row'], 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['profiles']['Insert']>;
      };
      prompts: {
        Row: {
          id: string;
          title: string;
          slug: string;
          description: string;
          type: string;
          category: string;
          subcategory: string | null;
          style_tags: string[];
          motion_intensity: string;
          difficulty: string;
          price_tier: string;
          status: string;
          content: string;
          metadata: Record<string, any>;
          preview_video: string | null;
          preview_gif: string | null;
          thumbnail: string;
          live_demo_url: string | null;
          frameworks_supported: string[];
          ai_tools_rating: Record<string, any>;
          dependencies: Record<string, any>[];
          estimated_tokens: number;
          compatible_with: string[];
          download_count: number;
          favorite_count: number;
          fts: unknown;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['prompts']['Row'], 'download_count' | 'favorite_count' | 'fts' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['prompts']['Insert']>;
      };
      downloads: {
        Row: {
          id: string;
          user_id: string;
          prompt_id: string;
          format: string;
          created_at: string;
        };
      };
      favorites: {
        Row: {
          id: string;
          user_id: string;
          prompt_id: string;
          created_at: string;
        };
      };
      collections: {
        Row: {
          id: string;
          title: string;
          slug: string;
          description: string | null;
          cover_image: string | null;
          prompt_ids: string[];
          is_featured: boolean;
          created_at: string;
          updated_at: string;
        };
      };
    };
  };
}
