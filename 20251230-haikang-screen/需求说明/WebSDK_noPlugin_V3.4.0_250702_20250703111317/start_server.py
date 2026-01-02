import http.server
import socketserver
import os
import urllib.request
import urllib.error
import urllib.parse
from http import cookies

PORT = 8001
WEB_DIR = os.path.join(os.path.dirname(__file__), 'webs')

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=WEB_DIR, **kwargs)

    def end_headers(self):
        self.send_header('Cross-Origin-Embedder-Policy', 'require-corp')
        self.send_header('Cross-Origin-Opener-Policy', 'same-origin')
        self.send_header('Cross-Origin-Resource-Policy', 'cross-origin')
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

    def do_GET(self):
        self.handle_proxy('GET')

    def do_POST(self):
        self.handle_proxy('POST')
        
    def do_PUT(self):
        self.handle_proxy('PUT')

    def do_DELETE(self):
        self.handle_proxy('DELETE')

    def handle_proxy(self, method):
        # Check if request needs proxying
        if '/ISAPI' in self.path or '/SDK' in self.path:
            self.proxy_request(method)
        else:
            # Default behavior for static files
            if method == 'GET':
                super().do_GET()
            else:
                self.send_error(405, "Method Not Allowed")

    def proxy_request(self, method):
        # Extract target from cookie
        cookie_header = self.headers.get('Cookie')
        target_host = None
        if cookie_header:
            cookie = cookies.SimpleCookie()
            cookie.load(cookie_header)
            if 'webVideoCtrlProxy' in cookie:
                target_host = cookie['webVideoCtrlProxy'].value
        
        if not target_host:
            self.send_error(400, "Bad Request: Missing webVideoCtrlProxy cookie")
            return

        # Construct target URL
        target_url = f"http://{target_host}{self.path}"
        print(f"Proxying {method} {self.path} to {target_url}")

        try:
            # Prepare headers
            req_headers = dict(self.headers)
            # Remove hop-by-hop headers
            for key in ['Host', 'Content-Length', 'Transfer-Encoding', 'Connection']:
                if key in req_headers:
                    del req_headers[key]
            
            # Read body if present
            data = None
            content_len = int(self.headers.get('Content-Length', 0))
            if content_len > 0:
                data = self.rfile.read(content_len)

            # Create request
            req = urllib.request.Request(target_url, data=data, headers=req_headers, method=method)
            
            # Send request
            with urllib.request.urlopen(req) as response:
                self.send_response(response.status)
                for key, value in response.headers.items():
                    if key.lower() not in ['transfer-encoding', 'content-encoding', 'content-length']:
                        self.send_header(key, value)
                self.end_headers()
                self.wfile.write(response.read())

        except urllib.error.HTTPError as e:
            self.send_response(e.code)
            self.end_headers()
            self.wfile.write(e.read())
        except Exception as e:
            print(f"Proxy error: {e}")
            self.send_error(502, f"Bad Gateway: {str(e)}")

print(f"Starting server at http://localhost:{PORT}")
print(f"Serving directory: {WEB_DIR}")

# Allow address reuse
socketserver.TCPServer.allow_reuse_address = True

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nStopping server...")
        httpd.server_close()
