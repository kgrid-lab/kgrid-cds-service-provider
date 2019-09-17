## Implementing A CDS-Hooks Translation Layer for the Knowledge Grid

This is generally derived from the [cds hooks node implementation demo](https://github.com/cds-hooks/sandbox-cds-services) 
and edits it to transform requests for cds service calls into k-grid service calls
and responses from the k-grid into cds-hooks cards.

This project can easily be adapted to serve as a translation layer for any number of knowledge objects.


## CDS Hooks Overview
[CDS Hooks](https://cds-hooks.org/) is a technology from SMART on FHIR that allows third-party CDS systems to register with an
EHR using a "hook" pattern. The third-party CDS system is able to provide
the EHR with information in the form of "cards" that the EHR may use to
show the end-user or otherwise interweave into the workflow

### Hello World Example CDS Service
Using the Hello World example knowledge object from the example collection
[example collection](https://github.com/kgrid-objects/example-collection).  The CDS services access
the KO Services at https://kgrid-activator.herokuapp.com/.

- [Hello World KO](https://kgrid-activator.herokuapp.com/kos/hello/world)

We have also created CDS hook integrations for the [score calc example](https://kgrid-activator.herokuapp.com/kos/score/calc), 
the [opioid finder](https://kgrid-activator.herokuapp.com/kos/99999/10101) and the 
[IPP 10 year stroke risk calculator](https://kgrid-activator.herokuapp.com/kos/ipp/stroke10y).

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
[Newman](https://www.npmjs.com/package/newman). 

```
npm test
```

### Heroku

The kgrid-cdes app is running on Heroku. [Crowdsort Heroku](https://kgrid-cds.herokuapp.com/).  The app consists of static content and api backend the communicates with MongoDB.  MongoDB is also hosted on the heroku instance.

The instance own by the heroku kgrid team.  Create a [Heroku login](https://signup.heroku.com/) or you can use an existing login.  Have a kgrid team memeber add you to the team. 

Once a member you should be able to navigate to the [Heroku Dashboard](https://dashboard.heroku.com/apps/kgrid-cds)

## Getting Started 

- Install [Heroku CLI](https://devcenter.heroku.com/categories/command-line)

## Deploying

- kgrid-cds root directory
- herkou login ```heroku login```
- add heroku as a remote repo ```heroku git:remote -a kgrid-cds```
- ```git remote -v``` verifies that you not have to remotes github and git heroku
- Push to heroku repo ```git push heroku master``` or if deploying from a branch besides master```git push heroku heroku:master```
- Push custom branch to Heroku
  ```
  git push <branch name> heroku:master
  ```

## Useful
- [Heroku and Git](https://devcenter.heroku.com/articles/git)

## Creating your own CDS hooks integrations

You can fork this project to create your own CDS hooks that connect to knowledge 
object services. As the examples show all you just need two simple data transforms:
One to transform the data provided by the EHR into the knowledge grid inputs and one to convert the
knowledge grid results into a CDS hook card.

####From the hello world example:

This section takes data sent from the EHR and passes it to the knowledge object.
```javascript
  const axiosConfig = {
    headers: { Accept: 'application/json' }
  };
  const url = 'http://kgrid-activator.herokuapp.com/hello/world/v0.2.0/welcome';
  const data = {"name": req.body.prefetch.patient.name[0].given[0] };

```

Then this section takes the response from the knowledge object and inserts it into some CDS cards which
can be read by the EHR.
```javascript
  axios.post(url, data , axiosConfig ).
  then((response) => {
    console.log('response' + response.data.result)

    links = [ { label: "google", url: "https://www.google.com", type: "absolute"},
      { label: "github", url: "https://www.github.com", type: "absolute"}];
    let aCard = new Card( "Hello World", response.data.result , "label", "url", "info", JSON.parse(JSON.stringify(links)));
    links.push({label: "yahoo", url: "http://yahoo.com", type: "absolute"});
    let card2 = new Card("Hello links", response.data.result, "label", "http://umich.edu", "warning", links);
    let responseObject =  { cards: [ aCard, card2 ]};
    res.send( responseObject );
  });
```
The other objects all behave similarly.


### Resources

- [CDS Hooks GitHub](https://github.com/cds-hooks)
- [CDS Hooks site](https://cds-hooks.org/)
