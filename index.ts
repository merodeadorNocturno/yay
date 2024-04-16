import {
  serveDir,
  serveFile,
} from "https://deno.land/std@0.221.0/http/file_server.ts";

function setCorsHeaders(response: Response) {
  response.headers.set("Access-Control-Allow-Origin", "http://localhost:8001"); // Allow requests from localhost:8001
  response.headers.set("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS"); // Allow necessary HTTP methods
}

const port = 8001;

const handler = (req: Request): Promise<Response> | Response => {
  const { pathname } = new URL(req.url);

  if (pathname === "/login") {
    return serveFile(req, "./html/login.html");
  }

  if (pathname === "/") {
    return serveFile(req, "./html/index.html");
  }

  if (pathname === "/users/edit") {
    return serveFile(req, "./html/users_edit.html");
  }

  if (pathname === "/users") {
    return serveFile(req, "./html/users.html");
  }

  if (pathname === "/users/delete") {
    return serveFile(req, "./html/users_modal_warn_delete.html");
  }

  if (pathname === "/clinical") {
    return serveFile(req, "./html/clinical.html");
  }

  if (pathname.startsWith("/styles")) {
    return serveDir(req, {
      fsRoot: "css",
      urlRoot: "styles",
    })
    .then((response) => {
      setCorsHeaders(response);
      return response
    });
  }
  return new Response("404: Not Found", { status: 404 });
};

console.log(`HTTP server running. Access it at: http://localhost:8001/`);
Deno.serve({ port }, handler);
