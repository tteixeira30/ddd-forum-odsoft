# Switch-QA Project for the 1st Semester 2023

## How to generate the svg files

These templates use [PlantUML](https://plantuml.com) to generate the diagrams that are displayed in the readme. You may use any tool you choose.

If you want to use PlantUML, on project root folder, run the following script:

Remarks: it works for Linux and MacOS. For Windows, you have to adapt the script.

```shell
$ bin/generate-plantuml-diagrams.sh
```


## 1. Team Members

The team consists of students identified in the following table.

| Student Number | Name              |
|----------------|-------------------|
| **1XXXXXX**    | Name of student 1 |
| **1XXXXXX**    | Name of student 2 |
| **1XXXXXX**    | Name of student 3 |
| **1XXXXXX**    | Name of student 4 |
| **1XXXXXX**    | Name of student 5 |
| **1XXXXXX**    | Name of student 6 |
| **1XXXXXX**    | Name of student 7 |

## 2. Task Distribution

Throughout the project's development period, the distribution of _tasks / requirements / features_ by the team members
was carried out as described in the following table.

**Keep this table must always up-to-date.**

| Task                        | [Sprint A](sprintA/readme.md)                                                              | [Sprint B](sprintB/readme.md)                                                              |
|-----------------------------|--------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------|
| Architecture                | [all](sprintA/global-artifacts/00.architecture/architecture.md)                            | [all](sprintB/global-artifacts/00.architecture/architecture.md)                    |
| Glossary                    | [all](sprintA/global-artifacts/01.requirements-engineering/glossary.md)                    | [all](sprintB/global-artifacts/00.engineering-requirements/glossary.md)                    |
| Use Case Diagram (UCD)      | [all](sprintA/global-artifacts/01.requirements-engineering/use-case-diagram.md)            | [all](sprintB/global-artifacts/00.engineering-requirements/use-case-diagram.md)            |
| Supplementary Specification | [all](sprintA/global-artifacts/01.requirements-engineering/supplementary-specification.md) | [all](sprintB/global-artifacts/00.engineering-requirements/supplementary-specification.md) |
| US 001 (SDP Activities)     | [1XXXXXX](sprintA/us006/readme.md)                                                         |                                                                                            |
| ...                         | ...                                                                                        | ...                                                                                        |

## 3. Sprints

**Project:** DDD Forum ISEP

### 3.1 Sprint A

**Goal:** To produce the specification of the existing version of the system

**User Story:** As a project manager, I want the team to produce the specification of the existing version of the system

The specificcation should follow the templates, as presented here and in the referenced links.

The Specification should include:
    - User Stories (~Use Cases)
    - Tests

### 3.2 Sprint B

**Goal:** To document the API and implement API tests to the full set of functional endpoints (of the backend)

**User Story:** As a project manager, I want the team to specify (document) the API and implement API tests

The specification of the API should include for each route:
    - the action (GET, POST, etc.)
    - a small description
    - parameters
    - possible response codes and results
    - reference to related use cases and acceptance criteria

You should place the API specification in the **docs/sprintB/api** folder. Inside this folder, you should create a file for each route. The file name should be the route name, with the extension **.md**. For example, the route **/api/v1/users** should be documented in the file **docs/sprintB/api/users.md**.

The implementation of the API tests should follow the examples, as described in the root **readme** file and the code, as presented in the **src/api_test** folder
