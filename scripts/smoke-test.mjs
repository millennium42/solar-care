import { spawn } from "node:child_process";

const host = "127.0.0.1";
const port = process.env.SMOKE_PORT ?? "3100";
const externalUrl = process.env.SMOKE_TEST_URL;
const baseUrl = externalUrl ?? `http://${host}:${port}`;
const landingExpectedTexts = ["Entrar no ERP", "Solicitar diagnostico solar"];
const dashboardExpectedTexts = [
  "Dashboard Solar Care",
  "Demo Solar Care",
  "Pipeline seedado",
];
const crmExpectedTexts = [
  "CRM Workspace",
  "Funil comercial",
  "Condominio Aurora",
];
const solarExpectedTexts = [
  "Operacoes solares",
  "Agro Sol Noroeste",
  "48,2",
  "Calculadora solar",
  "Checklist de vistoria",
  "Documentos pendentes",
];

function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function waitForHttp(url, timeoutMs = 30000, options = {}) {
  const startedAt = Date.now();
  let lastError;

  while (Date.now() - startedAt < timeoutMs) {
    try {
      const response = await fetch(url, { ...options, cache: "no-store" });
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

function assertHtmlIncludes(html, expectedTexts) {
  for (const expectedText of expectedTexts) {
    if (!html.includes(expectedText)) {
      throw new Error(`Missing expected text: ${expectedText}`);
    }
  }
}

function getCookieHeader(response) {
  const setCookie = response.headers.get("set-cookie");

  if (!setCookie) {
    throw new Error("Demo login did not return a Set-Cookie header");
  }

  return setCookie.split(";")[0];
}

function assertLoginCookieFlags(response) {
  const setCookie = response.headers.get("set-cookie") ?? "";
  const lowerSetCookie = setCookie.toLowerCase();
  const expectedFlags = ["httponly", "samesite=lax"];

  if (process.env.NODE_ENV !== "development") {
    expectedFlags.push("secure");
  }

  for (const expectedFlag of expectedFlags) {
    if (!lowerSetCookie.includes(expectedFlag)) {
      throw new Error(`Demo login cookie is missing ${expectedFlag}`);
    }
  }
}

async function assertRedirects(path, expectedLocation) {
  const response = await fetch(new URL(path, baseUrl), {
    cache: "no-store",
    redirect: "manual",
  });
  const location = response.headers.get("location") ?? "";

  if (
    response.status < 300 ||
    response.status > 399 ||
    !location.endsWith(expectedLocation)
  ) {
    throw new Error(
      `${path} did not redirect to ${expectedLocation}; HTTP ${response.status}`,
    );
  }
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
    assertHtmlIncludes(html, landingExpectedTexts);
    await assertRedirects("/app", "/");

    const loginResponse = await fetch(new URL("/demo-login", baseUrl), {
      cache: "no-store",
      redirect: "manual",
    });

    if (loginResponse.status < 300 || loginResponse.status > 399) {
      throw new Error(`Demo login returned HTTP ${loginResponse.status}`);
    }

    assertLoginCookieFlags(loginResponse);
    const cookieHeader = getCookieHeader(loginResponse);
    const appLocation = loginResponse.headers.get("location") ?? "/app";
    const dashboardResponse = await waitForHttp(
      new URL(appLocation, baseUrl),
      30000,
      {
        headers: {
          cookie: cookieHeader,
        },
      },
    );
    const dashboardHtml = await dashboardResponse.text();
    assertHtmlIncludes(dashboardHtml, dashboardExpectedTexts);

    const crmResponse = await waitForHttp(new URL("/app/crm", baseUrl), 30000, {
      headers: {
        cookie: cookieHeader,
      },
    });
    const crmHtml = await crmResponse.text();
    assertHtmlIncludes(crmHtml, crmExpectedTexts);

    const solarResponse = await waitForHttp(
      new URL("/app/solar", baseUrl),
      30000,
      {
        headers: {
          cookie: cookieHeader,
        },
      },
    );
    const solarHtml = await solarResponse.text();
    assertHtmlIncludes(solarHtml, solarExpectedTexts);

    const logoutResponse = await fetch(new URL("/demo-logout", baseUrl), {
      cache: "no-store",
      headers: {
        cookie: cookieHeader,
      },
      redirect: "manual",
    });

    if (logoutResponse.status < 300 || logoutResponse.status > 399) {
      throw new Error(`Demo logout returned HTTP ${logoutResponse.status}`);
    }

    const logoutCookie = logoutResponse.headers.get("set-cookie") ?? "";
    if (!logoutCookie.toLowerCase().includes("max-age=0")) {
      throw new Error("Demo logout did not expire the session cookie");
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
