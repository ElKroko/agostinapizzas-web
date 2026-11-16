"""Sube dist/ a agostina.masstudio.cl por SFTP.

Uso (desde la raíz del proyecto, después de `npm run build`):
    python -I scripts/deploy-sftp.py [carpeta]   # carpeta por defecto: dist
La clave se lee de SFTP_PASS en el entorno o del archivo .env de la raíz (ignorado por git).

Requiere `pip install paramiko`. La contraseña nunca se guarda en el repo (.env está en .gitignore).
Sube y sobrescribe; no borra archivos remotos que ya no existan en dist/.
"""
import os, posixpath, sys
import paramiko

HOST, PORT, USER, RAIZ = "216.185.51.64", 22, "agostina", "/public_html"
src = sys.argv[1] if len(sys.argv) > 1 else "dist"

t = paramiko.Transport((HOST, PORT))
def clave():
    """SFTP_PASS del entorno o, si no está, del archivo .env (ignorado por git)."""
    if os.environ.get("SFTP_PASS"):
        return os.environ["SFTP_PASS"]
    env = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", ".env")
    if os.path.exists(env):
        for linea in open(env, encoding="utf-8"):
            k, _, v = linea.strip().partition("=")
            if k.strip() == "SFTP_PASS" and v.strip():
                return v.strip().strip("'\"")
    sys.exit("Falta SFTP_PASS: escríbela en .env (SFTP_PASS=...) o como variable de entorno.")


t.connect(username=USER, password=clave())
s = paramiko.SFTPClient.from_transport(t)


def mkdir(p):
    try:
        s.stat(p)
    except IOError:
        s.mkdir(p)


n = 0
for root, _, files in os.walk(src):
    rel = os.path.relpath(root, src).replace("\\", "/")
    destino = RAIZ if rel == "." else posixpath.join(RAIZ, rel)
    mkdir(destino)
    for f in files:
        s.put(os.path.join(root, f), posixpath.join(destino, f))
        n += 1
print(f"Subidos {n} archivos a {RAIZ}")
s.close()
t.close()
