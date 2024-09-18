interface Lecturer {
  name: string;
  surname: string;
  position: string;
  company: string;
  experience: number;
  courses: string[];
  contacts: string[];
}

class School {
  _areas: Area[] = [];
  _lecturers: Lecturer[] = [];

  get areas(): Area[] {
    return this._areas;
  }

  get lecturers(): Lecturer[] {
    return this._lecturers;
  }

  addArea(area: Area): void {
    this._areas.push(area);
  }

  removeArea(areaName: string): void {
    this._areas = this._areas.filter((area: Area) => area.name !== areaName);
  }

  addLecturer(lecturer: Lecturer): void {
    this._lecturers.push(lecturer);
  }

  removeLecturer(lecturerName: string): void {
    this._lecturers = this._lecturers.filter((lecturer: Lecturer) => lecturer.name !== lecturerName);
  }
}

class Area {
  _levels: Level[] = [];
  _name: string;

  constructor(name: string) {
    this._name = name;
  }

  get name(): string {
    return this._name;
  }

  get levels(): Level[] {
    return this._levels;
  }

  addLevel(level: Level): void {
    this._levels.push(level);
  }

  removeLevel(levelName: string): void {
    this._levels = this._levels.filter((level: Level) => level.name !== levelName);
  }
}

class Level {
  _groups: Group[] = [];
  _name: string;
  _description: string;

  constructor(name: string, description: string) {
    this._name = name;
    this._description = description;
  }

  get name(): string {
    return this._name;
  }

  get description(): string {
    return this._description;
  }

  get groups(): Group[] {
    return this._groups;
  }

  addGroup(group: Group): void {
    this._groups.push(group);
  }

  removeGroup(groupName: string): void {
    this._groups = this._groups.filter((group: Group) => group.directionName !== groupName);
  }
}

class Group {
  _area: Area;
  _status: string;
  _students: Student[] = [];
  directionName: string;
  levelName: string;

  constructor(directionName: string, levelName: string) {
    this.directionName = directionName;
    this.levelName = levelName;
  }

  get area(): Area {
    return this._area;
  }

  set area(value: Area) {
    this._area = value;
  }

  get status(): string {
    return this._status;
  }

  set status(value: string) {
    this._status = value;
  }

  get students(): Student[] {
    return this._students;
  }

  addStudent(student: Student): void {
    this._students.push(student);
  }

  removeStudent(studentFullName: string): void {
    this._students = this._students.filter((student: Student) => student.fullName !== studentFullName);
  }

  showPerformance(): Student[] {
    return this._students.toSorted((a: Student, b: Student) => b.getPerformanceRating() - a.getPerformanceRating());
  }
}

class Student {
  _firstName: string;
  _lastName: string;
  _birthYear: number;
  _grades: { [key: string]: number } = {}; // workName: mark
  _visits: boolean[] = []; // lesson: present

  constructor(firstName: string, lastName: string, birthYear: number) {
    this._firstName = firstName;
    this._lastName = lastName;
    this._birthYear = birthYear;
  }

  get fullName(): string {
    return `${this._lastName} ${this._firstName}`;
  }

  set fullName(value: string) {
    [this._lastName, this._firstName] = value.split(' ');
  }

  get age(): number {
    return new Date().getFullYear() - this._birthYear;
  }

  getPerformanceRating(): number {
    const gradeValues = Object.values(this._grades);
    if (!gradeValues.length) return 0;

    const averageGrade: number =
      gradeValues.reduce((sum: number, grade: number) => sum + grade, 0) / gradeValues.length;
    const attendancePercentage: number =
      (this._visits.filter((present: boolean) => present).length / this._visits.length) * 100;

    return (averageGrade + attendancePercentage) / 2;
  }

  setGrade(workName: string, mark: number): void {
    this._grades[workName] = mark;
  }

  setVisit(isPresent: boolean): void {
    this._visits.push(isPresent);
  }
}
