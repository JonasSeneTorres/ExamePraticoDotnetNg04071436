import { BrowserModule } from '@angular/platform-browser';
import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule, provideBrowserGlobalErrorListeners, } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

import { App } from './app';
import { AppRoutingModule } from './app-routing-module';
import { BarraNavegacao } from './components/barra-navegacao/barra-navegacao';
import { Footer } from './components/footer/footer';
import { Header } from './components/header/header';
import { PainelCentral } from './components/painel-central/painel-central';

registerLocaleData(localePt, 'pt');

@NgModule({
  declarations: [App],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // BrowserAnimationsModule,
    BarraNavegacao,
    Footer,
    Header,
    PainelCentral,
  ],
  providers: [
    provideHttpClient(),
    // provideAnimationsAsync(),
    provideBrowserGlobalErrorListeners(),
    {
      provide: LOCALE_ID,
      useValue: 'pt',
    },
    {
      provide: DEFAULT_CURRENCY_CODE,
      useValue: 'BRL',
    },
  ],
  bootstrap: [App],
})
export class AppModule {}
