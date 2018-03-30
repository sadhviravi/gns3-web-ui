import { TestBed, inject } from '@angular/core/testing';

import { LinkService } from './link.service';
import { HttpClient } from '@angular/common/http';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpServer } from './http-server.service';
import { Server } from '../models/server';
import { Node } from '../../cartography/shared/models/node';
import { Port } from '../models/port';

describe('LinkService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let httpServer: HttpServer;
  let service: LinkService;
  let server: Server;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        HttpServer,
        LinkService
      ]
    });

    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    httpServer = TestBed.get(HttpServer);
    service = TestBed.get(LinkService);

    server = new Server();
    server.ip = "127.0.0.1";
    server.port = 3080;
    server.authorization = "none";
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', inject([LinkService], (service: LinkService) => {
    expect(service).toBeTruthy();
  }));

  it('should create link', inject([LinkService], (service: LinkService) => {
    const sourceNode = new Node();
    sourceNode.project_id = "myproject";
    sourceNode.node_id = "sourceid";

    const sourcePort = new Port();
    sourcePort.port_number = 1;
    sourcePort.adapter_number = 2;

    const targetNode = new Node();
    targetNode.node_id = "targetid";

    const targetPort = new Port();
    targetPort.port_number = 3;
    targetPort.adapter_number = 4;

    service.createLink(server, sourceNode, sourcePort, targetNode, targetPort).subscribe();

    const req = httpTestingController.expectOne('http://127.0.0.1:3080/v2/projects/myproject/links');
    expect(req.request.body).toEqual({"nodes": [
      {
        node_id: "sourceid",
        port_number: 1,
        adapter_number: 2
      },
      {
        node_id: "targetid",
        port_number: 3,
        adapter_number: 4
      }
    ]});
  }));
});
