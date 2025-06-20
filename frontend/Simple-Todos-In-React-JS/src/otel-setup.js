import { WebTracerProvider } from '@opentelemetry/sdk-trace-web';
import { getWebAutoInstrumentations } from '@opentelemetry/auto-instrumentations-web';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { SimpleSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { ZoneContextManager } from '@opentelemetry/context-zone';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { Resource } from '@opentelemetry/resources';

// 1. Define a resource for your service
const resource = new Resource({
  'service.name': 'webapp-frontend',
});

// 2. Initialize the provider
const provider = new WebTracerProvider({ resource });

// 3. Create and configure the exporter to send data to SigNoz Cloud
const exporter = new OTLPTraceExporter({
  url: 'https://ingest.in.signoz.cloud:443/v1/traces',
  headers: {
    'signoz-access-token': 'e9bfcba0-a5a1-4d45-b2d5-38d332625ac8',
  },
});

// 4. Use a SimpleSpanProcessor to send traces to the exporter
provider.addSpanProcessor(new SimpleSpanProcessor(exporter));

// 5. Register the provider to be used by the app
provider.register({
  contextManager: new ZoneContextManager(),
});

// 6. Register the automatic instrumentations
//    This is the most important change!
registerInstrumentations({
  instrumentations: [
    // getWebAutoInstrumentations bundles all standard web instrumentations
    getWebAutoInstrumentations({
      // Configuration for the fetch instrumentation
      '@opentelemetry/instrumentation-fetch': {
        // This is crucial for connecting frontend and backend traces
        propagateTraceHeaderCorsUrls: [
          'http://localhost:5000', // The URL of your Flask backend
        ],
      },
    }),
  ],
});

console.log('OpenTelemetry instrumentation for webapp-frontend initialized.');