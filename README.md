## Overview
This project is a proof of concept of a CDS Service
to Knowledge Object Service.

[CDS Hooks](https://cds-hooks.org/) is a technology from SMART on FHIR that allows third-party CDS systems to register with an
EHR using a "hook" pattern. The third-party CDS system is able to provide
the EHR with information in the form of "cards" that the EHR may use to
show the end-user or otherwise interweave into the workflow

### CDS Services
We have two CDS Services, each access a KO service from our
[example collection](https://github.com/kgrid-objects/example-collection).
These CD services

- [Hello World KO](https://kgrid-activator.herokuapp.com/kos/hello/world)
- [Score Calc KO](https://kgrid-activator.herokuapp.com/kos/score/calc)


#### Service Definition
Developers of CDS Services SHALL provide a stable endpoint for allowing
CDS Clients to discover available CDS Services, including information
such as a description of the CDS Service, when it should be invoked, and any data that is requested to be prefetched.

The http://localhost:3000/cds-services service returns the services defined in
the service-definitions.json file at the root of the project

#### Service Function
The kgrid-cds-service-provider/service/cds-services.js defines the expressjs
routing for the cds services.

### Running the server
To run the server, run:

```
npm start
```

You can also run in a dev mode using [nodemon](https://www.npmjs.com/package/nodemon)

[nodemon](https://www.npmjs.com/package/nodemon) is a tool that helps develop node.js based applications by
automatically restarting the node application when file changes in the
directory are detected.

```
npm run dev
```

### Running Integration tests

Our inteegration tests run the hello world and score calc CDS services using [Postman](https://www.getpostman.com/) and
[Newman](https://www.npmjs.com/package/newman).  The CDS services access
the KO Services at https://kgrid-activator.herokuapp.com/.


```
npm test
```



### Resources

- [CDS Hooks GitHub](https://github.com/cds-hooks)
- [CDS Hooks site](https://cds-hooks.org/)
