export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      expenses: {
        Row: {
          amount: number;
          created_at: string;
          description: string;
          id: string;
          project_id: string;
          quote_url: string | null;
          receipt_url: string | null;
          tenant_id: string;
        };
        Insert: {
          amount?: number;
          created_at?: string;
          description: string;
          id?: string;
          project_id: string;
          quote_url?: string | null;
          receipt_url?: string | null;
          tenant_id: string;
        };
        Update: {
          amount?: number;
          created_at?: string;
          description?: string;
          id?: string;
          project_id?: string;
          quote_url?: string | null;
          receipt_url?: string | null;
          tenant_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "expenses_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "projects";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "expenses_tenant_id_fkey";
            columns: ["tenant_id"];
            isOneToOne: false;
            referencedRelation: "tenant";
            referencedColumns: ["id"];
          }
        ];
      };
      profiles: {
        Row: {
          first_name: string | null;
          id: string;
          last_name: string | null;
          phone: string | null;
        };
        Insert: {
          first_name?: string | null;
          id: string;
          last_name?: string | null;
          phone?: string | null;
        };
        Update: {
          first_name?: string | null;
          id?: string;
          last_name?: string | null;
          phone?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey";
            columns: ["id"];
            isOneToOne: true;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      project_documents: {
        Row: {
          created_at: string;
          document_url: string;
          id: number;
          project_id: string;
          description: string;
        };
        Insert: {
          created_at?: string;
          document_url: string;
          id?: number;
          project_id: string;
          description: string;
        };
        Update: {
          created_at?: string;
          document_url?: string;
          id?: number;
          project_id?: string;
          description?: string;
        };
        Relationships: [
          {
            foreignKeyName: "project_documents_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "projects";
            referencedColumns: ["id"];
          }
        ];
      };
      project_images: {
        Row: {
          created_at: string;
          id: number;
          image_url: string;
          project_id: string;
          description: string;
        };
        Insert: {
          created_at?: string;
          id?: number;
          image_url: string;
          project_id: string;
          description: string;
        };
        Update: {
          created_at?: string;
          id?: number;
          image_url?: string;
          project_id?: string;
          description?: string;
        };
        Relationships: [
          {
            foreignKeyName: "project_images_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "projects";
            referencedColumns: ["id"];
          }
        ];
      };
      project_members: {
        Row: {
          project_id: string;
          user_id: string;
        };
        Insert: {
          project_id: string;
          user_id: string;
        };
        Update: {
          project_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "project_members_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "projects";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "project_members_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      project_tasks: {
        Row: {
          completed: boolean;
          cost: number;
          created_at: string;
          description: string;
          due_date: string | null;
          id: string;
          paid: boolean;
          project_id: string;
          receipt_url: string | null;
          tenant_id: string;
        };
        Insert: {
          completed?: boolean;
          cost?: number;
          created_at?: string;
          description: string;
          due_date?: string | null;
          id?: string;
          paid?: boolean;
          project_id: string;
          receipt_url?: string | null;
          tenant_id: string;
        };
        Update: {
          completed?: boolean;
          cost?: number;
          created_at?: string;
          description?: string;
          due_date?: string | null;
          id?: string;
          paid?: boolean;
          project_id?: string;
          receipt_url?: string | null;
          tenant_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "project_tasks_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "projects";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "project_tasks_tenant_id_fkey";
            columns: ["tenant_id"];
            isOneToOne: false;
            referencedRelation: "tenant";
            referencedColumns: ["id"];
          }
        ];
      };
      projects: {
        Row: {
          budget: number | null;
          created_at: string;
          created_by: string;
          description: string;
          end_date: string | null;
          id: string;
          name: string;
          start_date: string;
          tenant_id: string;
        };
        Insert: {
          budget?: number | null;
          created_at?: string;
          created_by: string;
          description: string;
          end_date?: string | null;
          id?: string;
          name: string;
          start_date: string;
          tenant_id: string;
        };
        Update: {
          budget?: number | null;
          created_at?: string;
          created_by?: string;
          description?: string;
          end_date?: string | null;
          id?: string;
          name?: string;
          start_date?: string;
          tenant_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "projects_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "projects_tenant_id_fkey";
            columns: ["tenant_id"];
            isOneToOne: false;
            referencedRelation: "tenant";
            referencedColumns: ["id"];
          }
        ];
      };
      tenant: {
        Row: {
          created_at: string;
          id: string;
          name: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          name: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          name?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "tenant_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      tenant_members: {
        Row: {
          created_at: string;
          tenant_id: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          tenant_id: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          tenant_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "tenant_members_tenant_id_fkey";
            columns: ["tenant_id"];
            isOneToOne: false;
            referencedRelation: "tenant";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "tenant_members_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
