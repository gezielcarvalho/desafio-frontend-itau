// Angular core modules
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// Angular Material modules
import { MatToolbarModule } from '@angular/material/toolbar';

// Application-specific components
import { ToolbarComponent } from './toolbar/toolbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatToolbarModule, RouterOutlet, ToolbarComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'desafio-frontend-itau';
}
