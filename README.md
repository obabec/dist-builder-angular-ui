# DistBuilderAngular
This project is build on top of Angular 16. It uses the metadata generated
from using [library](https://github.com/obabec/debezium-server-dist-builder) and [API](https://github.com/obabec/debezium-dist-builder-api).
The UI is generated dynamically based on those metadata and everything except the
key points like Source, Sink, etc. is dynamic.

The UI offers user to put all the possible configuration for the Debezium Server
which will be properly propagated into the correct file.

Besides the distribution the UI offers also ability to provide keystore and trusture
which will be placed to proper place and include that in custom Dockerfile.



## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

The application provides 3 prepared configurations:
* stage - API runs on 'http://127.0.0.1:7200'
* prod - Empty, should be filled for production deployment together with TLS configuration 
* argo - Expects that API is running in pod with service 'http://api-dist-builder:7200'

## Run tests
* Start the API on port 7200
* Start the UI on port 4200
* `npx playwright test`
