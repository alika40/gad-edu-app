const axios = require('axios');
const axiosInstance = require('../middleware/udemy-check');




//  Handler: Get all courses
exports.getCourses = (req, res, next) => {

        const pageSize = +req.query.page_size;
        const currentPage = +req.query.page;
        const apiURL = `courses/?page=${currentPage}&page_size=${pageSize}`;

        axiosInstance.get(apiURL)
        .then(response => res.status(200).json({ courses: response.data.results, courseCount: response.data.count }) )
        .catch(error => res.status(500).json({message: 'ERROR: Error Occured!'}) )

}




//  Handler: Get single course by its ID
exports.getCourse = async(req, res, next) => { // ?fields[course]=@all,owner,-images&fields[user]=title

    const courseID = req.params.courseID;
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

        const courseID = req.params.courseID;
        const apiURL = `courses/${courseID}/reviews/?page=${1}&page_size=${15}`;

        const courseReviews = await axiosInstance.get(apiURL);
        res.status(200).json({ reviews: courseReviews.data.results });

    }
    catch(err) {
        res.status(500).json({message: 'ERROR: Error Occured!'});
    }

}
