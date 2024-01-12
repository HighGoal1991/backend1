# Backend
## 1. Outline
### 1.1. Introduction
[![Build Status](https://github.com/samchon/backend/workflows/build/badge.svg)](https://github.com/samchon/backend/actions?query=workflow%3Abuild)

Template for a NodeJS Backend Server powered by:

  - [Typia](https://typia.io): Superfast/easy validators with only one line
  - [NestJS](https://nestjs.com): NodeJS Typescript Backend Framework
    - [`@nestia/core`](https://github.com/samchon/nestia): decorators maximum 20,000x faster than `class-validator`
    - [`@nestia/sdk`](https://github.com/samchon/sdk): SDK and Swagger Documents generator
  - [Prisma](https://www.prisma.io) and [`prisma-markdown`](https://github.com/samchon/prisma-markdown)

Prior, to making this template opensource, I've prepared a couple of backend projects leveraging this template. Reading this [README.md](https://github.com/samchon/backend) document and traveling below example projects, you may understand how to develop the TypeScript backend server with the [nestia](https://github.com/samchon/nestia) and [safe-typeorm](https://github.com/samchon/safe-typeorm).

  - [samchon/bbs-backend](https://github.com/samchon/bbs-backend): Simple Bullet-in Board System
  - [samchon/fake-iamport-server](https://github.com/samchon/fake-iamport-server): Fake iamport server, but real SDK
  - [samchon/fake-toss-payments-server](https://github.com/samchon/fake-toss-payments-server): Fake toss-payments server, but real SDK

If you have got queries like "building a new type of backend template" or "regarding backend server development using Typescript", feel free to ask it out over [here](https://github.com/samchon/backend/issues).

Also, if you've already developed a TypeScript backend server and it seems like that its quality is enough good to be a good example for the backend programming learners, please leave an issue or a pull request.

### 1.2. Specializations
Transform this template project to be yours.

When you've created a new backend project through this template project, you can specialize it to be suitable for you by changing some words. Replace below words through IDE specific function like `Edit > Replace in Files` (*Ctrl + Shift + H*), who've been supported by the VSCode.

| Before          | After
|-----------------|----------------------------------------
| ORGANIZATION | Your account or corporation name
| PROJECT      | Your own project name
| AUTHOR       | Author name
| db_name      | Database to connnect
| db_schema    | Database schema to use
| db_account   | Database account to use, not root account
| https://github.com/samchon/backend | Your repository URL

After those replacements, you should specialize the [`src/Configuration.ts`](src/Configuration.ts), [.github/workflows/build.yml](.github/workflows/build.yml) files. Open those files and change constant values of these files to be suitable for your project. Also, open markdown files like this [README.md](README.md) and write your specific project story. Below is list of the markdown files.

  - [.github/ISSUE_TEMPLATE/BUG_REPORT.md](.github/ISSUE_TEMPLATE/BUG_REPORT.md)
  - [.github/ISSUE_TEMPLATE/FEATURE_REQUEST.md](.github/ISSUE_TEMPLATE/FEATURE_REQUEST.md)
  - [.github/ISSUE_TEMPLATE/QUESTION.md](.github/ISSUE_TEMPLATE/QUESTION.md)
  - [.github/PULL_REQUEST_TEMPLATE.md](.github/PULL_REQUEST_TEMPLATE.md)
  - [README.md](README.md)
  - [CODE_OF_CONNDUCT.md](CODE_OF_CONNDUCT.md)
  - [CONTRIBUTING.md](CONTRIBUTING.md)
  - [LICENSE](LICENSE)




## 2. Installation
### 2.1. NodeJS
This backend server has implemented through TypeScript and it runs on the NodeJS. Therefore, to mount this backend server on your local machine, you've to install the NodeJS.

  - https://nodejs.org/en/

Also as you can see from the [package.json](package.json) file, this project requires the private npm module `@ORGANIZATION`, provided from the Github. Therefore, to develop this backend server, you've configure the `.npmrc` file. Open the below link and complete the configuration.

  - https://github.com/features/packages

### 2.2. PostgreSQL
> ```bash
> bash postgres.sh
>```
>
> If you've installed Docker, then run the script above.

Otherwise, visit below PostgreSQL official site and install it manually.

https://www.enterprisedb.com/downloads/postgres-postgresql-downloads

After that, run the `npm run schema <root-account> <password>` command. 

Database schema for BBS backend system would be automatically constructed.

```bash
npm run schema postgres root
```

### 2.3. Repository
From now on, you can start the backend server development, right now. 

Just download this project through the git clone command and install dependencies by the npm install command. After those preparations, you can start the development by typing the `npm run dev` command.

```bash
# CLONE REPOSITORY
git clone https://github.com/samchon/backend
cd backend

# INSTALL DEPENDENCIES
npm install

# START DEVELOPMENT
npm run dev
```





## 3. Development
> - A. Definition only
>   - Design prisma schema file
>   - Build and Share ERD document with your companions
>   - Write DTO structures
>   - Declare controller method only
> - B. Software Development Kit
>   - Build SDK from the declaration only controller files
>   - SDK supports mockup simulator, boosting up frontend development
>   - SDK is type safe, so development be much safer
> - C. Test Automation Program
>   - Build test program earlier than main program development
>   - Utilize SDK library in the test program development
>   - This is the TDD (Test Driven Development)
> - D. Main Program Development

### 3.1. Definition
![ERD](https://private-user-images.githubusercontent.com/13158709/285461559-9fa92ed4-1f9a-4fd9-bceb-dd4b20d45537.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MDUwNjk5NzIsIm5iZiI6MTcwNTA2OTY3MiwicGF0aCI6Ii8xMzE1ODcwOS8yODU0NjE1NTktOWZhOTJlZDQtMWY5YS00ZmQ5LWJjZWItZGQ0YjIwZDQ1NTM3LnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDAxMTIlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQwMTEyVDE0Mjc1MlomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTAyMjM0ZTliYjYyM2M0ZTVmNGM0MDk4OTlhZDg2ZTZhMGM0YmI2NzViMjY3NjgzZjJmZGM0MWE3Y2I4NzQ4NmImWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.mBsBpuQ_xQwMVKKHNCdJ_XJRmn_dRosTz5a_SeYzvHs)

Before developing the main program, define it before.

At first, design the DB architecture on the Prisma Schema file ([prisma/schema.prisma](prisma/schema.prisma)). Writing the schema definitions, don't forget to write the detailed descriptions on each tables and properties. After that, build ERD (Enterprise Relationship Diagram) document through `npm run build:prisma` command. The ERD document will be generated on the [docs/ERD.md](docs/ERD.md) path. If you share the ERD document with your companions, your team can enjoy increased productivity by standardizing words and entities.

At second, write DTO structures under the [src/api/structures](src/api/structures) directory and declare API endpoint specs under the [src/controllers](src/controllers) directory. Note that, do not implement the function body of the controller. Just write declaration only. Below code is never pseudo code, but actual code for current step.

```typescript
@Controlleer("bbs/articles")
export class BbsArticleController {
  @TypedRoute.Patch()
  public async index(
    @TypedBody() input: IBbsArticle.IRequest
  ): Promise<IPage<IBbsArticle.ISummary>> {
    input;
    return null!;
  }
}
```

### 3.2. Software Development Kit
![nestia-sdk-demo](https://user-images.githubusercontent.com/13158709/215004990-368c589d-7101-404e-b81b-fbc936382f05.gif)

[`@samchon/backend`](https://github.com/samchon/backend) provides SDK (Software Development Kit) for convenience.

SDK library means a collection of `fetch` functions with proper types automatically generated by [nestia](https://github.com/samchon/nestia). As you can see from the above gif image, SDK library boosts up client developments by providing type hints and auto completions about the API endpoints of your backend server. 

Furthermore, the SDK library supports mockup simulator. If client developer configures `simulate` option to be `true`, the SDK library will not send HTTP request to your backend server, but simulate the API endpoints by itself. With that feature, frontend developers can directly start the interaction development, even when the [main program development](#34-main-program) is on a progress.

```bash
# BUILD SDK IN LOCAL
npm run build:sdk

# BUILD SDK AND PUBLISH IT TO THE NPM
npm run package:api
```

### 3.3. Test Automation Program
> TDD (Test Driven Development)

After the [Definition](#31-definition) and client [SDK](#32-software-development-kit) generation, you've to design the use-case scenario and implement a test automation program who represents the use-case scenario and guarantees the [Main Program](#34-main-program).

To add a new test function in the Test Automation Program, create a new TS file under the [test/features](test/features) directory following the below category and implement the test scenario function with representative function name and `export` symbol.

Note that, the Test Automation Program resets the local DB schema whenever being run. Therefore, you've to be careful if import data has been stored in the local DB server. To avoid the resetting the local DB, configure the `skipReset` option like below.

Also, the Test Automation Program runs all of the test functions placed into the [test/features](test/features) directory. However, those full testing may consume too much time. Therefore, if you want to reduce the testing time by specializing some test functions, use the `include` option like below.

  - supported options
    - `include`: test only restricted functions who is containing the special keyword.
    - `exclude`: exclude some functions who is containing the special keyword.
    - `reset`: do not reset the DB

```bash
# test without db reset
npm run test -- --reset false

# include or exclude some features
npm run test -- --include something
npm run test -- --include cart order issue
npm run test -- --include cart order issue --exclude index deposit
```

### 3.4. Main Program
After [Definition](#31-definition), client [SDK](#32-software-development-kit) building and [Test Automation Program](#33-test-automation-program) are all prepared, finally you can develop the Main Program. Also, when you complete the Main Program implementation, it would better to validate the implementation through the pre-built [SDK](#32-software-development-kit) and [Test Automation Program](#33-test-automation-program).

However, do not commit a mistake that writing source codes only in the [controller](src/controllers) classes. The API Controller must have a role that only intermediation. The main source code should be write down separately following the directory categorizing. For example, source code about DB I/O should be written into the [src/providers](src/providers) directory.




## 4. Appendix
### 4.1. NPM Run Commands
List of the run commands defined in the [package.json](package.json) are like below:

  - Test
    - **`test`**: **Run [Test Automation Program](#33-test-automation-program)**
  - Build
    - `build`: Build every below programs
    - `build:sdk`: Build SDK library, but only for local
    - `build:test`: Build [Test Automation Program](#33-test-automation-program)
    - `build:main`: Build main program
    - **`dev`**: **Incremental builder of the [Test Automation Program](#33-test-automation-program)**
    - `eslint`: EsLint validator runner
    - `pretter`: Adjust prettier to every source codes
    - `webpack`: Run webpack bundler
  - Deploy
    - `package:api`: Build and deploy the SDK library to the NPM
    - `schema`: Create DB, users and schemas on local database
    - `start`: Start the backend server
  - Webpack
    - `webpack`: Run webpack bundler
    - `webpack:start`: Start the backend server built by webpack
    - `webpack:test`: Run test program to the webpack built

### 4.2. Directories
  - [.vscode/launch.json](.vscode/launch.json): Configuration for debugging
  - [packages/api/](packages/api): Client [SDK](#32-software-development-kit) library for the client developers
  - [**docs/**](docs/): Documents like ERD (Entity Relationship Diagram)
  - [**prisma/schema.prisma**](prisma/schema.prisma): Prisma Schema File
  - [src/](src/): TypeScript Source directory
    - [src/api/](src/api/): Client SDK that would be published to the `@ORGANIZATION/PROJECT-api`
      - [**src/api/functional/**](src/api/functional/): API functions generated by the [`nestia`](https://github.com/samchon/nestia)
      - [**src/api/structures/**](src/api/structures/): DTO structures
    - [src/controllers/](src/controllers/): Controller classes of the Main Program
    - [src/providers/](src/providers/): Service providers (bridge between DB and controllers)
    - [src/executable/](src/executable/): Executable programs
  - [**test/**](test/): Test Automation Program

### 4.3. Related Repositories
> Write the related repositories down.