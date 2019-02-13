import { Component, OnInit } from "@angular/core";
import { Server } from '../../../../models/server';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ServerService } from '../../../../services/server.service';
import { ToasterService } from '../../../../services/toaster.service';
import { v4 as uuid } from 'uuid';
import { IosTemplate } from '../../../../models/templates/ios-template';
import { IosService } from '../../../../services/ios.service';


@Component({
    selector: 'app-copy-ios-template',
    templateUrl: './copy-ios-template.component.html',
    styleUrls: ['./copy-ios-template.component.scss']
})
export class CopyIosTemplateComponent implements OnInit {
    server: Server;
    templateName: string = '';
    iosTemplate: IosTemplate;
    
    constructor(
        private route: ActivatedRoute,
        private serverService: ServerService,
        private iosService: IosService,
        private toasterService: ToasterService,
        private router: Router
    ) {}

    ngOnInit() {
        const server_id = this.route.snapshot.paramMap.get("server_id");
        const template_id = this.route.snapshot.paramMap.get("template_id");
        this.serverService.get(parseInt(server_id, 10)).then((server: Server) => {
            this.server = server;

            this.iosService.getTemplate(this.server, template_id).subscribe((iosTemplate: IosTemplate) => {
                this.iosTemplate = iosTemplate;
                this.templateName = `Copy of ${this.iosTemplate.name}`;
            })

        });
    }

    addTemplate() {
        if (this.templateName) {
            this.iosTemplate.template_id = uuid();
            this.iosTemplate.name = this.templateName;

            this.iosService.addTemplate(this.server, this.iosTemplate).subscribe((template: IosTemplate) => {
                this.router.navigate(['/server', this.server.id, 'preferences', 'dynamips', 'templates']);
            });
        } else {
            this.toasterService.error(`Fill all required fields`);
        }
    }
}
