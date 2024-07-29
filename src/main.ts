import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { registerLicense } from '@syncfusion/ej2-base';
import { environment } from './environments/environment';

// Registering Syncfusion license key
registerLicense(environment.syncfusion.license);

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
