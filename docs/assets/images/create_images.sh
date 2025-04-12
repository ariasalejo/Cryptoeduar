#!/bin/bash
images=(
  "dinero-digital.jpg:Dinero Digital"
  "transacciones-globales.jpg:Transacciones Globales"
  "volatilidad.jpg:Volatilidad"
  "futuro-dinero.jpg:Futuro del Dinero"
  "seguridad.jpg:Seguridad Cripto"
  "whitepaper.jpg:Whitepaper Bitcoin"
  "bloque-genesis.jpg:Bloque Génesis"
  "pizza-bitcoin.jpg:Pizza Bitcoin"
  "adopcion-bitcoin.jpg:Adopción Bitcoin"
  "el-salvador.jpg:El Salvador BTC"
  "timeline.jpg:Timeline Bitcoin"
  "tipos-wallets.jpg:Tipos de Wallets"
  "claves-criptografia.jpg:Claves Cripto"
  "mejores-practicas.jpg:Mejores Prácticas"
  "simulador-transaccion.jpg:Simulador Transacciones"
  "riesgos-seguridad.jpg:Riesgos Seguridad"
  "checklist-seguridad.jpg:Checklist Seguridad"
)

for item in ""; do
  filename=""
  label=""
  magick -size 600x400 -background "#00ffea" -fill black -pointsize 24 -gravity center label:"$label" "$filename"
done
