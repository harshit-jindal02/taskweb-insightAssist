// src/otel.js
import {WebTracerProvider} from '@opentelemetry/sdk-trace-web'
import {BatchSpanProcessor} from '@opentelemetry/sdk-trace-base'
import {FetchInstrumentation} from '@opentelemetry/instrumentation-fetch'
import {XMLHttpRequestInstrumentation} from '@opentelemetry/instrumentation-xml-http-request'
import {OTLPTraceExporter} from '@opentelemetry/exporter-trace-otlp-http'

// 1. Set up a tracer provider for the browser
const provider = new WebTracerProvider()

// 2. Configure the OTLP exporter to your SigNoz endpoint & headers
const exporter = new OTLPTraceExporter({
  url: 'https://ingest.in.signoz.cloud/v1/traces', // adjust path if needed
  headers: {authorization: 'Bearer <YOUR_INGEST_KEY>'},
})

// 3. Add a batch span processor
provider.addSpanProcessor(new BatchSpanProcessor(exporter))

// 4. Instrument XHR & fetch calls automatically
provider.register({
  instrumentations: [
    new XMLHttpRequestInstrumentation(),
    new FetchInstrumentation(),
  ],
})
