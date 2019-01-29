import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProjectMapComponent } from './components/project-map/project-map.component';
import { ServersComponent } from './components/servers/servers.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { DefaultLayoutComponent } from './layouts/default-layout/default-layout.component';
import { SettingsComponent } from './components/settings/settings.component';
import { LocalServerComponent } from './components/local-server/local-server.component';
import { PreferencesComponent } from './components/preferences/preferences.component';
import { QemuPreferencesComponent } from './components/preferences/qemu/qemu-preferences/qemu-preferences.component';
import { QemuVmTemplatesComponent } from './components/preferences/qemu/qemu-vm-templates/qemu-vm-templates.component';
import { QemuVmTemplateDetailsComponent } from './components/preferences/qemu/qemu-vm-template-details/qemu-vm-template-details.component';
import { AddQemuVmTemplateComponent } from './components/preferences/qemu/add-qemu-vm-template/add-qemu-vm-template.component';
import { GeneralPreferencesComponent } from './components/preferences/general/general-preferences.component';
import { VpcsPreferencesComponent } from './components/preferences/vpcs/vpcs-preferences/vpcs-preferences.component';
import { VpcsTemplatesComponent } from './components/preferences/vpcs/vpcs-templates/vpcs-templates.component';
import { AddVpcsTemplateComponent } from './components/preferences/vpcs/add-vpcs-template/add-vpcs-template.component';
import { VpcsTemplateDetailsComponent } from './components/preferences/vpcs/vpcs-template-details/vpcs-template-details.component';

const routes: Routes = [
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      { path: '', redirectTo: 'servers', pathMatch: 'full' },
      { path: 'servers', component: ServersComponent },
      { path: 'local', component: LocalServerComponent },
      { path: 'server/:server_id/projects', component: ProjectsComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'server/:server_id/preferences', component: PreferencesComponent },
      { path: 'server/:server_id/preferences/general', component: GeneralPreferencesComponent },
      // temporary disabled
      // { path: 'server/:server_id/preferences/qemu', component: QemuPreferencesComponent },
      { path: 'server/:server_id/preferences/qemu/templates', component: QemuVmTemplatesComponent },
      { path: 'server/:server_id/preferences/qemu/templates/:template_id', component: QemuVmTemplateDetailsComponent },
      { path: 'server/:server_id/preferences/qemu/addtemplate', component: AddQemuVmTemplateComponent },
      // temporary disabled
      // { path: 'server/:server_id/preferences/vpcs', component: VpcsPreferencesComponent },
      { path: 'server/:server_id/preferences/vpcs/templates', component: VpcsTemplatesComponent },
      { path: 'server/:server_id/preferences/vpcs/templates/:template_id', component: VpcsTemplateDetailsComponent},
      { path: 'server/:server_id/preferences/vpcs/addtemplate', component: AddVpcsTemplateComponent }
    ]
  },
  { path: 'server/:server_id/project/:project_id', component: ProjectMapComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
