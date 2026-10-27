"""Sube dist/ a agostina.masstudio.cl por SFTP.

Uso (desde la raíz del proyecto, después de `npm run build`):
    SFTP_PASS='<contraseña>' python -I scripts/deploy-sftp.py [carpeta]   # carpeta por defecto: dist

Requiere `pip install paramiko`. La contraseña nunca se guarda en el repo.
Sube y sobrescribe; no borra archivos remotos que ya no existan en dist/.
"""
import os, posixpath, sys
import paramiko

HOST, PORT, USER, RAIZ = "216.185.51.64", 22, "agostina", "/public_html"
src = sys.argv[1] if len(sys.argv) > 1 else "dist"

t = paramiko.Transport((HOST, PORT))
t.connect(username=USER, password=os.environ["SFTP_PASS"])
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
