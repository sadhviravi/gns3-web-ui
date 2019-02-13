import { Component, OnInit, ViewChild } from "@angular/core";
import { Server } from '../../../../models/server';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ServerService } from '../../../../services/server.service';
import { switchMap } from 'rxjs/operators';
import { DeleteTemplateComponent } from '../../common/delete-template-component/delete-template.component';
import { DockerTemplate } from '../../../../models/templates/docker-template';
import { DockerService } from '../../../../services/docker.service';


@Component({
    selector: 'app-docker-templates',
    templateUrl: './docker-templates.component.html',
    styleUrls: ['./docker-templates.component.scss']
})
export class DockerTemplatesComponent implements OnInit {
    server: Server;
    dockerTemplates: DockerTemplate[] = [];
    @ViewChild(DeleteTemplateComponent) deleteComponent: DeleteTemplateComponent;

    constructor(
        private route: ActivatedRoute,
        private serverService: ServerService,
        private dockerService: DockerService,
        private router: Router 
    ) {}

    ngOnInit() {
        const server_id = this.route.snapshot.paramMap.get("server_id");
        this.serverService.get(parseInt(server_id, 10)).then((server: Server) => {
            this.server = server;
            this.getTemplates();
        });
    }

    getTemplates() {
        this.dockerTemplates = [];
        this.dockerService.getTemplates(this.server).subscribe((dockerTemplates: DockerTemplate[]) => {
            dockerTemplates.forEach((template) => {
                if ((template.template_type === 'docker') && !template.builtin) {
                    this.dockerTemplates.push(template);
                }
            });
        });
    }

    deleteTemplate(template: DockerTemplate) {
        this.deleteComponent.deleteItem(template.name, template.template_id);
    }

    onDeleteEvent() {
        this.getTemplates();
    }

    copyTemplate(template: DockerTemplate) {
        this.router.navigate(['/server', this.server.id, 'preferences', 'docker', 'templates', template.template_id, 'copy']);
    }
}
