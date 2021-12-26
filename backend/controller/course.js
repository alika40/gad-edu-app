const axios = require('axios');

const axiosInstance = require('../middleware/udemy-check');




//  Handler: Get all courses
exports.getCourses = (req, res, next) => {

        const  groupCourse = +req.body.groupCourse;
        const  currentPage = +req.body.currentPage;
        const  coursesPerPage = +req.body.coursesPerPage;
        const apiURL_1 = `courses/?page=${currentPage}&page_size=${coursesPerPage}&search=${groupCourse}`;
        const apiURL_2 = `courses/?page=${currentPage}&page_size=${coursesPerPage}`;
        const apiURL = groupCourse ? apiURL_1 : apiURL_2;

        axiosInstance.get(apiURL)
        .then(response => res.status(200).json({ courses: response.data.results, courseCount: response.data.count }) )
        .catch(error => res.status(500).json({message: 'ERROR: Error Occured!'}) );

}




//  Handler: Get single course by its ID
exports.getCourse = async(req, res, next) => { // ?fields[course]=@all,owner,-images&fields[user]=title

    const courseID = +req.params.courseID;
    const apiURL_1 = `courses/${courseID}/?fields[course]=title,url,price,visible_instructors,image_480x270,description,
                    headline,discount_price,rating,num_reviews,primary_category,created,requirements_data,
                    objectives,objectives_summary`;
    const apiURL_2 = `courses/?page=${1}&page_size=${8}`;
    const course = axiosInstance.get(apiURL_1);
    const otherCourses = axiosInstance.get(apiURL_2);

    axios.all([course, otherCourses])
    .then( response => res.status(200).json({ course: response[0].data, otherCourses: response[1].data.results }) )
    .catch((error) => res.status(500).json({message: 'ERROR: Error Occured!'}) );
    
}





//  Handler: Get single course reviews by its ID
exports.getCourseReviews = async(req, res, next) => {

    try {

        const courseID = +req.params.courseID;
        const pageNo = +req.query.page;
        const pageSize = +req.query.page_size;
        const apiURL = `courses/${courseID}/reviews/?page=${pageNo}&page_size=${pageSize}`;

        const courseReviews = await axiosInstance.get(apiURL);
        res.status(200).json({ reviews: courseReviews.data.results, count: courseReviews.data.count });

    }
    catch(err) {
        res.status(500).json({message: 'ERROR: Error Occured!'});
    }

}



//  Handler: Get searched courses result
exports.getSearchCourses = (req, res, next) => {
    
    const apiURL = `courses/?page=${1}&page_size=${8}&search=${req.body.searchTerm}`;

    axiosInstance.get(apiURL)
    .then(response => res.status(200).json({ courses: response.data.results }) )
    .catch(error => res.status(500).json({message: 'ERROR: Error Occured!'}) );

}
