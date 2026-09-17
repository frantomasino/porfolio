# P&P Caja

Caja interna de **Pollería P&P** (Argentina). Es una app de mostrador para el personal: se carga lo que se lleva el cliente (por kg, ½ kg o packs) y se emite un ticket para imprimir o copiar.

No es un catálogo público ni un pedido por WhatsApp para clientes.

## Cómo correrla

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en la tablet o el celular de la caja. También se puede instalar como acceso directo del navegador.

Producción local:

```bash
npm run build
npm start
```

Todo corre en el navegador. No hay backend ni login. Después de la primera carga, el pedido, los precios y las ventas quedan en este dispositivo (`localStorage`).

Demo pública (esta rama, sin login de Vercel): https://pyp-caja.surge.sh

## Cómo usarla en el mostrador

1. Elegí la categoría (Pollo, Congelados, Ofertas, Huevos).
2. Tocá el producto.
3. Elegí la cantidad:
   - **Pollo:** ½ kg, 1 kg, 1,5 kg, 2 kg, o kilos a medida (precio × kg).
   - **Congelados:** botones de **½ kg** y **1 kg** con el precio de lista (el medio kilo no es la mitad del kilo). Los kilos a medida se cobran con el precio de 1 kg.
   - **Ofertas y maple:** cantidad en unidades / packs.
4. Revisá el pedido a la derecha (en el celular, **Ver pedido**).
5. **Emitir ticket** abre el comprobante a pantalla completa. El ticket queda guardado en este dispositivo (no se pierde con **Nueva venta**).

**Ricosaurios** aparece en la lista de precios pero no se vende hasta que le carguen un valor.

## Ventas (reportes)

El ícono de barras abre el área de reportes, también solo para el personal:

- Recortes **Hoy / Día / Semana / Mes / Año** (zona horaria `America/Argentina/Buenos_Aires`) y un calendario para saltar.
- Resumen del período: cantidad de tickets, total $ y ticket promedio.
- Ranking de productos con cantidad (kg, ½ kg o unidades) y plata vendida. En congelados, si hubo ½ kg y 1 kg, se ven por separado.
- Lista de días → tickets del día → reabrir / imprimir.
- **Copiar CSV** deja las líneas del período listas para pegar en Google Sheets.

Los datos viven en `localStorage` de este aparato. No hay sync a la nube en v1.

## Cómo imprimir

1. Emití el ticket.
2. Tocá **Imprimir**.
3. En el diálogo del navegador, elegí la impresora térmica (~80 mm) o “Guardar como PDF”.
4. Si el ticket sale con márgenes grandes, en opciones de impresión desactivá encabezados y poné márgenes mínimos.

**Compartir** usa el menú nativo del dispositivo (útil para mandar el texto por WhatsApp). **Copiar** deja el mismo texto en el portapapeles.

## Cómo cambiar precios

1. Tocá el engranaje (Precios).
2. Editá el valor y salí del campo: se guarda solo en este aparato.
3. Un campo vacío = sin precio (el producto no se ofrece en la caja).
4. **Restaurar precios del volante** vuelve a la lista original de P&P.

El número de ticket también se guarda en el mismo dispositivo. **Nueva venta** limpia el pedido; si el ticket ya se había emitido, el próximo número avanza.

## Datos de la casa (volante)

- P&P — DEL CAMPO A TU MESA
- WhatsApp pedidos: 116330-9058
- Envíos sin cargo: Quilmes – Bernal – Berazategui
- Precio sujeto a modificación sin previo aviso
