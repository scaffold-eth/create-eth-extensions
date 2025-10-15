import { NextResponse } from "next/server";
import * as fs from "fs";
import * as path from "path";

export async function GET() {
  try {
    console.log("📊 API: Fetching schema.graphql...");

    // Read the schema.graphql file
    const schemaPath = path.join(process.cwd(), "..", "envio", "schema.graphql");
    const schemaContent = fs.readFileSync(schemaPath, "utf8");

    console.log("📄 Schema content length:", schemaContent.length);

    return new NextResponse(schemaContent, {
      headers: {
        "Content-Type": "text/plain",
      },
    });
  } catch (error) {
    console.error("❌ API: Error fetching schema:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch schema",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
