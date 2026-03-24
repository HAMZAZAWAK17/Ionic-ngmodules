import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'details',
    loadChildren: () => import('./details/details.module').then( m => m.DetailsPageModule)
  },
  {
    path: 'transfer-data',
    loadChildren: () => import('./transfer-data/transfer-data.module').then( m => m.TransferDataPageModule)
  },
  {
    path: 'ui',
    loadChildren: () => import('./ui/ui.module').then( m => m.UIPageModule)
  },
  {
    path: 'jeux',
    loadChildren: () => import('./jeux/jeux.module').then( m => m.JeuxPageModule)
  },
  {
    path: 'media',
    loadChildren: () => import('./media/media.module').then( m => m.MediaPageModule)
  },
  {
    path: 'components-preview',
    loadChildren: () => import('./components-preview/components-preview.module').then( m => m.ComponentsPreviewPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
