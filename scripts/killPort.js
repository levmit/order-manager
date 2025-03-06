const { exec } = require("child_process");

exec("lsof -ti :3000", (err, stdout) => {
  if (err) {
    console.log("No process found on port 3000");
    return;
  }

  const pids = stdout.trim().split("\n");
  pids.forEach((pid) => {
    exec(`kill -9 ${pid}`, (err) => {
      if (err) {
        console.error(`Failed to kill process ${pid}: ${err.message}`);
      } else {
        console.log(`Killed process ${pid}`);
      }
    });
  });
});
