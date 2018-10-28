import React from 'react';
import CourseRow from "../component/CourseRow";
import CourseService from "../service/CourseService"
export default class CourseList extends  React.Component {
    constructor (){
        super();
        this.courseService = CourseService.instance;
        this.state={courses:[]};
    }
    componentDidMount(){
        this.courseService.findAllCourses()
            .then((courses)=>{

                this.setState({courses:courses});
            });
    }
    renderCourseRows(){
        let courses= this.state.courses.map(
            function(course){
                return <CourseRow key={course.id} course={course}/>
            }
        )
        return courses;

    }
    render(){
        return (
            <div>
            <h2>Course List</h2>
                <table className="table">
                    <thead><tr><th>Title</th></tr></thead>
                    <tbody>
                    {this.renderCourseRows()}

                    </tbody>
                </table>
            </div>
        )
    }
}