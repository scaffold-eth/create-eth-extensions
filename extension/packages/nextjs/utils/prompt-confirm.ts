/* eslint-disable @typescript-eslint/no-unused-vars */
import * as fs from "fs";

const buffer = new Uint8Array(1);
fs.readSync(0, buffer, 0, 1, null);

try {
  const remaining = new Uint8Array(1024);
  fs.readSync(0, remaining, 0, 1024, null);
} catch (error) {
  // Ignore any errors from trying to read remaining characters
}

process.stdout.write("\n");

const answer = Buffer.from(buffer).toString().toLowerCase();
process.exit(answer === "y" ? 0 : 1);
