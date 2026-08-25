export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      service_categories: {
        Row: {
          id: string;
          slug: string;
          name_en: string;
          name_th: string;
          description: string | null;
          icon_name: string;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          name_en: string;
          name_th: string;
          description?: string | null;
          icon_name?: string;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['service_categories']['Insert']>;
      };
      services: {
        Row: {
          id: string;
          category_id: string | null;
          slug: string;
          title: string;
          headline: string | null;
          short_description: string;
          full_content: string | null;
          hero_image_url: string | null;
          features: string[];
          specifications: Record<string, string>;
          base_price_estimate: number | null;
          price_unit: string | null;
          warranty_years: number;
          is_fensa_certified: boolean;
          is_active: boolean;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          category_id?: string | null;
          slug: string;
          title: string;
          headline?: string | null;
          short_description: string;
          full_content?: string | null;
          hero_image_url?: string | null;
          features?: string[];
          specifications?: Record<string, string>;
          base_price_estimate?: number | null;
          price_unit?: string | null;
          warranty_years?: number;
          is_fensa_certified?: boolean;
          is_active?: boolean;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['services']['Insert']>;
      };
      service_areas: {
        Row: {
          id: string;
          town_name: string;
          county: string;
          response_time_hours: number;
          emergency_available: boolean;
          free_survey: boolean;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          town_name: string;
          county?: string;
          response_time_hours?: number;
          emergency_available?: boolean;
          free_survey?: boolean;
          is_active?: boolean;
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['service_areas']['Insert']>;
      };
      postcodes: {
        Row: {
          id: string;
          area_id: string | null;
          postcode_prefix: string;
          region_name: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          area_id?: string | null;
          postcode_prefix: string;
          region_name: string;
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['postcodes']['Insert']>;
      };
      quote_requests: {
        Row: {
          id: string;
          reference_no: string;
          first_name: string;
          last_name: string;
          email: string;
          phone: string;
          postcode: string;
          address_line: string | null;
          service_id: string | null;
          service_type_name: string | null;
          property_type: string | null;
          dimensions_spec: Record<string, any>;
          project_details: string;
          preferred_contact_method: string;
          preferred_survey_date: string | null;
          preferred_time_slot: string | null;
          estimated_price_min: number | null;
          estimated_price_max: number | null;
          status: 'PENDING' | 'REVIEWED' | 'SURVEY_SCHEDULED' | 'QUOTED' | 'COMPLETED' | 'CANCELLED';
          internal_notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          reference_no?: string;
          first_name: string;
          last_name: string;
          email: string;
          phone: string;
          postcode: string;
          address_line?: string | null;
          service_id?: string | null;
          service_type_name?: string | null;
          property_type?: string | null;
          dimensions_spec?: Record<string, any>;
          project_details: string;
          preferred_contact_method?: string;
          preferred_survey_date?: string | null;
          preferred_time_slot?: string | null;
          estimated_price_min?: number | null;
          estimated_price_max?: number | null;
          status?: 'PENDING' | 'REVIEWED' | 'SURVEY_SCHEDULED' | 'QUOTED' | 'COMPLETED' | 'CANCELLED';
          internal_notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['quote_requests']['Insert']>;
      };
      projects: {
        Row: {
          id: string;
          service_id: string | null;
          title: string;
          location_city: string;
          completion_year: string;
          summary: string;
          challenge_description: string | null;
          solution_description: string | null;
          specifications: string[];
          before_image_url: string | null;
          after_image_url: string | null;
          is_featured: boolean;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          service_id?: string | null;
          title: string;
          location_city: string;
          completion_year?: string;
          summary: string;
          challenge_description?: string | null;
          solution_description?: string | null;
          specifications?: string[];
          before_image_url?: string | null;
          after_image_url?: string | null;
          is_featured?: boolean;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['projects']['Insert']>;
      };
      customer_reviews: {
        Row: {
          id: string;
          project_id: string | null;
          customer_name: string;
          customer_location: string;
          service_category: string | null;
          rating: number;
          review_title: string | null;
          review_text: string;
          is_verified: boolean;
          review_date: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          project_id?: string | null;
          customer_name: string;
          customer_location: string;
          service_category?: string | null;
          rating?: number;
          review_title?: string | null;
          review_text: string;
          is_verified?: boolean;
          review_date?: string;
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['customer_reviews']['Insert']>;
      };
    };
  };
}
