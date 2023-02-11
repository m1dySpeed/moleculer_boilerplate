import { ENVIRONMENT } from './global.config';
import { loggerOptions } from './logger';
import { AuthMiddleware } from './auth.middleware';

module.exports = {
  namespace: ENVIRONMENT,
  nodeID: null,
  metadata: {},

  logger: {
    type: 'Pino',
    pino: { options: loggerOptions },
  },

  transporter: 'NATS',

  // Define a serializer.
  // Available values: "JSON", "Avro", "ProtoBuf", "MsgPack", "Notepack", "Thrift".
  // More info: https://moleculer.services/docs/0.14/networking.html#Serialization
  serializer: 'JSON',

  // Number of milliseconds to wait before reject a request with a RequestTimeout error. Disabled: 0
  requestTimeout: 0,

  // Retry policy settings. More info: https://moleculer.services/docs/0.14/fault-tolerance.html#Retry
  retryPolicy: {
    // Enable feature
    enabled: false,
    // Count of retries
    retries: 5,
    // First delay in milliseconds.
    delay: 100,
    // Maximum delay in milliseconds.
    maxDelay: 1000,
    // Backoff factor for delay. 2 means exponential backoff.
    factor: 2,
    // A function to check failed requests.
    check: (err) => err && !!err.retryable,
  },

  // Limit of calling level. If it reaches the limit, broker will throw an MaxCallLevelError error. (Infinite loop protection)
  maxCallLevel: 100,

  // Number of seconds to send heartbeat packet to other nodes.
  heartbeatInterval: 10,
  // Number of seconds to wait before setting node to unavailable status.
  heartbeatTimeout: 30,

  // Cloning the params of context if enabled. High performance impact, use it with caution!
  contextParamsCloning: false,

  tracking: {
    enabled: false,
    shutdownTimeout: 5000,
  },

  disableBalancer: false,

  // Settings of Service Registry. More info: https://moleculer.services/docs/0.14/registry.html
  registry: {
    // Define balancing strategy. More info: https://moleculer.services/docs/0.14/balancing.html
    // Available values: "RoundRobin", "Random", "CpuUsage", "Latency", "Shard"
    strategy: 'RoundRobin',
    // Enable local action call preferring. Always call the local action instance if available.
    preferLocal: true,
  },

  // Settings of Circuit Breaker. More info: https://moleculer.services/docs/0.14/fault-tolerance.html#Circuit-Breaker
  circuitBreaker: {
    // Enable feature
    enabled: false,
    // Threshold value. 0.5 means that 50% should be failed for tripping.
    threshold: 0.5,
    // Minimum request count. Below it, CB does not trip.
    minRequestCount: 20,
    // Number of seconds for time window.
    windowTime: 60,
    // Number of milliseconds to switch from open to half-open state
    halfOpenTime: 10 * 1000,
    // A function to check failed requests.
    check: (err) => err && err.code >= 500,
  },

  // Settings of bulkhead feature. More info: https://moleculer.services/docs/0.14/fault-tolerance.html#Bulkhead
  bulkhead: {
    // Enable feature.
    enabled: false,
    // Maximum concurrent executions.
    concurrency: 10,
    // Maximum size of queue
    maxQueueSize: 100,
  },

  // Enable action & event parameter validation. More info: https://moleculer.services/docs/0.14/validating.html
  validator: true,

  errorHandler: null,

  // Enable/disable built-in metrics function. More info: https://moleculer.services/docs/0.14/metrics.html
  metrics: {
    enabled: false,
    // Available built-in reporters: "Console", "CSV", "Event", "Prometheus", "Datadog", "StatsD"
    reporter: {
      type: 'Prometheus',
      options: {
        // HTTP port
        port: 3030,
        // HTTP URL path
        path: '/metrics',
        // Default labels which are appended to all metrics labels
        defaultLabels: (registry) => ({
          namespace: registry.broker.namespace,
          nodeID: registry.broker.nodeID,
        }),
      },
    },
  },

  // Enable built-in tracing function. More info: https://moleculer.services/docs/0.14/tracing.html
  tracing: {
    enabled: false,
    // Available built-in exporters: "Console", "Datadog", "Event", "EventLegacy", "Jaeger", "Zipkin"
    exporter: {
      type: 'Console', // Console exporter is only for development!
      options: {
        // Custom logger
        logger: null,
        // Using colors
        colors: true,
        // Width of row
        width: 100,
        // Gauge width in the row
        gaugeWidth: 40,
      },
    },
  },

  // Register custom middlewares
  middlewares: [AuthMiddleware],

  // Register custom REPL commands.
  replCommands: null,

  // Called after broker created.
  created() {},

  // Called after broker started.
  async started() {},

  // Called after broker stopped.
  async stopped() {},
};
