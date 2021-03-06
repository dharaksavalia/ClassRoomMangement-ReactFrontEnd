import React from 'react';
import CourseRow from "../component/CourseRow";
import CourseService from "../service/CourseService"
export default class CourseList extends  React.Component {
    constructor (){
        super();
        this.courseService = CourseService.instance;
        this.state={courses:[]};
        this.state={course:{}};
        this.titleChanged=this.titleChanged.bind(this);
        this.createCourse=this.createCourse.bind(this);
        this.renderCourseRows=this.renderCourseRows.bind(this);
        this.deleteCourse = this.deleteCourse.bind(this);
        this.findAllCourses=this.findAllCourses.bind(this);
    }
    deleteCourse(courseId){
        this.courseService.deleteCourse(courseId)
            .then(this.findAllCourses);
    }
    componentDidMount(){
        this.findAllCourses();
    }
    renderCourseRows(){
        if(!this.state.courses)return;
        let courses= this.state.courses.map(
            (course)=>{
                return <CourseRow key={course.id}
                                    delete={this.deleteCourse}
                                  course={course}/>
            }
        )
        return courses;
    }
    titleChanged(event){
        this.setState({
            course:{title:event.target.value}
        });
    }
    createCourse(){
        this.courseService.createCourse(this.state.course)
            .then(()=>{
                this.findAllCourses();
            });
    }
    findAllCourses(){
        this.courseService.findAllCourses()
            .then((courses)=>{

                this.setState({courses:courses});
            });
    }
    render(){
        return (
            <div>
            <h2>Course List</h2>
                <table className="table">
                    <thead>
                        <tr><th>Title</th></tr>
                        <tr>
                           <th> <input  onChange={this.titleChanged}
                                        className="form-control" id="titleFld"
                                         placeholder="CS101"/></th>
                            <th><button onClick={this.createCourse}
                                        className="btn btn-primary">Add</button></th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.renderCourseRows()}
                    </tbody>
                </table>
            </div>
        )
    }
}