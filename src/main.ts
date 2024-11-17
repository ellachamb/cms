import { bootstrapApplication } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; 
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

const appConfig = {
  imports: [HttpClientModule],  
  providers: [provideRouter(routes)],
};

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
