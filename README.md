# Server Logistic API

## 1. ¿Qué hace?

Este es un servidor backend construido con Elysia.js y Bun runtime, diseñado para gestionar un sistema logístico y de inventario. La aplicación proporciona una API REST que maneja:
- Gestión de empleados y autenticación
- Control de inventario y productos
- Manejo de tiendas y ventas
- Integración con IBM Watson para análisis inteligente

## 2. Cómo ejecutarlo

### Prerrequisitos
- Tener Bun instalado en tu sistema
- PostgreSQL configurado y corriendo
- Credenciales de IBM Watson (para funcionalidades de IA)

### Pasos de instalación
1. Clonar el repositorio:
```bash
git clone https://github.com/Richi-Mi/server-logistic-hackaton.git
```

2. Instalar dependencias:
```bash
bun install
```

3. Configurar variables de entorno (crear archivo .env)

4. Iniciar el servidor:
```bash
bun run dev
```

El servidor estará disponible en http://localhost:3000

## 3. Funcionalidades Destacadas

### Gestión de Usuarios
- Registro de empleados
- Autenticación con JWT
- Gestión de roles y permisos
- Consulta de tiendas asociadas

### Control de Productos
- Creación y búsqueda de productos
- Actualización de inventario
- Validación de SKU y códigos de barras
- Gestión de stock por tienda

### Sistema de Seguridad
- Manejo de tokens JWT
- Middleware de autenticación
- Control de acceso basado en roles
- Manejo personalizado de errores

## 4. Innovación

### Integración con IA
La API incluye una integración con IBM Watson que permite:
- Análisis inteligente de inventario
- Procesamiento de consultas en lenguaje natural
- Asistencia en la toma de decisiones mediante prompts

### Arquitectura Moderna
- Uso de Bun runtime para máximo rendimiento
- Framework Elysia.js para APIs rápidas y tipo-seguras
- Estructura de código modular y mantenible
- Sistema de manejo de errores personalizado

### Escalabilidad
- Diseño orientado a microservicios
- Conexiones de base de datos optimizadas
- Manejo eficiente de recursos