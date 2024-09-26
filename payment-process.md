1.  Frontend -> Backend (NestJS):

    1.1 El usuario selecciona un servicio para comprar.

    1.2 El frontend envía una solicitud POST a /payments/create-preference con detalles como el título, la cantidad y el precio.

2.  Backend (NestJS) -> API de Mercado Pago:

    2.1 El backend recibe la solicitud y crea una preferencia de pago utilizando la API de Mercado Pago.

    2.2 Envía una solicitud POST al endpoint /checkout/preferences de Mercado Pago.

3.  API de Mercado Pago -> Backend:

    3.1 Mercado Pago responde con los detalles de la preferencia de pago, incluyendo la URL (init_point) para que el usuario complete el pago.

4.  Backend -> Frontend:

    4.1 El backend envía los datos de la preferencia de pago (incluyendo la URL init_point) de vuelta al frontend.

5.  Frontend -> Mercado Pago:

    5.1 El frontend redirige al usuario a la URL de Mercado Pago (init_point), donde el usuario completa el pago.

6.  Mercado Pago -> Backend (Webhook):

    6.1 Después de que se procesa el pago, Mercado Pago envía una notificación (webhook) al backend con el estado del pago.
    Backend -> Procesar Pago:

7.  El backend procesa el estado del pago (aprobado, pendiente o fallido).

    7.1 El backend actualiza el sistema según corresponda (por ejemplo, marcando el servicio como pagado o manejando fallos en el pago).
