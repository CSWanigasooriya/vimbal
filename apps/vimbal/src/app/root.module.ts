/* eslint-disable @typescript-eslint/no-explicit-any */
import { NgModule } from '@angular/core'
import { getAnalytics, provideAnalytics } from '@angular/fire/analytics'
import { initializeApp, provideFirebaseApp } from '@angular/fire/app'
import { getAuth, provideAuth } from '@angular/fire/auth'
import { getDatabase, provideDatabase } from '@angular/fire/database'
import { getFirestore, provideFirestore } from '@angular/fire/firestore'
import { getFunctions, provideFunctions } from '@angular/fire/functions'
import { getMessaging, provideMessaging } from '@angular/fire/messaging'
import { getPerformance, providePerformance } from '@angular/fire/performance'
import { getRemoteConfig, provideRemoteConfig } from '@angular/fire/remote-config'
import { getStorage, provideStorage } from '@angular/fire/storage'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ServiceWorkerModule } from '@angular/service-worker'
import { ActionReducer, MetaReducer, StoreModule } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { MaterialModule } from '@vimbal/material'
import { PipeModule } from '@vimbal/pipe'
import { ServiceModule } from '@vimbal/service'
import { localStorageSync } from 'ngrx-store-localstorage'
import { NgxJdenticonModule } from 'ngx-jdenticon'
import { environment } from '../environments/environment'
import { AuthComponent } from './auth/auth.component'
import { BrowseComponent } from './browse/browse.component'
import { PROVIDERS_CONFIG } from './core/config/providers.config'
import { counterReducer } from './core/state/counter/counter.reducer'
import { sidebarReducer } from './core/state/sidebar/sidebar.reducer'
import { themeReducer } from './core/state/theme/theme.reducer'
import { ErrorComponent } from './error/error.component'
import { HomeComponent } from './home/home.component'
import { LayoutComponent } from './layout/layout.component'
import { RootComponent } from './root.component'
import { RootRoutingModule } from './root.routing'
import { SharedModule } from './shared/shared.module'

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({
    keys: ['count', 'theme'],
    rehydrate: true,
  })(reducer)
}
const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer]

@NgModule({
  declarations: [
    RootComponent,
    HomeComponent,
    LayoutComponent,
    AuthComponent,
    ErrorComponent,
    BrowseComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RootRoutingModule,
    MaterialModule,
    NgxJdenticonModule,
    FormsModule,
    ReactiveFormsModule,
    PipeModule,
    SharedModule,
    ServiceModule.forRoot({
      web3_storage_token: environment.web3_storage_token,
      ganacheUrl: environment.ganacheUrl,
    }),
    StoreModule.forRoot(
      { count: counterReducer, theme: themeReducer, sidebar: sidebarReducer },
      { metaReducers: metaReducers }
    ),
    StoreDevtoolsModule.instrument({}),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAnalytics(() => getAnalytics()),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    provideFunctions(() => getFunctions()),
    provideMessaging(() => getMessaging()),
    providePerformance(() => getPerformance()),
    provideRemoteConfig(() => getRemoteConfig()),
    provideStorage(() => getStorage()),
  ],
  providers: [PROVIDERS_CONFIG],
  bootstrap: [RootComponent],
})
export class RootModule {}
