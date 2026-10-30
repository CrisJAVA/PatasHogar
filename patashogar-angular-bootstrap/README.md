# PatasHogar · Angular + TypeScript + Node.js + npm + Bootstrap 5

Migración y ampliación del prototipo original **HTML/CSS/JavaScript** adjuntado el 28/10/2026. Se mantienen su identidad de color, estructura de inicio/albergues/registro/acceso y fotografías; la aplicación está reescrita en **Angular standalone + TypeScript + enrutamiento**, con **Bootstrap 5.3.8** instalado mediante npm. Se mantiene el CSS propio para conservar las animaciones y la apariencia original.

## Inicio rápido (Windows 10/11, Visual Studio Code)

Requisitos: Node.js compatible con Angular 20 (por ejemplo 22.12+ o 24+), npm y conexión a Internet **para la primera instalación de dependencias**. Bootstrap está declarado en `package.json`, así que `npm install` lo instala automáticamente.

```powershell
cd patashogar-angular
npm install
npm start
```

Abre la dirección que indique la consola, normalmente `http://localhost:4200/`. **No uses Live Server para abrir `src/index.html`**: Angular necesita su servidor de desarrollo.

Cuando tengas la API de Java en NetBeans/Spring Boot ejecutándose en puerto `8080`:

```powershell
npm run start:api
```

Esto redirige `/api` desde Angular a `http://localhost:8080` mediante `proxy.conf.json`.

> **Estado del entregable:** aquí se revisó el código TypeScript y los recursos, pero no se pudo ejecutar `npm install` ni comprobar `ng build`, porque el entorno de preparación no tuvo acceso al registro de npm. Realiza `npm install` y `npm run build` al abrir el proyecto con conexión a Internet.

## Tecnologías y Bootstrap

- **Angular 20 (standalone)** organiza las pantallas en componentes reutilizables y gestiona rutas, formularios y servicios.
- **TypeScript** implementa la lógica y define modelos de datos.
- **Node.js** permite ejecutar Angular CLI en desarrollo; **npm** instala y administra los paquetes.
- **Bootstrap 5.3.8** se incluye desde `node_modules/bootstrap/dist/css/bootstrap.min.css` en `angular.json`, **antes** del CSS personalizado `src/styles.css`. Puedes usar las grillas (`row`, `col-md-6`), utilidades (`d-flex`, `gap-3`, `visually-hidden`, etc.) y estilos de formulario en las pantallas nuevas. Los campos de filtro ya usan la utilidad accesible `visually-hidden`.
- **No se incluye Bootstrap JS**: los controles, menús, carruseles y modales ya se gestionan con Angular, evitando que dos bibliotecas manipulen los mismos elementos.

No debes usar un CDN adicional ni ejecutar `npm install bootstrap` por separado; ya figura en las dependencias. Si vas a **añadir** Bootstrap a una copia de la versión anterior, el comando equivalente es `npm install bootstrap@5.3.8`.

## Funcionalidades de esta versión

| Requisito | Implementación |
| --- | --- |
| 1. Hero con al menos 6 fotos y fade en bucle | 6 fotografías locales optimizadas a WebP, cambio cada 5.2 segundos, transición de 1.45 segundos; respeta reducción de movimiento. |
| 2. Quick donate con efecto líquido | Cantidades S/1, S/5, S/10, S/20, Otro y CTA usan pseudo-elementos, curva irregular y transición. La animación iniciada no se corta al salir con el puntero. |
| 3. Cifras animadas | Componente `count-up` con `IntersectionObserver` y animación una sola vez, más pulso y tarjetas elevables. |
| 4. Carrusel de albergues manual | Carrusel horizontal con botones anterior/siguiente y CSS scroll snap. Se deja una parte de la tarjeta siguiente visible como pista del contenido. |
| 5. Panel de detalle | Escritura progresiva de título, descripción y necesidad; la imagen entra suavemente al seleccionar otra tarjeta. |
| 6. Filtros y Mi albergue | Filtro por nombre/necesidad/ciudad, sin filtro de animal; enlace «Mi albergue» en navbar compartida de todas las rutas. |
| 7. Medios de pago | Modal informativo Yape / débito / crédito y contrato de API para sesión de checkout tokenizada; **no se recogen ni se guardan datos de tarjetas**. |
| 8. Angular | Componentes standalone, rutas, forms reactivos, signals y servicio HttpClient. |
| 9. Roles y dashboards | Modelos `ADMIN`, `SHELTER`, `DONOR`; vistas de prueba admin y albergue, además de contrato API preparado. |
| 10. Registro y revisión | Formulario validado → `PENDING` → aprobación/rechazo simulado, con evento de notificación de correo también simulado. Aprobación prevé visita presencial. |

## Rutas

| Ruta | Vista |
| --- | --- |
| `/` | Inicio |
| `/albergues` | Catálogo + detalle animado |
| `/registrar-albergue` | Mi albergue · formulario de incorporación |
| `/ingresar` | Acceso/registro (aún no auténtico) |
| `/demo/admin` | Evaluación de solicitudes **sin seguridad de producción** |
| `/demo/albergue` | Ejemplo de ficha/donaciones de albergue |

## Cómo probar el flujo de registro

1. Abre «Mi albergue», completa el formulario y envíalo.
2. Comprueba el mensaje «en revisión» y el plazo previsto de 24 horas.
3. Entra a `/demo/admin`: verás la nueva solicitud solo durante esa sesión.
4. Apruébala o recházala con un comentario; observa el evento de correo registrado en el panel.
5. En `/demo/albergue` verás un resumen de la solicitud y un panel de donaciones sin transacciones reales.

**Importante:** en `environment.ts`, `demoMode: true` usa estado únicamente en memoria. Al recargar la pestaña se perderán las solicitudes de prueba. **No se envía ningún correo**, no hay confirmación real en Gmail, no hay identidad verificada ni se hace ningún cobro. Los albergues, las cifras y las campañas heredadas del diseño son ejemplos y NO deben publicarse como verificadas o reales. Las rutas de demostración no autentican usuarios.

## Estructura

```text
src/
  app/
    components/header, footer, donation-dialog, count-up
    pages/home, shelters, register-shelter, auth, admin, shelter-dashboard
    models/models.ts
    data/shelters.data.ts            # datos demo
    services/api.service.ts          # contrato para Spring Boot
    services/applications.service.ts # solicitudes temporales
    services/donation.service.ts
    services/shelters.service.ts
    app.routes.ts / app.config.ts
  environments/environment.ts       # demoMode y apiBaseUrl
  styles.css                         # personalización de Bootstrap + animaciones
public/assets/                      # imágenes WebP reutilizadas
proxy.conf.json                      # Angular 4200 -> Spring Boot 8080
```

## Siguiente fase: Spring Boot / Spring Security

Consulta `docs/CONTRATO_API_Y_SEGURIDAD.md`. Con `environment.demoMode = false`, el formulario de solicitud y la carga de albergues pueden consumir `PatasApiService`. Los paneles, el acceso, el sistema de correos y los pagos requieren completar los endpoints, autorización, persistencia, pasarela y servicios de correo. No basta con apagar `demoMode` para habilitarlos.

## Ajustar el diseño

- Fotos del hero: `src/app/pages/home/home.component.ts`, propiedad `heroImages`.
- Duración de hero: `setInterval(..., 5200)` y CSS `.hero-gallery img`.
- Efecto líquido: `src/styles.css`, clases `.liquid-btn` y `.donate-fill`.
- Conteo: `src/app/components/count-up/`.
- Texto/campañas: `src/app/data/shelters.data.ts` (solo demo).
- Todas las imágenes están en `public/assets`; sus rutas en templates comienzan con `assets/`.

---

Este código es una base académica funcional de frontend y **no** una plataforma de pagos ni una aplicación segura de producción sin completar el backend y las verificaciones.
