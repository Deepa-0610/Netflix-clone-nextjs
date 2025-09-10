// pages/api/admin/content.ts

import { NextApiRequest, NextApiResponse } from "next";

// Optional: import your Supabase client
// import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      // Fetch content list from Supabase
      // const { data, error } = await supabase.from('content').select('*')
      return res.status(200).json({ content: [] });

    case "POST":
      // Add content to Supabase
      return res.status(201).json({ message: "Created" });

    case "PUT":
      // Edit existing content
      return res.status(200).json({ message: "Updated" });

    case "DELETE":
      // Delete content by ID
      return res.status(200).json({ message: "Deleted" });

    default:
      // ⚠️ Unsupported HTTP method
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
