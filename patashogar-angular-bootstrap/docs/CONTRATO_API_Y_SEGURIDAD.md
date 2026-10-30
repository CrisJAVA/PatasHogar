# Integración futura · Angular + Spring Boot + Spring Security + PostgreSQL

## Decisión de arquitectura

Por simplicidad se mantiene **una aplicación Angular con rutas**, pero con vistas separadas por rol. Más adelante el backoffice puede extraerse a otro proyecto si crece. **El frontend no define autorización efectiva**: Spring Security debe exigir roles por endpoint, y PostgreSQL persistir solicitudes, usuarios, albergues, donaciones y movimientos.

Roles propuestos:

- `ROLE_ADMIN`: lista solicitudes, aprueba/rechaza, coordina certificaciones presenciales, supervisa usuarios, campañas y operaciones.
- `ROLE_SHELTER`: edita el albergue propio autorizado, ve sus donaciones confirmadas y datos de su responsable/padrino, administra campañas.
- `ROLE_DONOR`: administra su perfil y consulta sus donaciones confirmadas y comprobantes.

## Recursos / endpoints preliminares (prefijo `/api/v1`)

| Método | Endpoint | Acceso esperado | Función |
| --- | --- | --- | --- |
| GET | `/shelters` | Público | Solo albergues publicados y verificados. |
| GET | `/shelters/{id}` | Público | Ficha de refugio. |
| POST | `/shelter-applications` | Público con control antiabuso / autenticación según política | Solicitud con estado inicial `PENDING`. |
| GET | `/admin/shelter-applications?status=PENDING` | ADMIN | Bandeja de solicitudes. |
| PATCH | `/admin/shelter-applications/{id}` | ADMIN | Aprobar/rechazar, observación. |
| POST | `/admin/shelters/{id}/visits` | ADMIN | Agendar visita de verificación. |
| PATCH | `/admin/shelters/{id}/verification` | ADMIN | Certificar existencia o registrar incidencia. |
| GET | `/auth/me` | Autenticado | Usuario actual y rol real. |
| GET | `/shelter/me` | SHELTER | Albergue de propietario autenticado. |
| GET | `/shelter/me/donations` | SHELTER | Donaciones liquidadas y conciliadas. |
| GET | `/donor/me/donations` | DONOR | Historial personal. |
| POST | `/donations/checkout-sessions` | DONOR o público según política | Crear sesión de pago del proveedor, con importe validado en servidor. |
| POST | `/payments/webhooks/provider` | Proveedor de pagos (firma verificada) | Confirmar pagos de forma idempotente. |

DTO de registro: `RegisterShelterRequest` en `models/models.ts`. Respuesta: `ShelterApplication` con `id`, `status`, `createdAt`. Solicitud de revisión: `{ "status": "APPROVED", "note": "Coordinar visita presencial" }`.

## Estados y notificaciones

```text
SOLICITUD ENVIADA
  -> PENDING (acuse de recibo por correo, plazo objetivo ≤24 h)
  -> APPROVED (aprobación preliminar y correo con instrucciones)
      -> VISIT_SCHEDULED (coordinación presencial por correo)
      -> VERIFIED (verificación presencial satisfactoria)
      -> PUBLISHED (el albergue ya aparece al público)
  -> REJECTED (correo de rechazo y motivo pertinente)
```

No se debe publicar el albergue únicamente por una aprobación preliminar. Exigir validación presencial y controles documentales antes de publicar insignia «Verificado».

### Email transaccional (desde backend, nunca desde Angular)

**Al recibir solicitud:** asunto «PatasHogar: recibimos tu solicitud {id}». Incluye estado `En revisión`, plazo objetivo máximo de 24 horas (que debe ser realmente soportado por operaciones), y que se enviará respuesta al correo registrado.

**Aprobación preliminar:** asunto «PatasHogar: solicitud {id} preaprobada». Comunicar pasos siguientes, pedir coordinación vía correo y programar visita de certificación. No afirmar que el albergue ya fue verificado.

**Rechazo:** asunto «PatasHogar: resultado de tu solicitud {id}». Dar decisión e instrucciones razonables para corrección, si aplica.

Implementar notificaciones con servicio server-side (SMTP/API de correo), cola/outbox en DB, reintentos, auditoría y plantillas. Mantener `emailSentAt` / `deliveryStatus`, además de `createdAt`, `reviewedAt`. La expectativa de 24 horas exige monitoreo y escalamiento de solicitudes vencidas; mostrarlo en interfaz no garantiza SLA.

## Seguridad indispensable

- Spring Security aplica `@PreAuthorize` o políticas por URL. Rechazar cambios de estado de un usuario distinto a ADMIN y accesos cruzados a cuentas de albergue.
- Para sesión web, valorar **cookies HttpOnly + Secure + SameSite** y gestión de **CSRF**; el servicio Angular ya usa `withCredentials: true` en operaciones previstas. Permitir CORS solo desde orígenes confiables.
- Validar formatos, longitudes y reglas en backend; proteger formulario con límites de tasa, CAPTCHA cuando sea necesario y verificación del correo.
- Contraseñas solo en el backend, almacenadas con hash seguro adaptativo (Argon2id o bcrypt correctamente configurado), nunca en localStorage.
- Registrar auditoría de aprobaciones, rechazos, verificación de visita, cambios de estado y accesos sensibles.
- No exponer listas completas de datos personales al rol DONOR. Conservar solo lo necesario según política de privacidad, retención y marco normativo aplicable.
- Separar ambientes de prueba y producción. Nunca colocar claves de proveedores o SMTP en archivos Angular o repositorios públicos.

## Pagos: no capturar PAN/CVV en Angular

1. Usuario elige monto, albergue y medio de pago.
2. Angular solicita `POST /donations/checkout-sessions` al servidor.
3. El servidor valida monto y albergue, usa credenciales **solo en backend** y crea sesión con pasarela de pagos reconocida.
4. El frontend redirige **solo a la URL validada del checkout alojado** (o usa componentes tokenizados oficiales), sin ver los datos de tarjeta.
5. La pasarela comunica el resultado por webhook firmado al backend. El servidor comprueba autenticidad, importe, ID, duplicados y estado antes de marcar `PAID`.
6. Solo después de la confirmación se muestran donaciones recibidas y se emiten comprobantes/notificaciones.

Yape: mostrar únicamente un QR verificado generado por el proveedor o la entidad receptora; no usar el QR de rayas ni el número inventado del HTML anterior. No dar por pagada una transacción basándose en captura de pantalla, redirección del navegador o formulario no autenticado.

**Estado actual del frontend:** modal deshabilitado intencionalmente para pagos; `PatasApiService.createCheckout()` preparado como contrato. No guarda tarjeta, CVV, claves ni datos bancarios. Implementar autorización y verificación de webhook antes de habilitarlo.

## Datos en PostgreSQL (mínimo)

- `users(id, email, password_hash, full_name, role, created_at, enabled)`
- `shelter_applications(id, applicant_id, shelter_name, address, contact_name, phone, email, animal_count, needs, status, created_at, reviewed_at, reviewed_by, notes)`
- `shelters(id, application_id, owner_user_id, name, location, verification_status, published_at)`
- `verification_visits(id, shelter_id, scheduled_at, completed_at, result, notes)`
- `campaigns(id, shelter_id, goal_amount, status, details)`
- `donations(id, donor_user_id, shelter_id, campaign_id, amount, currency, payment_status, provider_payment_id, created_at, paid_at)`
- `notification_outbox(id, recipient_email, template, payload_json, status, attempts, sent_at)`

Añadir claves foráneas, índices, `CHECK`/enum, unicidad de proveedor, transacciones y trazabilidad. Usar migraciones con Flyway/Liquibase.
