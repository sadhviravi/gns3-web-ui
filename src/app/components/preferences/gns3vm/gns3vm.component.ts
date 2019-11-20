import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from '@angular/router';
import { Gns3vmService } from '../../../services/gns3vm.service';
import { Gns3vm } from '../../../models/gns3vm/gns3vm';
import { Server } from '../../../models/server';
import { ServerService } from '../../../services/server.service';
import { Gns3vmEngine } from '../../../models/gns3vm/gns3vmEngine';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { ToasterService } from '../../../services/toaster.service';


@Component({
    selector: 'app-gns3vm',
    templateUrl: './gns3vm.component.html',
    styleUrls: ['./gns3vm.component.scss']
})
export class Gns3vmComponent implements OnInit {
    public server: Server;
    public gns3vm: Gns3vm;
    public vmEngines: Gns3vmEngine[];
    public vmForm: FormGroup;

    constructor(
        private route: ActivatedRoute,
        private serverService: ServerService,
        private gns3vmService: Gns3vmService,
        private router: Router,
        private formBuilder: FormBuilder,
        private toasterService: ToasterService
    ) {
        this.vmForm = this.formBuilder.group({
            vmname: new FormControl(null, [Validators.required]),
            ram: new FormControl(null, [Validators.required]),
            vcpus: new FormControl(null, [Validators.required])
        });
    }

    ngOnInit() {
        const server_id = this.route.snapshot.paramMap.get("server_id");
        this.serverService.get(parseInt(server_id, 10)).then((server: Server) => {
            this.server = server;
            this.gns3vmService.getGns3vm(this.server).subscribe((vm: Gns3vm) => {
                this.gns3vm = vm;
                this.vmForm.controls['vmname'].setValue(this.gns3vm.vmname);
                this.vmForm.controls['ram'].setValue(this.gns3vm.ram);
                this.vmForm.controls['vcpus'].setValue(this.gns3vm.vcpus);
                this.gns3vmService.getGns3vmEngines(this.server).subscribe((vmEngines: Gns3vmEngine[]) => {
                    this.vmEngines = vmEngines;
                });
            });
        });
    }

    goBack() {
        this.router.navigate(['/server', this.server.id, 'preferences']);
    }

    setCloseAction(action: string) {
        this.gns3vm.when_exit = action;
    }

    save() {
        if (this.vmForm.valid) {
            this.gns3vm.vmname = this.vmForm.get('vmname').value;
            this.gns3vm.ram = this.vmForm.get('ram').value;
            this.gns3vm.vcpus= this.vmForm.get('vcpus').value;

            this.gns3vmService.updateGns3vm(this.server, this.gns3vm).subscribe(() => {
                this.toasterService.success('GNS3 VM updated.');
            });
        } else {
            this.toasterService.error('Fill all required fields with correct values.');
        }
    }
}
