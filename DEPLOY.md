# Publicar la web de Agostina

**URL:** https://agostina.masstudio.cl/ (hosting de Mauricio, HTTPS y renovación automática)

## Cada vez que haya cambios

```bash
cd F:\Codes\AGOSTINA\WEB\agostinapizzas-web
npm run build
python -I scripts/deploy-sftp.py
```

- Requiere `pip install paramiko` (una sola vez por PC).
- La contraseña SFTP la tiene Vicente (la entregó Mauricio); **no va en el repo**. Se escribe una vez en `.env` de la raíz (`SFTP_PASS=...`), que está en `.gitignore`. También sirve como variable de entorno `SFTP_PASS`.
- El script sube todo `dist/` a `/public_html` y sobrescribe. **No borra** archivos remotos: si se elimina una página, borrarla a mano por SFTP.

## Datos de conexión

- SFTP: host `216.185.51.64`, puerto `22`, usuario `agostina`, carpeta `/public_html`.
- Ya configurado en el servidor: índices de carpeta, URLs sin `.html`, `/404.html` propio, caché de 30 días en `/assets/`.

## Verificar

Abrir `/`, `/slice/`, `/pizzas/`, `/delivery/`, `/como-llegar/`, `/privacidad` (200) y una ruta inexistente (404).

## Pendientes

- El servidor envía `x-robots-tag: noindex, nofollow` (cabecera de la demo). Pedir a Mauricio que la quite cuando se lance de verdad; sin eso no hay SEO.
- `SITE_URL` en `astro.config.mjs` y `public/robots.txt` ya apuntan a `agostina.masstudio.cl`; cambiarlos si el dominio final es otro.
- Firebase (`firebase.json`, `.firebaserc`) quedó como respaldo; la publicación vigente es por SFTP.
