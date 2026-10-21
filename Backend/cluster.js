import cluster from 'cluster';
import os from 'os';

/**
 * Cluster-Mode Runner / Multi-Worker Process Load Balancer
 * Fulfills Performance #14: Add load balancer
 * 
 * Spawns an Express worker process for each CPU core, distributing incoming network connections.
 */

if (cluster.isPrimary) {
  const numCPUs = Math.min(os.cpus().length, 4); // Balance across up to 4 cores
  console.log(`🚀 [LOAD BALANCER] Master process PID ${process.pid} is running`);
  console.log(`🚀 [LOAD BALANCER] Spawning ${numCPUs} worker processes...`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.warn(`⚠️ [LOAD BALANCER] Worker PID ${worker.process.pid} exited (${signal || code}). Spawning replacement...`);
    cluster.fork();
  });
} else {
  // Workers import and run the server
  import('./server.js');
  console.log(`⚡ [WORKER] Worker process PID ${process.pid} started`);
}
