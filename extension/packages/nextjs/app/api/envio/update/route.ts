import { NextResponse } from "next/server";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

export async function POST() {
  try {
    console.log("🔄 API: Starting Envio config update...");

    // Run the update script using pnpm
    const { stdout, stderr } = await execAsync("cd ../envio && pnpm run update");

    console.log("📊 Update script output:", stdout);

    if (stderr) {
      console.warn("⚠️ Update script warnings:", stderr);
    }

    return NextResponse.json({
      success: true,
      message: "Boilerplate indexer generated successfully",
      output: stdout,
    });
  } catch (error) {
    console.error("❌ API: Error updating Envio config:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update Envio config",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
