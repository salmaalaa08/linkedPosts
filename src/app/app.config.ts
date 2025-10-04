import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { setHeaderInterceptor } from './core/interceptors/setHeader/set-header-interceptor';
import { NgxSpinnerModule } from "ngx-spinner";
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { globalLoadingInterceptor } from './core/interceptors/loading/global-loading-interceptor';
import { provideToastr } from 'ngx-toastr';
import { errMessageInterceptor } from './core/interceptors/errorMessage/err-message-interceptor';




export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch(), withInterceptors([setHeaderInterceptor, globalLoadingInterceptor, errMessageInterceptor])),
    provideBrowserGlobalErrorListeners(),
    provideAnimations(),
    BrowserAnimationsModule,
    provideToastr(),
    NgxSpinnerModule,
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withViewTransitions()),
    importProvidersFrom([CookieService]),
    provideClientHydration(withEventReplay())
  ]
};
