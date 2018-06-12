import { Component, OnInit, ViewChild } from '@angular/core';
import { StudentModal } from "../student.model";
import { StudentList } from "../StudentList";

@Component({
  selector: 'student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {
  operation: String;
  studentData: Array<Object>;
  studentDetail: any = [];
  minGrade: number;
  maxGrade: number;
  avgOfGrades: number;
  @ViewChild('studentForm') form: any;
  constructor() { }

  ngOnInit() {
    this.studentData = StudentList;
    this.operation = 'Add';
    this.GradeSummary(this.studentData);
  }

 // Calculates min, max and average of grades
  GradeSummary(studentData) {
    const grades = studentData.map(data => data.grade);
    this.minGrade = Math.min(...grades);
    this.maxGrade = Math.max(...grades);
    this.avgOfGrades = grades.reduce((x, y) => x + y) / grades.length;
  }
  // Adds student Detauls to the list
  AddStudent(student: StudentModal) {
    this.studentData.push(student);
    this.studentDetail = [];
    this.GradeSummary(this.studentData);
    this.form.reset();
  }

  // Remove Student from list
  RemoveStudent(student) {
    this.studentData = this.studentData.filter(x => x !== student);
    this.GradeSummary(this.studentData);
  }

  // Allows to updates student details in the form
  UpdateStudent(student: StudentModal) {
    this.operation = 'Update';
    this.studentDetail = student;
  }

  // Updates student details in the list
  SaveStudent(student: StudentModal) {
    this.studentDetail = [];
    this.operation = 'Add';
    this.GradeSummary(this.studentData);
    this.form.reset();
  }
  
}
