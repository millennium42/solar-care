import { spawn } from "node:child_process";

const host = "127.0.0.1";
const port = process.env.SMOKE_PORT ?? "3100";
const externalUrl = process.env.SMOKE_TEST_URL;
const baseUrl = externalUrl ?? `http://${host}:${port}`;
const expectedText = "Entrar no ERP";

function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function waitForHttp(url, timeoutMs = 30000) {
  const startedAt = Date.now();
  let lastError;

  while (Date.now() - startedAt < timeoutMs) {
    try {
      const response = await fetch(url, { cache: "no-store" });
      if (response.ok) {
        return response;
      }
      lastError = new Error(`HTTP ${response.status}`);
    } catch (error) {
      lastError = error;
    }

    await delay(500);
  }

  throw lastError ?? new Error(`Timed out waiting for ${url}`);
}

async function main() {
  let server;

  if (!externalUrl) {
    server = spawn(
      process.platform === "win32" ? "npm.cmd" : "npm",
      ["run", "start", "--", "--hostname", host, "--port", port],
      {
        env: process.env,
        stdio: "inherit",
      },
    );

    server.on("exit", (code) => {
      if (code !== null && code !== 0) {
        console.error(`Next server exited with code ${code}`);
      }
    });
  }

  try {
    const response = await waitForHttp(baseUrl);
    const html = await response.text();

    if (!html.includes(expectedText)) {
      throw new Error(`Missing expected CTA text: ${expectedText}`);
    }

    console.log(`Smoke test passed: ${baseUrl}`);
  } finally {
    if (server) {
      server.kill("SIGTERM");
      await delay(750);
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
