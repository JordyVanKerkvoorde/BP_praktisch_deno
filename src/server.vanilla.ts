import { serve } from "https://deno.land/std@0.97.0/http/server.ts";

const server = serve({ port: 3031 });
console.log(`HTTP webserver running.  Access it at:  http://localhost:3031/`);

for await (const request of server) {
    request.respond({ status: 200, body: 'Success' });
}