"""Serves the mock-ups from the repository root, like `python3 -m http.server`, but tells the
browser never to cache (after a change, a reload always gets every file of the mock-up, never a
mix of old and new ones), and serves only the folders a mock-up reads: `docs/` and `static/`.
Anything else of the repository (`.env`, the SQLite file with the personal data, `.git/`) answers
404, and so does any hidden file, even under `docs/`: the server may be reached from the local
network during the check on a phone. Copy it to docs/mockups/serve.py, then, from the repository
root, on the port of the project (docs/technical-choices.md, Commands):

    python3 docs/mockups/serve.py 8774

and open http://127.0.0.1:8774/docs/mockups/<name>.html. To check the mock-up on a phone on the
same Wi-Fi, for the time of the check only, serve it on the local network:

    python3 docs/mockups/serve.py 8774 0.0.0.0

and open http://<address of the computer>:8774/docs/mockups/<name>.html on the phone (the
firewall of the computer may have to allow the port); then serve it on 127.0.0.1 again.
"""

import http.server
import posixpath
import sys
import urllib.parse

# Only what a mock-up needs, as an allow list: what Git ignores isn't hidden from the network.
ALLOWED_PREFIXES = ("/docs/", "/static/")


class MockupsOnly(http.server.SimpleHTTPRequestHandler):
    def send_head(self):
        # `normpath` turns `/docs/../.env` into `/.env`, which is then refused.
        path = posixpath.normpath(urllib.parse.unquote(urllib.parse.urlsplit(self.path).path))
        hidden = any(part.startswith(".") for part in path.split("/"))
        if hidden or not path.startswith(ALLOWED_PREFIXES):
            self.send_error(404)
            return None
        return super().send_head()

    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()


port = int(sys.argv[1]) if len(sys.argv) > 1 else 8774
host = sys.argv[2] if len(sys.argv) > 2 else "127.0.0.1"
http.server.ThreadingHTTPServer((host, port), MockupsOnly).serve_forever()
