# Publicacion web sin mezclar proyectos nativos

La web se construye con `npm ci` y `npm run build`. Netlify publica `dist` y conserva las funciones de `netlify/functions`. La funcion de newsletter obtiene sus credenciales del entorno; no deben copiarse a HTML ni al repositorio.

Comprobaciones antes de publicar:

```sh
node scripts/check-autonomos.mjs
python3 scripts/check-autonomos-guides.py
npm run build
```

La calculadora `/autonomos` considera actividad individual en estimacion directa y alta durante todo el ano. Los gastos excluyen la cuota propia. La deduccion del 7 % solo ajusta el rendimiento computable para cotizacion; no es una deduccion adicional aplicada al IRPF. La reserva fiscal es una aproximacion de liquidez del 20 %, no el impuesto final. La cuota reducida permite el importe confirmado del recibo, con MEI.

`/calculadora-autonomos` redirige a `/autonomos`. La guia editorial `/calculadora-autonomos.html` mantiene su URL independiente. La experiencia `/mi-plan` y sus recursos procedentes de main deben conservarse al sincronizar una copia local anterior.

Para guardar exclusivamente la web de una copia local con otros cambios, `scripts/snapshot-web-release.mjs codex/nueva-rama` crea un commit sobre origin/main con un indice temporal. No cambia la rama activa ni el indice del usuario. Excluye Mi Plan del reemplazo y rechaza rutas nativas, dependencias, compilaciones y credenciales reconocibles. Este filtro no sustituye la revision del diff.

Antes de fusionar, revisar los cambios frente a main, verificar que ios/, android/, node_modules/ y dist/ no cambian y comprobar la compilacion desde la rama. No publicar manualmente un paquete viejo despues de fusionar: el despliegue Git de main debe ser la fuente de produccion. No ejecutar cap sync ni compilaciones nativas como parte de este flujo.

No activar anuncios con banderas locales ni solicitar una revision de AdSense sin comprobar por separado el estado del sitio y los requisitos editoriales y de consentimiento.
