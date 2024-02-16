export class Dependency {
  id: string;
  groupId: string;
  artifactId: string;
  version: string;
  comment: string;


  constructor(id: string, groupId: string, artifactId: string, version: string, comment: string) {
    this.id = id;
    this.groupId = groupId;
    this.artifactId = artifactId;
    this.version = version;
    this.comment = comment;
  }
}
