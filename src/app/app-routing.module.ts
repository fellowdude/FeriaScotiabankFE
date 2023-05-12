import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VerificationPageComponent } from './shared/verification-page/verification-page.component';
import { VerificationCodeGuard } from './guards/verification-code.guard';
import { NoVerificationCodeGuard } from './guards/no-verification-code.guard';

const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'verification',
  //   pathMatch: 'full',
  //   runGuardsAndResolvers: 'always',
  // },
  {
    path: 'main',
    loadChildren: () => import('./core/core.module').then((m) => m.CoreModule),
    data: { preload: false },
    // canActivate: [VerificationCodeGuard],
    // canLoad: [VerificationCodeGuard],
    runGuardsAndResolvers: 'always',
  },
  {
    path: 'verification',
    component: VerificationPageComponent,
    pathMatch: 'full',
    canActivate: [NoVerificationCodeGuard],
    canLoad: [NoVerificationCodeGuard],
  },
  {
    path: 'info',
    loadChildren: () =>
      import('./static-pages/static-pages.module').then(
        (m) => m.StaticPagesModule
      ),
    // canActivate: [VerificationCodeGuard],
    // canLoad: [VerificationCodeGuard],
    data: { preload: false },
  },
  {
    path: '**',
    redirectTo: 'main',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      useHash: false,
      onSameUrlNavigation: 'reload',
      initialNavigation: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
