import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { setHeaderInterceptor } from './core/interceptors/setHeader/set-header-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch(), withInterceptors([setHeaderInterceptor])),
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withViewTransitions()),
    importProvidersFrom([CookieService]),
    provideClientHydration(withEventReplay())
  ]
};
