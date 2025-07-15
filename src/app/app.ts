import { Component, inject } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BoddyComponent } from './components/boddy/boddy.component';
import { GlobalInfooService } from './services/globalInfoo.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, FooterComponent, BoddyComponent, MatProgressSpinnerModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
  standalone: true,
})
export class App {
  protected title = 'f1fan';
  private globalInfooService = inject(GlobalInfooService);

  loading = this.globalInfooService.loadingSignal;
  error = this.globalInfooService.errorSignal;


}
