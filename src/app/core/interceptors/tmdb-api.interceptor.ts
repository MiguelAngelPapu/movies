
import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { environment as env } from '../../../environments/environment';


// Un interceptor es un middleware que se ejecuta antes de que una petición HTTP salga del cliente y después de que llega la respuesta.
// Te sirve para:

// Añadir headers comunes automáticamente
// Ej: Authorization, Content-Type, X-Api-Key, etc.
// Así no tienes que repetirlos en cada request.

// Agregar parámetros comunes
// Ej: idioma (language=es-CO), API key de TMDB, page=1, etc.

// Interceptar errores globales
// Ej: si la API devuelve 401 Unauthorized, rediriges al login.
// Si devuelve 500, muestras un toast o log centralizado.

// Medir performance o logging
// Ej: loggear cuánto tarda cada request.


export const tmdbApiInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  // Solo interceptar peticiones a la API de TMDB
  if (!req.url.includes(env.BASE_URL)) {
    return next(req);
  }

  // Clonar la petición para añadir parámetros y headers
  const modifiedReq = req.clone({
    params: req.params
      // .set('api_key', env.API_KEY)
      .append('language', 'es-CO')
      .append('region', 'CO'),

    setHeaders: {
      'Content-Type': 'application/json;charset=utf-8',
      Accept: 'application/json',
      Authorization: env.TOKEN_API
    }
  });

  return next(modifiedReq);
};

