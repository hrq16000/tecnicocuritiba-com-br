export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      click_events: {
        Row: {
          app_version: string | null
          attribution_channel: string | null
          created_at: string
          cta_location: string | null
          equipamento: string | null
          event_type: string
          funnel_stage: string | null
          gclid: string | null
          id: string
          path: string
          session_id: string | null
          sintoma: string | null
          utm_campaign: string | null
          utm_medium: string | null
          utm_source: string | null
          viewport_bucket: string | null
        }
        Insert: {
          app_version?: string | null
          attribution_channel?: string | null
          created_at?: string
          cta_location?: string | null
          equipamento?: string | null
          event_type: string
          funnel_stage?: string | null
          gclid?: string | null
          id?: string
          path?: string
          session_id?: string | null
          sintoma?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          viewport_bucket?: string | null
        }
        Update: {
          app_version?: string | null
          attribution_channel?: string | null
          created_at?: string
          cta_location?: string | null
          equipamento?: string | null
          event_type?: string
          funnel_stage?: string | null
          gclid?: string | null
          id?: string
          path?: string
          session_id?: string | null
          sintoma?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          viewport_bucket?: string | null
        }
        Relationships: []
      }
      funnel_submissions: {
        Row: {
          atendido_em: string | null
          atendido_por: string | null
          created_at: string
          equipamento: string | null
          gclid: string | null
          id: string
          marca: string | null
          media_paths: Json
          notas_admin: string | null
          requires_coleta: boolean
          session_id: string
          sintoma: string | null
          status_atendimento: string
          utm_campaign: string | null
          utm_content: string | null
          utm_medium: string | null
          utm_source: string | null
          utm_term: string | null
          wa_message: string | null
        }
        Insert: {
          atendido_em?: string | null
          atendido_por?: string | null
          created_at?: string
          equipamento?: string | null
          gclid?: string | null
          id?: string
          marca?: string | null
          media_paths?: Json
          notas_admin?: string | null
          requires_coleta?: boolean
          session_id: string
          sintoma?: string | null
          status_atendimento?: string
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
          wa_message?: string | null
        }
        Update: {
          atendido_em?: string | null
          atendido_por?: string | null
          created_at?: string
          equipamento?: string | null
          gclid?: string | null
          id?: string
          marca?: string | null
          media_paths?: Json
          notas_admin?: string | null
          requires_coleta?: boolean
          session_id?: string
          sintoma?: string | null
          status_atendimento?: string
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
          wa_message?: string | null
        }
        Relationships: []
      }
      og_validation_status: {
        Row: {
          canonical: string | null
          checked_at: string
          city_slug: string
          created_at: string
          fb_error: string | null
          fb_status: string | null
          http_status: number | null
          id: string
          linkedin_error: string | null
          linkedin_status: string | null
          og_description: string | null
          og_image: string | null
          og_title: string | null
          raw: Json | null
          url: string
        }
        Insert: {
          canonical?: string | null
          checked_at?: string
          city_slug: string
          created_at?: string
          fb_error?: string | null
          fb_status?: string | null
          http_status?: number | null
          id?: string
          linkedin_error?: string | null
          linkedin_status?: string | null
          og_description?: string | null
          og_image?: string | null
          og_title?: string | null
          raw?: Json | null
          url: string
        }
        Update: {
          canonical?: string | null
          checked_at?: string
          city_slug?: string
          created_at?: string
          fb_error?: string | null
          fb_status?: string | null
          http_status?: number | null
          id?: string
          linkedin_error?: string | null
          linkedin_status?: string | null
          og_description?: string | null
          og_image?: string | null
          og_title?: string | null
          raw?: Json | null
          url?: string
        }
        Relationships: []
      }
      ordens_servico: {
        Row: {
          bairro: string | null
          cidade: string | null
          created_at: string
          descricao_curta: string | null
          equipamento: string | null
          etapa: string
          fotos: Json
          historico: Json
          id: string
          numero: string
          observacao_publica: string | null
          prazo_estimado: string | null
          previsao_conclusao: string | null
          session_id: string | null
          sintomas: string | null
          sla_horas: number | null
          telefone: string | null
          updated_at: string
        }
        Insert: {
          bairro?: string | null
          cidade?: string | null
          created_at?: string
          descricao_curta?: string | null
          equipamento?: string | null
          etapa?: string
          fotos?: Json
          historico?: Json
          id?: string
          numero: string
          observacao_publica?: string | null
          prazo_estimado?: string | null
          previsao_conclusao?: string | null
          session_id?: string | null
          sintomas?: string | null
          sla_horas?: number | null
          telefone?: string | null
          updated_at?: string
        }
        Update: {
          bairro?: string | null
          cidade?: string | null
          created_at?: string
          descricao_curta?: string | null
          equipamento?: string | null
          etapa?: string
          fotos?: Json
          historico?: Json
          id?: string
          numero?: string
          observacao_publica?: string | null
          prazo_estimado?: string | null
          previsao_conclusao?: string | null
          session_id?: string | null
          sintomas?: string | null
          sla_horas?: number | null
          telefone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      os_lookup_attempts: {
        Row: {
          chave: string
          janela_inicio: string
          tentativas: number
        }
        Insert: {
          chave: string
          janela_inicio?: string
          tentativas?: number
        }
        Update: {
          chave?: string
          janela_inicio?: string
          tentativas?: number
        }
        Relationships: []
      }
      os_lookup_audit: {
        Row: {
          criado_em: string
          encontrado: boolean
          erro: string | null
          id: string
          tipo: string
        }
        Insert: {
          criado_em?: string
          encontrado?: boolean
          erro?: string | null
          id?: string
          tipo: string
        }
        Update: {
          criado_em?: string
          encontrado?: boolean
          erro?: string | null
          id?: string
          tipo?: string
        }
        Relationships: []
      }
      reviews: {
        Row: {
          author_name: string
          author_photo_url: string | null
          city: string | null
          client_contact: string | null
          client_phone: string | null
          comment: string
          created_at: string
          google_review_url: string | null
          id: string
          moderated_at: string | null
          moderated_by: string | null
          moderation_action: string | null
          moderation_reason: string | null
          neighborhood: string | null
          publish_consent: boolean
          published: boolean
          published_notified_at: string | null
          rating: number
          review_date: string
          service_closed_at: string | null
          service_slug: string | null
          source: string
          updated_at: string
          verified: boolean
        }
        Insert: {
          author_name: string
          author_photo_url?: string | null
          city?: string | null
          client_contact?: string | null
          client_phone?: string | null
          comment: string
          created_at?: string
          google_review_url?: string | null
          id?: string
          moderated_at?: string | null
          moderated_by?: string | null
          moderation_action?: string | null
          moderation_reason?: string | null
          neighborhood?: string | null
          publish_consent?: boolean
          published?: boolean
          published_notified_at?: string | null
          rating: number
          review_date?: string
          service_closed_at?: string | null
          service_slug?: string | null
          source?: string
          updated_at?: string
          verified?: boolean
        }
        Update: {
          author_name?: string
          author_photo_url?: string | null
          city?: string | null
          client_contact?: string | null
          client_phone?: string | null
          comment?: string
          created_at?: string
          google_review_url?: string | null
          id?: string
          moderated_at?: string | null
          moderated_by?: string | null
          moderation_action?: string | null
          moderation_reason?: string | null
          neighborhood?: string | null
          publish_consent?: boolean
          published?: boolean
          published_notified_at?: string | null
          rating?: number
          review_date?: string
          service_closed_at?: string | null
          service_slug?: string | null
          source?: string
          updated_at?: string
          verified?: boolean
        }
        Relationships: []
      }
      seo_alertas: {
        Row: {
          criado_em: string
          detalhe: string | null
          enviado_slack: boolean
          id: string
          resolvido_em: string | null
          severidade: string
          tipo: string
          titulo: string
          url: string | null
        }
        Insert: {
          criado_em?: string
          detalhe?: string | null
          enviado_slack?: boolean
          id?: string
          resolvido_em?: string | null
          severidade?: string
          tipo: string
          titulo: string
          url?: string | null
        }
        Update: {
          criado_em?: string
          detalhe?: string | null
          enviado_slack?: boolean
          id?: string
          resolvido_em?: string | null
          severidade?: string
          tipo?: string
          titulo?: string
          url?: string | null
        }
        Relationships: []
      }
      seo_relatorios: {
        Row: {
          gerado_em: string
          id: string
          mes: string
          resumo: Json
        }
        Insert: {
          gerado_em?: string
          id?: string
          mes: string
          resumo?: Json
        }
        Update: {
          gerado_em?: string
          id?: string
          mes?: string
          resumo?: Json
        }
        Relationships: []
      }
      seo_snapshots: {
        Row: {
          cobertura: Json
          criado_em: string
          duracao_ms: number | null
          erros: Json
          gsc: Json
          id: string
          origem: string
          sitemap_adicionadas: Json
          sitemap_removidas: Json
          sitemap_total: number
          total_erros: number
        }
        Insert: {
          cobertura?: Json
          criado_em?: string
          duracao_ms?: number | null
          erros?: Json
          gsc?: Json
          id?: string
          origem?: string
          sitemap_adicionadas?: Json
          sitemap_removidas?: Json
          sitemap_total?: number
          total_erros?: number
        }
        Update: {
          cobertura?: Json
          criado_em?: string
          duracao_ms?: number | null
          erros?: Json
          gsc?: Json
          id?: string
          origem?: string
          sitemap_adicionadas?: Json
          sitemap_removidas?: Json
          sitemap_total?: number
          total_erros?: number
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      consultar_os: {
        Args: { _numero: string }
        Returns: {
          bairro: string
          cidade: string
          created_at: string
          descricao_curta: string
          equipamento: string
          etapa: string
          fotos: Json
          historico: Json
          numero: string
          observacao_publica: string
          prazo_estimado: string
          previsao_conclusao: string
          sintomas: string
          updated_at: string
        }[]
      }
      consultar_os_por_telefone: {
        Args: { _telefone: string }
        Returns: {
          bairro: string
          cidade: string
          created_at: string
          descricao_curta: string
          equipamento: string
          etapa: string
          fotos: Json
          historico: Json
          numero: string
          observacao_publica: string
          prazo_estimado: string
          previsao_conclusao: string
          sintomas: string
          telefone_mascarado: string
          updated_at: string
        }[]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      os_lookup_log: {
        Args: { _encontrado: boolean; _erro?: string; _tipo: string }
        Returns: undefined
      }
      os_rate_limit: {
        Args: { _chave: string; _limite?: number }
        Returns: undefined
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
