# Integral Lab · Integración numérica

**Isidro Alexander Chuj Quijivix · Carné 231621**  
Universidad del Valle de Guatemala · Facultad de Ingeniería · Métodos Numéricos  
Laboratorio final · 19 de noviembre de 2026

Programa web para integrar funciones por rectángulos izquierdos, derechos, de punto medio y trapecios compuestos. Incluye gráfica, comparación entre métodos, procedimiento, tabla de contribuciones, descarga de reporte y CSV e impresión a PDF.

## Uso

Abrir `index.html` en un navegador. No requiere instalación ni dependencias externas. Introducir f(x), límites a y b, número entero de subintervalos de 1 a 10,000 y método. Pulsar **Calcular integral**.

Sintaxis: `x^2`, `2*x+1`, `sin(x)`, `sen(x)`, `cos(x)`, `tan(x)`, `sqrt(x)`, `abs(x)`, `exp(x)`, `ln(x)` y `log(x)` (ambos logaritmos naturales), `pi`, `e`, paréntesis y notación científica. Trigonometría en radianes. Se admite multiplicación implícita como `2x` y `2(x+1)`.

## Métodos

Con h=(b-a)/n:

- Izquierda: h Σ f(a+ih), i=0,...,n-1.
- Derecha: h Σ f(a+ih), i=1,...,n.
- Punto medio: h Σ f(a+(i+1/2)h), i=0,...,n-1.
- Trapecios: h [f(a)/2 + Σ f(a+ih) + f(b)/2], i=1,...,n-1.

La tabla muestra la contribución de cada subintervalo; su suma da la aproximación con signo. Los límites invertidos se admiten. Para n>100 se presenta el área de referencia sin dibujar todas las figuras; para n>200 se muestran las primeras 200 filas y el CSV exporta todas.

## Verificación

Ejecutar `node pruebas.cjs`. Contiene pruebas de resultados conocidos, convergencia, precedencia, límites invertidos, funciones negativas, validación de dominio y rechazo de expresiones no matemáticas.

Ejemplo: para x² entre 0 y 2 con n=8, izquierda=2.1875, derecha=3.1875, punto medio=2.65625 y trapecios=2.6875. Integral exacta de referencia: 8/3.

## Alcance

JavaScript de doble precisión y sumación compensada. El analizador no utiliza `eval`. Se verifican extremos, puntos medios y muestras de gráfica, pero no se certifica continuidad: una singularidad entre muestras puede pasar inadvertida. Utilizar funciones continuas en el intervalo. La diferencia al duplicar n es un indicador, no un error garantizado ni una integral simbólica exacta. Datos extremos pueden exceder la precisión disponible.
