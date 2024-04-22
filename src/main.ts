import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { registerLicense } from '@syncfusion/ej2-base';
import { syncfusionLicense } from './app/configs/syncfusion.license';

// Registering Syncfusion license key
registerLicense(syncfusionLicense);

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
