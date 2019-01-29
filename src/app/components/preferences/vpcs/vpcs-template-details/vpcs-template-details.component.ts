import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ServerService } from '../../../../services/server.service';
import { Server } from '../../../../models/server';
import { ToasterService } from '../../../../services/toaster.service';
import { VpcsService } from '../../../../services/vpcs.service';
import { VpcsTemplate } from '../../../../models/templates/vpcs-template';


@Component({
    selector: 'app-vpcs-template-details',
    templateUrl: './vpcs-template-details.component.html',
    styleUrls: ['./vpcs-template-details.component.scss']
})
export class VpcsTemplateDetailsComponent implements OnInit {
    server: Server;
    vpcsTemplate: VpcsTemplate;

    consoleTypes: string[] = ['telnet', 'none'];
    categories = [["Default", "guest"],
                    ["Routers", "routers"],
                    ["Switches", "switches"],
                    ["End devices", "end_devices"],
                    ["Security devices", "security_devices"]];

    constructor(
        private route: ActivatedRoute,
        private serverService: ServerService,
        private vpcsService: VpcsService,
        private toasterService: ToasterService
    ) {}

    ngOnInit() {
        const server_id = this.route.snapshot.paramMap.get("server_id");
        const template_id = this.route.snapshot.paramMap.get("template_id");
        this.serverService.get(parseInt(server_id, 10)).then((server: Server) => {
            this.server = server;

            this.vpcsService.getTemplate(this.server, template_id).subscribe((vpcsTemplate: VpcsTemplate) => {
                this.vpcsTemplate = vpcsTemplate;
            });
        });
    }

    onSave() {
        this.vpcsService.saveTemplate(this.server, this.vpcsTemplate).subscribe((vpcsTemaple: VpcsTemplate) => {
            this.toasterService.success("Changes saved");
        });
    }
}
