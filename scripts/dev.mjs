import { spawn } from "node:child_process";

const processes = [];
const isWindows = process.platform === "win32";

function start(command, args) {
  const child = spawn(command, args, {
    stdio: "inherit",
    shell: isWindows,
  });

  processes.push(child);
  child.on("exit", (code) => {
    if (code && code !== 0) {
      shutdown(code);
    }
  });
}

function shutdown(code = 0) {
  for (const child of processes) {
    if (!child.killed) {
      child.kill("SIGTERM");
    }
  }
  process.exit(code);
}

process.on("SIGINT", () => shutdown(0));
process.on("SIGTERM", () => shutdown(0));

start("node", ["server/index.mjs"]);
start("pnpm", ["run", "client"]);
