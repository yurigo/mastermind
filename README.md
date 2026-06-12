# 🃏 Mr. Mime

Juego Mr. Mime (antes Mastermind) implementado con **Astro**, **Tailwind CSS** y **JavaScript vanilla**. Todo funciona en el cliente — sin backend ni base de datos.

## Estructura del proyecto

```
├── src/
│   ├── layouts/
│   │   └── Base.astro          # Layout HTML base
│   ├── pages/
│   │   └── index.astro         # Página principal
│   ├── components/
│   │   └── MastermindGame.astro # Componente principal del juego
│   └── scripts/
│       └── mastermind.js       # Lógica pura (sin efectos secundarios)
├── astro.config.mjs
├── tailwind.config.mjs
└── package.json
```

## Cómo arrancarlo localmente

```bash
npm install
npm run dev
```

Abre `http://localhost:4321` en tu navegador.

### Otros comandos

| Comando           | Descripción                          |
|-------------------|--------------------------------------|
| `npm run dev`     | Servidor de desarrollo con hot reload |
| `npm run build`   | Construye para producción en `dist/`  |
| `npm run preview` | Previsualiza el build de producción   |

## Reglas del juego

- La máquina genera una combinación secreta de **4 colores**.
- Los colores posibles son **6**: Rojo, Azul, Verde, Amarillo, Morado y Naranja.
- Se permiten colores repetidos.
- El jugador tiene **10 intentos** para adivinar la combinación.
- Tras cada intento se muestran pistas:
  - 🔴 **Rojo** = color correcto en posición correcta.
  - ⚪ **Blanco** = color correcto en posición incorrecta.
